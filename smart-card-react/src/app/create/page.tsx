'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button, Card, Input } from '@/components/ui';
import { AIGenerator } from '@/components/AIGenerator';
import { WebScraper } from '@/components/WebScraper';
import { HtmlPaster } from '@/components/HtmlPaster';
import { UIFineTuner } from '@/components/UIFineTuner';
import { Sparkles, Globe, Code, ArrowLeft, Settings, ChevronDown } from 'lucide-react';

/**
 * 卡片创建页面
 * 集成了初始内容生成和对话式微调功能
 */
const CreateCardPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ai' | 'scraper' | 'paste'>('ai');
  const [previewHtml, setPreviewHtml] = useState(
    `<div class='flex items-center justify-center h-full w-full bg-gray-100 rounded-lg'><div class='text-center text-gray-500 p-8'><h3 class='text-lg font-semibold'>卡片预览</h3><p>生成卡片后，预览将在此处更新。</p></div></div>`
  );

  // --- 高级设置 State ---
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedModel, setSelectedModel] = useState('Deepseek');
  const [multiCardMode, setMultiCardMode] = useState(false);
  const [cardWidth, setCardWidth] = useState('');
  const [cardHeight, setCardHeight] = useState('');
  const [cardCount, setCardCount] = useState(1);


  const handleContentGenerated = (html: string) => {
    console.log("接收到生成内容，未来会更新预览:", html.substring(0, 100));
  };

  const handleSave = (finalHtml: string) => {
    console.log("“保存”按钮被点击。最终的HTML:", finalHtml.substring(0, 100));
  };

  const handleCancel = () => {
    console.log("“取消”按钮被点击。");
  };

  const tabs = [
    { id: 'ai', label: 'AI 生成', icon: Sparkles },
    { id: 'scraper', label: '网页抓取', icon: Globe },
    { id: 'paste', label: '粘贴HTML', icon: Code },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">返回工作台</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">创建与调整卡片</h1>
            <div className="w-40"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        <section>
          <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">步骤 1: 生成初始卡片</h2>
              <p className="text-gray-500 mt-1">从以下任一模式开始您的创作。</p>
          </div>
          <div className="max-w-4xl mx-auto">
              <div className="mb-8 flex justify-center">
                <div className="p-1 bg-gray-200 rounded-lg flex space-x-1">
                  {tabs.map((tab) => (
                    <Button
                      key={tab.id}
                      variant={activeTab === tab.id ? 'primary' : 'ghost'}
                      onClick={() => setActiveTab(tab.id as 'ai' | 'scraper' | 'paste')}
                      className="w-32"
                      size="md"
                      icon={tab.icon}
                    >
                      {tab.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                {activeTab === 'ai' && <AIGenerator onGenerate={handleContentGenerated} />}
                {activeTab === 'scraper' && <WebScraper onScrape={() => {}} />}
                {activeTab === 'paste' && <HtmlPaster onPaste={handleContentGenerated} />}
              </div>

              {/* --- 高级设置 --- */}
              <div className="mt-8">
                <div className="text-center">
                  <Button variant="ghost" onClick={() => setShowAdvanced(!showAdvanced)} className="text-gray-600 hover:text-gray-900">
                      <Settings className="mr-2 h-4 w-4" />
                      高级设置
                      <ChevronDown className={`ml-2 h-4 w-4 transition-transform duration-200 ${showAdvanced ? 'rotate-180' : ''}`} />
                  </Button>
                </div>
                
                {showAdvanced && (
                    <Card className="mt-4 p-6 bg-white border animate-fade-in-up">
                        <div className="space-y-6">
                            <div>
                                <label htmlFor="modelSelect" className="block text-sm font-medium text-gray-700 mb-1">选择生成模型</label>
                                <select
                                    id="modelSelect"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                >
                                    <option value="Deepseek">Deepseek</option>
                                    <option value="Qwen3">Qwen3</option>
                                    <option value="Doubao1.6seed">Doubao1.6seed</option>
                                </select>
                            </div>
                            
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                            </div>
                            
                            <div className="flex items-center space-x-3">
                                <input
                                    type="checkbox"
                                    id="multiCard"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    checked={multiCardMode}
                                    onChange={(e) => setMultiCardMode(e.target.checked)}
                                />
                                <label htmlFor="multiCard" className="font-medium text-gray-700">启用多卡模式</label>
                            </div>

                            {multiCardMode && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 pl-7 border-l-2 border-blue-200 animate-fade-in">
                                    <div>
                                        <label htmlFor="cardCount" className="block text-sm font-medium text-gray-700 mb-1">预计卡片数量</label>
                                        <Input
                                            id="cardCount"
                                            type="number"
                                            value={cardCount}
                                            onChange={(e) => setCardCount(Math.max(1, parseInt(e.target.value, 10) || 1))}
                                            placeholder="例如: 3"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cardWidth" className="block text-sm font-medium text-gray-700 mb-1">卡片宽度 (px)</label>
                                        <Input
                                            id="cardWidth"
                                            type="text"
                                            value={cardWidth}
                                            onChange={(e) => setCardWidth(e.target.value)}
                                            placeholder="例如: 350"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cardHeight" className="block text-sm font-medium text-gray-700 mb-1">卡片高度 (px)</label>
                                        <Input
                                            id="cardHeight"
                                            type="text"
                                            value={cardHeight}
                                            onChange={(e) => setCardHeight(e.target.value)}
                                            placeholder="例如: 400"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                )}
              </div>
          </div>
        </section>

        <div className="relative">
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300 border-dashed"></div>
            </div>
            <div className="relative flex justify-center">
                <span className="bg-gray-50 px-4 text-sm font-medium text-gray-500">
                    ▼ 预览与调整 ▼
                </span>
            </div>
        </div>
        
        <section>
          <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800">步骤 2: 对话微调</h2>
              <p className="text-gray-500 mt-1">与AI对话调整细节，左侧为实时预览，右侧为对话窗口。</p>
          </div>
          <UIFineTuner 
              initialHtml={previewHtml}
              onSave={handleSave} 
              onCancel={handleCancel}
          />
        </section>
      </main>
    </div>
  );
};

export default CreateCardPage; 