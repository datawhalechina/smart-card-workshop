# 智能卡片工坊 (Smart Card Workshop)

一个基于 Next.js + React + TypeScript 构建的现代化智能卡片创作平台，集成了 AI 内容生成、网页抓取、HTML 到图片转换等功能。

## 项目特性

- 🤖 **AI 内容生成**: 基于 ARK 平台的大语言模型，智能生成卡片内容
- 🌐 **网页内容抓取**: 使用 Jina API 抓取并智能摘要网页内容
- 🎨 **多样化模板**: 提供多种卡片样式和风格选择
- 📱 **响应式设计**: 完美适配桌面端和移动端
- 🖼️ **图片导出**: 支持 PNG、JPG、PDF 多种格式导出
- 📊 **状态管理**: 使用 Zustand 进行高效状态管理
- 🔥 **现代技术栈**: Next.js 15 + React 18 + TypeScript + Tailwind CSS

## 技术栈

### 前端
- **框架**: Next.js 15 (App Router)
- **UI 库**: React 18 + TypeScript
- **样式**: Tailwind CSS 3
- **状态管理**: Zustand
- **HTTP 客户端**: Axios
- **图标**: Lucide React

### 后端集成
- **API 后端**: FastAPI (Python)
- **AI 模型**: ARK 平台 (火山平台) 大语言模型
- **图像处理**: HTML2Canvas + jsPDF
- **网页抓取**: Jina API

## 快速开始

### 前置要求

- Node.js 18.0 或更高版本
- npm 或 yarn 包管理器

### 安装依赖

\`\`\`bash
npm install
\`\`\`

### 环境配置

1. 复制环境变量模板：
\`\`\`bash
cp .env.local.example .env.local
\`\`\`

2. 编辑 `.env.local` 文件，填入你的 API 密钥：
\`\`\`env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_ARK_API_KEY=your_ark_api_key_here
NEXT_PUBLIC_JINA_API_KEY=your_jina_api_key_here
\`\`\`

### 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

打开 [http://localhost:3000](http://localhost:3000) 查看应用。

### 构建生产版本

\`\`\`bash
npm run build
npm start
\`\`\`

## 项目结构

\`\`\`
src/
├── app/              # Next.js App Router 页面
│   ├── globals.css   # 全局样式
│   ├── layout.tsx    # 根布局
│   └── page.tsx      # 主页面
├── components/       # React 组件
│   ├── ui/          # UI 基础组件
│   ├── AIGenerator.tsx    # AI 生成组件
│   ├── WebScraper.tsx     # 网页抓取组件
│   └── CardPreview.tsx    # 卡片预览组件
├── services/        # API 服务
│   └── api.ts       # API 客户端
├── store/           # 状态管理
│   └── index.ts     # Zustand store
├── types/           # TypeScript 类型定义
│   └── index.ts     # 项目类型
└── utils/           # 工具函数
\`\`\`

## 核心功能

### 1. AI 内容生成
- 支持中英文内容生成
- 多种风格选择（现代、经典、简约等）
- 实时预览生成结果
- 自定义生成参数

### 2. 网页内容抓取
- 智能摘要提取
- 完整内容抓取
- 结构化数据提取
- 自定义抓取规则

### 3. 卡片管理
- 卡片创建、编辑、删除
- 标签分类管理
- 搜索和筛选功能
- 网格/列表视图切换

### 4. 图片导出
- PNG、JPG、PDF 格式支持
- 自定义导出尺寸
- 高质量图片输出
- 批量导出功能

## 开发指南

### 添加新组件

1. 在 `src/components/` 目录下创建新组件
2. 使用 TypeScript 定义组件类型
3. 遵循项目的代码风格和命名规范

### 状态管理

项目使用 Zustand 进行状态管理，主要包括：
- 卡片数据管理
- 应用配置
- 用户界面状态
- 错误处理

### API 集成

所有 API 调用都通过 `src/services/api.ts` 进行，包括：
- AI 内容生成
- 网页抓取
- 卡片 CRUD 操作
- 图片导出

## 部署

### Vercel 部署

1. 推送代码到 GitHub 仓库
2. 在 Vercel 导入项目
3. 配置环境变量
4. 部署完成

### Docker 部署

\`\`\`bash
# 构建镜像
docker build -t smart-card-workshop .

# 运行容器
docker run -p 3000:3000 smart-card-workshop
\`\`\`

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证。详情请见 [LICENSE](LICENSE) 文件。

## 联系方式

如有问题或建议，请通过以下方式联系：

- 项目主页: [GitHub Repository](https://github.com/your-username/smart-card-workshop)
- 问题反馈: [GitHub Issues](https://github.com/your-username/smart-card-workshop/issues)

## 更新日志

### v1.0.0
- 初始版本发布
- 基础的 AI 内容生成功能
- 网页抓取和内容提取
- 卡片管理和导出功能
- 响应式 UI 设计

---

**智能卡片工坊** - 让内容创作更智能，让分享更简单！
