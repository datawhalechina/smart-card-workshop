'use client';

import React, { useState, useEffect } from 'react';
import { Button, Card, LoadingSpinner } from '@/components/ui';
import AIGenerator from '@/components/AIGenerator';
import WebScraper from '@/components/WebScraper';
import CardPreview from '@/components/CardPreview';
import { useCardStore } from '@/store';
import { Card as CardType, ImageExportOptions } from '@/types';
import { Plus, Grid, List, Search, Filter } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'ai' | 'scraper' | 'cards'>('ai');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const {
    cards,
    isLoading,
    error,
    loadCards,
    createCard,
    setCurrentCard,
  } = useCardStore();

  useEffect(() => {
    loadCards();
  }, [loadCards]);

  const handleAIGenerate = async (htmlContent: string, prompt: string) => {
    const newCard = await createCard({
      title: prompt.slice(0, 50) + (prompt.length > 50 ? '...' : ''),
      content: prompt,
      htmlContent,
      tags: ['AI生成'],
      author: 'AI Assistant',
      category: 'AI Generated',
    });

    if (newCard) {
      setCurrentCard(newCard);
      setActiveTab('cards');
    }
  };

  const handleWebScrape = async (content: string, title: string, url: string) => {
    const newCard = await createCard({
      title: title || 'Web Content',
      content,
      htmlContent: `<div class="web-content"><h2>${title}</h2><p>${content}</p><small>来源: ${url}</small></div>`,
      tags: ['网页抓取'],
      author: 'Web Scraper',
      category: 'Web Content',
    });

    if (newCard) {
      setCurrentCard(newCard);
      setActiveTab('cards');
    }
  };

  const handleExportCard = async (card: CardType, options: ImageExportOptions) => {
    // 这里可以实现图片导出逻辑
    console.log('Exporting card:', card, 'with options:', options);
  };

  const filteredCards = cards.filter(card => {
    const matchesSearch = card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(cards.map(card => card.category).filter(Boolean)))];

  const tabs = [
    { id: 'ai', label: 'AI 生成', icon: '🤖' },
    { id: 'scraper', label: '网页抓取', icon: '🌐' },
    { id: 'cards', label: '我的卡片', icon: '📄' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">智能卡片工坊</h1>
              <span className="ml-2 text-sm text-gray-500">AI 驱动的内容创作平台</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setActiveTab('ai')}
                icon={Plus}
                className="bg-blue-600 hover:bg-blue-700"
              >
                新建卡片
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'ai' | 'scraper' | 'cards')}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
                {tab.id === 'cards' && (
                  <span className="bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                    {cards.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex">
              <div className="text-red-800">
                <strong>错误:</strong> {error}
              </div>
            </div>
          </div>
        )}

        {/* AI Generator Tab */}
        {activeTab === 'ai' && (
          <AIGenerator onGenerate={handleAIGenerate} />
        )}

        {/* Web Scraper Tab */}
        {activeTab === 'scraper' && (
          <WebScraper onScrape={handleWebScrape} />
        )}

        {/* Cards Tab */}
        {activeTab === 'cards' && (
          <div className="space-y-6">
            {/* Filters and Search */}
            <Card>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="搜索卡片..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category === 'all' ? '全部分类' : category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    size="sm"
                    icon={Grid}
                    onClick={() => setViewMode('grid')}
                  >
                    网格
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                    icon={List}
                    onClick={() => setViewMode('list')}
                  >
                    列表
                  </Button>
                </div>
              </div>
            </Card>

            {/* Cards Grid/List */}
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <LoadingSpinner size="lg" />
              </div>
            ) : filteredCards.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-500 text-lg mb-4">
                  {searchTerm || selectedCategory !== 'all' ? '没有找到匹配的卡片' : '还没有卡片'}
                </div>
                <Button
                  onClick={() => setActiveTab('ai')}
                  icon={Plus}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  创建第一张卡片
                </Button>
              </div>
            ) : (
              <div className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                  : 'space-y-4'
              }>
                {filteredCards.map((card) => (
                  <CardPreview
                    key={card.id}
                    card={card}
                    onExport={handleExportCard}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
