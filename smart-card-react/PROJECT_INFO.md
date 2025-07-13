# 智能卡片工坊项目配置

## 项目信息
- **项目名称**: 智能卡片工坊 (Smart Card Workshop)
- **版本**: 1.0.0
- **创建时间**: 2025年7月6日
- **技术栈**: Next.js 15 + React 18 + TypeScript + Tailwind CSS

## 开发环境
- **Node.js**: 18.0+ 
- **包管理器**: npm
- **开发服务器**: http://localhost:3000
- **构建工具**: Next.js with Turbopack

## 核心功能
1. **AI 内容生成**: 基于 ARK 平台的大语言模型
2. **网页内容抓取**: 使用 Jina API 进行智能抓取
3. **卡片管理**: 创建、编辑、删除、搜索、分类
4. **图片导出**: 支持 PNG、JPG、PDF 格式
5. **响应式设计**: 完美适配桌面和移动设备

## 项目结构
```
src/
├── app/              # Next.js 应用页面
├── components/       # React 组件
│   ├── ui/          # 基础 UI 组件
│   ├── AIGenerator.tsx
│   ├── WebScraper.tsx
│   └── CardPreview.tsx
├── services/        # API 服务
├── store/           # 状态管理 (Zustand)
├── types/           # TypeScript 类型
└── utils/           # 工具函数
```

## 环境变量
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
NEXT_PUBLIC_ARK_API_KEY=your_ark_api_key
NEXT_PUBLIC_JINA_API_KEY=your_jina_api_key
```

## 快速开始
1. 安装依赖: `npm install`
2. 配置环境变量: 复制 `.env.local.example` 为 `.env.local`
3. 启动开发服务器: `npm run dev`
4. 打开浏览器: http://localhost:3000

## 可用脚本
- `npm run dev`: 启动开发服务器
- `npm run build`: 构建生产版本
- `npm run start`: 启动生产服务器
- `npm run lint`: 代码检查

## 部署选项
- **Vercel**: 推荐的部署平台
- **Docker**: 容器化部署
- **传统服务器**: 静态文件部署

## 后续开发计划
1. 集成后端 API 服务
2. 添加用户认证系统
3. 实现实时协作功能
4. 增加更多卡片模板
5. 优化性能和 SEO

## 技术亮点
- 现代化的 React 架构
- TypeScript 类型安全
- 响应式设计
- 状态管理优化
- 组件化开发
- 优秀的用户体验

## 开发者指南
- 遵循 TypeScript 最佳实践
- 使用 ESLint 和 Prettier
- 组件单一职责原则
- 合理的状态管理
- 良好的错误处理

---
更新时间: 2025年7月6日
