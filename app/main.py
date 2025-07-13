from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse, FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, Field
from typing import Optional, List
import os
import uuid
import logging
import asyncio
from dotenv import load_dotenv
import requests
from tools.llm_prompt import call_ark_llm, extract_html_from_response
from tools.prompt_config import SYSTEM_PROMPT_WEB_DESIGNER, USER_PROMPT_WEB_DESIGNER, SYSTEM_PROMPT_SUMMARIZE_2MD
from tools.llm_caller import generate_content_with_llm
import os
from enum import Enum

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

env_path = os.path.join(os.path.dirname(__file__), "..", "tools", ".env")
load_dotenv(env_path)

JINA_API_URL = "https://r.jina.ai/"
JINA_API_KEY = os.getenv("JINA_API_KEY")

logger.info(f"Loading environment variables from: {env_path}")
logger.info(f"JINA_API_KEY loaded: {'Yes' if JINA_API_KEY else 'No'}")

app = FastAPI()

OUTPUT_DIR = "output"
STATIC_DIR = "static"
TEMPLATES_DIR = "templates"

os.makedirs(OUTPUT_DIR, exist_ok=True)
app_static_dir = os.path.join(os.path.dirname(__file__), STATIC_DIR)
os.makedirs(app_static_dir, exist_ok=True)
app.mount(f"/{STATIC_DIR}", StaticFiles(directory=app_static_dir), name=STATIC_DIR)

templates = Jinja2Templates(directory=os.path.join(os.path.dirname(__file__), "..", TEMPLATES_DIR))

class MarkdownRequest(BaseModel):
    markdown: str
    style: Optional[str] = Field(default="default")
    file_id: Optional[str] = None

class GenerationMode(str, Enum):
    DIRECT = "direct"
    PROMPT = "prompt"
    PASTE = "paste"

class GenerationRequest(BaseModel):
    mode: GenerationMode
    prompt: Optional[str] = None
    template: Optional[str] = None
    html_input: Optional[str] = None
    style: Optional[str] = Field(default="default")
    model: Optional[str] = None
    temperature: Optional[float] = 0.7

class GenerationResponseData(BaseModel):
    file_id: str
    success: bool
    html_path: Optional[str] = None
    message: Optional[str] = None
    raw_llm_response: Optional[str] = None

class SummarizeRequest(BaseModel):
    content: str
    model: Optional[str] = None

class SummarizeResponse(BaseModel):
    summary: str
    success: bool
    message: Optional[str] = None

class WebFetchRequest(BaseModel):
    url: str

class WebFetchResponse(BaseModel):
    content: str
    success: bool
    message: Optional[str] = None

class GenerationResponse(BaseModel):
    file_id: str
    html_url: str

def generate_html_from_markdown(markdown_content: str, style: str, file_id: str, request: Request):
    basic_html_content = markdown_content
    full_html = templates.get_template("card_template.html").render(
        {"request": request, "content": basic_html_content, "style": style}
    )
    html_path = os.path.join(OUTPUT_DIR, f"{file_id}.html")
    with open(html_path, "w", encoding="utf-8") as f:
        f.write(full_html)
    logger.info(f"HTML file generated: {html_path}")
    return html_path

