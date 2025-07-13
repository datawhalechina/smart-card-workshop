# 卡片创建与调整模块 API 文档 (`/api/v1/cards/generate`, `/api/v1/cards`)

本模块负责处理卡片的整个生命周期，从初始生成到对话式微调，再到最终保存。所有接口都需要有效的JWT认证，并会校验用户的每日生成限额。

---

## 1. 通过AI提示生成初始卡片

- **Endpoint**: `POST /api/v1/cards/generate/from-prompt`
- **功能描述**: 根据用户输入的需求文本和高级设置，调用大模型生成初始的HTML内容。
- **请求头**:
  ```json
  {
    "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "Content-Type": "application/json"
  }
  ```
- **请求体 (Pydantic Schema: `AIGenerateRequest`)**:
  ```json
  {
    "prompt": "创建一个介绍人工智能的科技风格卡片",
    "settings": {
      "model": "Deepseek",
      "multi_card_mode": false,
      "card_count": 1,
      "card_width_px": null,
      "card_height_px": null
    }
  }
  ```
- **成功响应 (200 OK - Pydantic Schema: `GeneratedContent`)**:
  ```json
  {
    "html_content": "<div class='...'>...</div>",
    "execution_metadata": {
      "model_used": "Deepseek",
      "cost": 0.002
    }
  }
  ```
- **错误响应 (429 Too Many Requests)**:
  ```json
  {
    "detail": "Daily card generation limit reached."
  }
  ```

---

## 2. 通过网页抓取生成初始卡片

- **Endpoint**: `POST /api/v1/cards/generate/from-url`
- **功能描述**: 抓取指定URL的网页内容，并将其转换为结构化的HTML卡片。
- **请求体 (Pydantic Schema: `WebScrapeRequest`)**:
  ```json
  {
    "url": "https://www.example.com/article/123"
  }
  ```
- **成功响应 (200 OK - Pydantic Schema: `GeneratedContent`)**:
  ```json
  {
    "html_content": "<div class='...'><h2>文章标题</h2>...</div>",
    "execution_metadata": { ... }
  }
  ```
- **错误响应 (400 Bad Request)**:
  ```json
  {
    "detail": "Failed to fetch or parse content from the URL."
  }
  ```

---

## 3. 对话式微调卡片

- **Endpoint**: `POST /api/v1/cards/generate/tune`
- **功能描述**: 根据用户输入的自然语言指令，对当前的HTML内容进行修改。
- **请求体 (Pydantic Schema: `TuneRequest`)**:
  ```json
  {
    "current_html": "<div class='...'>...</div>",
    "instruction": "把标题改成红色，字体加大"
  }
  ```
- **成功响应 (200 OK - Pydantic Schema: `TunedContent`)**:
  ```json
  {
    "tuned_html_content": "<div class='...'><h1 style='color:red;'>...</h1>...</div>",
    "execution_metadata": { ... }
  }
  ```

---

## 4. 保存最终卡片

- **Endpoint**: `POST /api/v1/cards`
- **功能描述**: 将最终确认的卡片内容保存到数据库。
- **请求体 (Pydantic Schema: `CardCreate`)**:
  ```json
  {
    "title": "AI生成的卡片",
    "content": "由AI根据描述生成",
    "html_content": "<div class='...'>...</div>",
    "tags": ["AI生成"],
    "source_type": "ai_prompt"
  }
  ```
- **成功响应 (201 Created - Pydantic Schema: `CardPublic`)**:
  ```json
  {
    "id": "card-newly-created-uuid",
    "title": "AI生成的卡片",
    "image_url": "/path/to/generated/preview/image.png",
    "created_at": "2025-07-14T12:00:00Z",
    ...
  }
  ``` 