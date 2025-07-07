# Copilot 指导文件

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## 项目概述

这是一个智能卡片工坊项目的现代化重构版本，使用 Next.js + React + TypeScript 构建。项目主要功能包括：

- AI 内容生成（文本转 HTML 卡片）
- 网页内容抓取和总结
- HTML 到图片转换
- 智能卡片提取和处理

## 技术栈

### 前端
- **框架**: Next.js 15 (App Router)
- **UI 库**: React 18 + TypeScript
- **样式**: Tailwind CSS 3
- **状态管理**: React Context + Zustand
- **HTTP 客户端**: Axios
- **UI 组件**: shadcn/ui + Radix UI

### 后端集成
- **API 后端**: FastAPI (Python)
- **AI 模型**: ARK平台 (火山平台) 大语言模型
- **图像处理**: 无头浏览器 + Canvas API
- **网页抓取**: Jina API

## 开发规范

### 代码风格
- 使用 TypeScript 进行类型安全开发
- 遵循 ESLint 规则
- 使用 Prettier 格式化代码
- 采用函数式组件和 React Hooks

### 组件结构
- 使用 PascalCase 命名组件
- 优先使用 Server Components
- 必要时使用 Client Components ('use client')
- 遵循单一职责原则

### 文件组织
```
src/
├── app/           # Next.js App Router 页面
├── components/    # 可复用组件
├── lib/          # 工具函数和配置
├── hooks/        # 自定义 React Hooks
├── types/        # TypeScript 类型定义
├── styles/       # 全局样式
└── utils/        # 工具函数
```

### API 设计
- 使用 Next.js API Routes 作为 BFF 层
- 采用 RESTful 设计原则
- 统一错误处理和响应格式
- 支持请求验证和类型检查

## 功能模块

### 1. 卡片生成模块
- 文本内容 AI 处理
- HTML 卡片模板生成
- 实时预览功能
- 样式自定义

### 2. 网页抓取模块
- URL 输入和验证
- 内容抓取和解析
- 智能摘要生成
- 结构化数据提取

### 3. 图片导出模块
- HTML 到 Canvas 转换
- 图片格式选择
- 批量导出功能
- 图片优化处理

### 4. 用户界面
- 响应式设计
- 暗色模式支持
- 无障碍访问
- 国际化支持

## 最佳实践

1. **性能优化**
   - 使用 Next.js 图片优化
   - 实施代码分割
   - 启用缓存策略
   - 优化 SEO

2. **用户体验**
   - 加载状态指示
   - 错误边界处理
   - 渐进式增强
   - 离线支持

3. **安全性**
   - 输入验证和清理
   - CSRF 保护
   - 内容安全策略
   - 敏感信息保护

4. **可维护性**
   - 模块化设计
   - 单元测试覆盖
   - 文档完善
   - 持续集成

## 开发工具

- **包管理**: npm
- **构建工具**: Next.js (内置 Webpack)
- **开发服务器**: Next.js Dev Server with Turbopack
- **类型检查**: TypeScript
- **代码质量**: ESLint + Prettier
- **测试框架**: Jest + React Testing Library

## 部署配置

- **开发环境**: localhost:3000
- **生产环境**: Vercel 或 Docker 容器
- **环境变量**: `.env.local` 文件管理
- **CI/CD**: GitHub Actions 工作流

请在开发过程中遵循这些指导原则，确保代码质量和项目的可维护性。