async def generate_card(payload: GenerationRequest) -> GenerationResponseData:
    file_id = str(uuid.uuid4())
    llm_raw_response = ""
    html_path = ""
    
    if payload.mode == GenerationMode.PROMPT:
        if not payload.prompt:
            raise HTTPException(status_code=400, detail="PROMPT模式需要提供prompt")
        
        logger.info(f"处理PROMPT模式 - file_id: {file_id}")
        
        combined_prompt = USER_PROMPT_WEB_DESIGNER + payload.prompt
        
        prompt_path = os.path.join(OUTPUT_DIR, f"{file_id}_prompt.txt")
        with open(prompt_path, "w", encoding="utf-8") as f:
            f.write(payload.prompt)
        
        try:
            logger.info(f"使用模型 '{payload.model or 'default'}' 调用LLM")
            
            model_to_use = payload.model or "deepseek-v3-250324"  
            temperature_to_use = payload.temperature or 0.7       
            
            llm_raw_response = await asyncio.to_thread(
                call_ark_llm,
                prompt=combined_prompt,
                model_id=model_to_use,
                temperature=temperature_to_use
            )
            
            html_content = extract_html_from_response(llm_raw_response)
            
            html_path = os.path.join(OUTPUT_DIR, f"{file_id}.html")
            with open(html_path, "w", encoding="utf-8") as f:
                f.write(html_content)
            logger.info(f"HTML内容已保存到: {html_path}")
            
        except Exception as e:
            logger.error(f"通过LLM生成内容时发生错误: {e}", exc_info=True)
            raise HTTPException(status_code=500, detail=f"LLM调用期间发生内部服务器错误: {str(e)}")

    elif payload.mode == GenerationMode.PASTE:
        if not payload.html_input:
            raise HTTPException(status_code=400, detail="PASTE模式需要提供HTML输入")
        logger.info(f"处理PASTE模式 - file_id: {file_id}")
        html_path = os.path.join(OUTPUT_DIR, f"{file_id}.html")
        with open(html_path, "w", encoding="utf-8") as f:
            f.write(payload.html_input)
        logger.info(f"HTML文件已直接保存: {html_path}")
    else:
        raise HTTPException(status_code=400, detail="无效的生成模式")

    html_url = f"/api/download-html/{file_id}"
    
    response_data = GenerationResponseData(
        file_id=file_id,
        success=True,
        html_path=html_url,
        raw_llm_response=llm_raw_response if payload.mode == GenerationMode.PROMPT else None,
        message="HTML卡片生成成功"
    )
    
    return response_data

@app.post("/api/generate")
async def generate_files(payload: GenerationRequest):
    response_data = await generate_card(payload)
    return response_data

@app.get("/")
async def read_root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/api/download-html/{file_id}")
async def download_html(file_id: str):
    file_path = os.path.join(OUTPUT_DIR, f"{file_id}.html")
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="HTML file not found")
    return FileResponse(file_path, media_type='text/html', filename=f"{file_id}.html")

@app.post("/api/summarize", response_model=SummarizeResponse)
async def summarize_content(summarize_req: SummarizeRequest):
    try:
        content = summarize_req.content

        if not content:
            return SummarizeResponse(
                summary="",
                success=False,
                message="请提供需要总结的内容"
            )

        summarize_prompt = f"""请对以下内容进行简洁明了的总结，突出关键信息，保持语言简练：

{content}

总结：
"""

        summary = await generate_content_with_llm(
            prompt=summarize_prompt,
            sys_prompt=SYSTEM_PROMPT_SUMMARIZE_2MD,
            model=summarize_req.model,
            temperature=0.5  
        )

        return SummarizeResponse(
            summary=summary.strip(),
            success=True
        )
    except Exception as e:
        logger.error(f"内容总结失败: {str(e)}")
        return SummarizeResponse(
            summary="",
            success=False,
            message=f"总结生成失败: {str(e)}"
        )


@app.post("/api/fetch-web", response_model=WebFetchResponse)
async def fetch_web_content(fetch_req: WebFetchRequest):
    try:
        url = fetch_req.url.strip()

        if not url:
            return WebFetchResponse(
                content="",
                success=False,
                message="请提供有效的URL"
            )

        jina_url = f"{JINA_API_URL}{url}"
        
        if not JINA_API_KEY:
            logger.error("JINA_API_KEY environment variable not found")
            return WebFetchResponse(
                content="",
                success=False,
                message="Jina API密钥未配置，请检查环境变量"
            )
        
        headers = {'Authorization': f'Bearer {JINA_API_KEY}'}

        logger.info(f"Fetching web content from: {url}")
        
        response = requests.get(jina_url, headers=headers)
        response.raise_for_status()  
        
        content = response.text
        
        return WebFetchResponse(
            content=content,
            success=True
        )
    except Exception as e:
        logger.error(f"获取网页内容失败: {str(e)}")
        return WebFetchResponse(
            content="",
            success=False,
            message=f"获取网页内容失败: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    if not os.path.exists(OUTPUT_DIR):
        os.makedirs(OUTPUT_DIR)
    if not os.getenv("ARK_API_KEY") and not os.getenv("DEEPSEEK_API_KEY"):
        logger.warning("CRITICAL: Neither ARK_API_KEY nor DEEPSEEK_API_KEY environment variables are set. PROMPT mode WILL fail.")

    uvicorn.run(app, host="0.0.0.0", port=8000)