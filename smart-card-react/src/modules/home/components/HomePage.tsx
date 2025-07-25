import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';
import { 
  Sparkles, 
  Image, 
  Code, 
  Download, 
  Play,
  Zap,
  Palette,
  ArrowRight,
} from 'lucide-react';

/**
 * 智能卡片工坊首页组件
 * 展示产品功能、体验方式和特色产品
 */
const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* 导航栏 */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">智能卡片工坊</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">功能</a>
              <a href="#experience" className="text-gray-600 hover:text-blue-600 transition-colors">体验</a>
              <a href="#showcase" className="text-gray-600 hover:text-blue-600 transition-colors">展示</a>
              <Button asChild variant="primary" size="sm">
                <Link href="/auth/signin">登录 / 注册</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* 英雄区域 */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Badge variant="primary" className="mb-4">
              <Sparkles className="w-4 h-4 mr-1" />
              AI驱动的智能转换
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              将文本转换为
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                精美卡片
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              基于先进AI技术，将您的文本、网页内容或HTML代码转换为精美的卡片图像，
              支持多种输入方式和实时预览编辑。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="group" >
                <Link href="/dashboard">
                  开始创建
                  
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                <Play className="mr-2" />
                观看演示
              </Button>
            </div>
          </div>
        </div>
        
        {/* 装饰性背景元素 */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
        </div>
      </section>

      {/* 功能特色区域 */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              强大的功能特色
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              多种输入方式，AI智能处理，精美卡片导出，一站式解决方案
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                <Image className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">多种输入方式</h3>
              <p className="text-gray-600">
                直接输入需求文本、粘贴HTML代码、智能总结长文本、抓取网页内容
              </p>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 transition-colors">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI智能处理</h3>
              <p className="text-gray-600">
                使用先进的大语言模型，自动提取关键信息，生成结构化卡片
              </p>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                <Palette className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">精美设计</h3>
              <p className="text-gray-600">
                生成适合移动设备的HTML卡片，支持实时预览和编辑效果
              </p>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-orange-200 transition-colors">
                <Download className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">便捷导出</h3>
              <p className="text-gray-600">
                支持PNG图片格式导出，高质量输出，满足各种使用场景
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* 体验方式区域 */}
      <section id="experience" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              如何体验
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              简单几步，即可开始创建您的专属卡片
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <Card className="h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">输入内容</h3>
                  <p className="text-gray-600">
                    输入您需要的卡片内容描述，或粘贴已有的HTML代码
                  </p>
                </div>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <Card className="h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI处理</h3>
                  <p className="text-gray-600">
                    AI自动分析内容，生成精美的卡片设计和布局
                  </p>
                </div>
              </Card>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <Card className="h-full">
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Download className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">导出分享</h3>
                  <p className="text-gray-600">
                    预览效果，调整细节，导出为PNG图片分享使用
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 精选展示区域 */}
      <section id="showcase" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              精选展示
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              浏览用户创建的精美卡片，获取灵感，或直接复用
            </p>
          </div>

          {/* 这里会是卡片展示，但在首页只展示少量 */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {/* 卡片预览占位 */}
            {[1, 2, 3].map((i) => (
              <div key={i} className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-gray-400">卡片预览 {i}</p>
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Button variant="primary" size="sm">
                    查看详情
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild variant="outline" size="lg">
              <Link href="/showcase">
                查看更多展示
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 页脚 */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2">
                <Sparkles className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">智能卡片工坊</span>
              </div>
              <p className="text-gray-400 mt-2">
                AI驱动的卡片创作平台
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                  产品
                </h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">功能</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">定价</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                  资源
                </h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">文档</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">教程</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">博客</a></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">
                  关于
                </h3>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">团队</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">联系我们</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-white transition-colors">隐私政策</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 智能卡片工坊. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 