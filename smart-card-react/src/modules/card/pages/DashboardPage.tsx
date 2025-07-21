'use client';

import React from 'react';
import Link from 'next/link';
import { Button, Card, Badge } from '@/components/ui';
import { Settings, LogOut, PlusCircle, Trash2, Eye, Star, CheckCircle, Crown } from 'lucide-react';


/**
 * @typedef {object} UserProfile
 * @property {string} name - 用户名
 * @property {string} email - 用户邮箱
 * @property {string} avatarUrl - 用户头像URL
 * @property {string} memberSince - 注册日期
 */
const userProfile = {
  name: '创意设计师',
  email: 'designer@smartcard.com',
  avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
  memberSince: '2023年10月',
};

/**
 * @typedef {object} SmartCardData
 * @property {string} id - 卡片唯一ID
 * @property {string} title - 卡片标题
 * @property {string} description - 卡片描述
 * @property {string} imageUrl - 卡片预览图URL
 * @property {string[]} tags - 卡片标签
 * @property {string} createdAt - 创建时间
 * @property {boolean} isFavorite - 是否收藏
 */


const userCards = [
  {
    id: 'card-1',
    title: '季度营销报告摘要',
    description: 'Q3季度关键业绩指标和市场趋势分析。',
    imageUrl: '/p1.png',
    tags: ['报告', '营销'],
    createdAt: '2天前',
    isFavorite: true,
  },
  {
    id: 'card-2',
    title: '新产品发布会亮点',
    description: '"智行"系列智能手表的核心功能介绍。',
    imageUrl: '/p2.png',
    tags: ['产品', '发布会'],
    createdAt: '5天前',
    isFavorite: false,
  },
  {
    id: 'card-3',
    title: '团队建设活动策划',
    description: '夏季户外拓展活动安排和注意事项。',
    imageUrl: '/p3.png',
    tags: ['团队', '活动'],
    createdAt: '1周前',
    isFavorite: false,
  },
  {
    id: 'card-4',
    title: '竞争对手分析',
    description: '对主要竞争对手最新动态的分析摘要。',
    imageUrl: '/p4.png',
    tags: ['分析', '市场'],
    createdAt: '2周前',
    isFavorite: true,
  },
];

/**
 * 用户仪表盘/工作台页面
 * @returns {React.ReactElement} - 渲染的用户仪表盘组件
 */
const DashboardPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-theme-gradient">
      {/* 顶部导航占位符 - 实际应用中会是一个共享的Layout组件 */}
      <header className="bg-white/80 shadow-sm sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-blue-700">智能卡片工坊</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-blue-500 hover:bg-blue-50">
                <Settings className="h-5 w-5" />
              </Button>
              <Link href="/auth/signin">
                <Button variant="ghost" size="sm" className="w-9 h-9 p-0 text-blue-500 hover:bg-blue-50">
                  <LogOut className="h-5 w-5" />
                </Button>
              </Link>
              <img src={userProfile.avatarUrl} alt="User Avatar" className="h-9 w-9 rounded-full border-2 border-blue-200" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 用户信息头部 */}
        <div className="md:flex md:items-center md:justify-between mb-12">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold leading-tight text-blue-800">
              欢迎回来, {userProfile.name}!
            </h1>
            <p className="mt-1 text-md text-blue-500">
              这是您的工作台，在这里管理您创建的所有卡片。
            </p>
          </div>
          <div className="mt-6 flex flex-shrink-0 md:mt-0 md:ml-4">
            <Button size="lg" asChild className="bg-blue-500 text-white font-medium shadow hover:bg-blue-600 transition-colors">
              <Link href="/create">
                创建自己的卡片
              </Link>
            </Button>
          </div>
        </div>
        {/* 卡片列表 */}
        <div>
          <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-blue-700">我的卡片</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {userCards.map((card) => (
              <Card key={card.id} className="group relative overflow-hidden flex flex-col bg-white/90 border border-blue-100 shadow-md">
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img 
                    src={card.imageUrl} 
                    alt={card.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                </div>
                {card.isFavorite && (
                  <Badge variant="primary" className="absolute top-2 right-2 bg-blue-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    收藏
                  </Badge>
                )}
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="text-lg font-semibold text-blue-900 truncate">{card.title}</h3>
                  <p className="text-sm text-blue-600 mt-1 flex-grow">{card.description}</p>
                  <div className="mt-3">
                    {card.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="mr-2 mb-1 bg-blue-50 text-blue-500">{tag}</Badge>
                    ))}
                  </div>
                </div>
                <div className="p-4 pt-0 border-t border-blue-100 mt-2">
                   <div className="flex justify-between items-center text-xs text-blue-400">
                       <span>{card.createdAt}</span>
                       <div className="flex items-center space-x-2">
                         <Button variant="ghost" size="sm" className="w-7 h-7 p-0 text-blue-500 hover:bg-blue-50">
                             <Eye className="h-4 w-4" />
                         </Button>
                         <Button variant="ghost" size="sm" className="w-7 h-7 p-0 text-red-400 hover:text-red-600">
                             <Trash2 className="h-4 w-4" />
                         </Button>
                       </div>
                   </div>
                </div>
              </Card>
            ))}
             {/* 创建新卡片按钮优化 */}
             <Link href="/create" className="border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 transition-colors duration-300 flex flex-col items-center justify-center min-h-[320px] bg-white/80 cursor-pointer group">
              <PlusCircle className="h-10 w-10 text-blue-500 mx-auto mb-2 group-hover:text-blue-700 transition" />
              <span className="text-blue-500 font-medium group-hover:text-blue-700 transition">创建卡片</span>
            </Link>
          </div>
        </div>
        {/* --- 会员充值区域 --- */}
        <section id="subscription" className="mt-20 py-16 bg-gradient-to-br from-blue-50 via-white to-blue-200 rounded-xl shadow-sm">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-blue-800">选择适合您的会员计划</h2>
                    <p className="text-lg text-blue-500 max-w-2xl mx-auto mt-4">
                        解锁更多功能，提升您的创作效率。
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* 普通会员 */}
                    <Card className="p-8 flex flex-col text-center hover:shadow-lg transition-shadow bg-white/90 border border-blue-100">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-700">普通会员</h3>
                            <p className="text-blue-400 mt-2">适合入门级用户</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-blue-900">¥10</span>
                            <span className="text-blue-400">/月</span>
                        </div>
                        <ul className="space-y-4 text-left flex-grow">
                            <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />每日可生成10张卡片</li>
                        </ul>
                        <Button className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition">选择方案</Button>
                    </Card>
                    {/* 金卡会员 - 推荐 */}
                    <Card className="p-8 flex flex-col text-center border-2 border-blue-600 relative shadow-xl bg-white/95">
                        <Badge variant="primary" className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-blue-500 text-white">推荐</Badge>
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-700">金卡会员</h3>
                            <p className="text-blue-400 mt-2">性价比之选</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-blue-900">¥30</span>
                            <span className="text-blue-400">/月</span>
                        </div>
                        <ul className="space-y-4 text-left flex-grow">
                            <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />每日可生成30张卡片</li>
                        </ul>
                        <Button className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition">选择方案</Button>
                    </Card>
                    {/* 黑金会员 */}
                    <Card className="p-8 flex flex-col text-center hover:shadow-lg transition-shadow bg-white/90 border border-blue-100">
                        <div className="mb-6">
                            <h3 className="text-2xl font-semibold text-blue-700">黑金会员</h3>
                            <p className="text-blue-400 mt-2">专业人士首选</p>
                        </div>
                        <div className="mb-8">
                            <span className="text-4xl font-bold text-blue-900">¥100</span>
                            <span className="text-blue-400">/月</span>
                        </div>
                        <ul className="space-y-4 text-left flex-grow">
                            <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-400 mr-3 flex-shrink-0" />每日可生成100张卡片</li>
                            <li className="flex items-center"><Crown className="h-5 w-5 text-yellow-400 mr-3 flex-shrink-0" />体验所有灰度测试新功能</li>
                        </ul>
                        <Button className="mt-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-blue-700 transition">选择方案</Button>
                    </Card>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;