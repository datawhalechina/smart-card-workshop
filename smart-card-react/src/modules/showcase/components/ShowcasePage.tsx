'use client';

import React, { useState, useMemo } from 'react';
import { mockShowcaseCards, showcaseCategories, sortingOptions } from '@/data/mock-showcase-data';
import ShowcaseCard from './ShowcaseCard';
import { Input, Button } from '@/components/ui';
import { Search, SlidersHorizontal } from 'lucide-react';

/**
 * Main component for the Card Showcase page.
 * Handles filtering, sorting, and displaying of showcase cards.
 * @returns {React.ReactElement} The rendered showcase page.
 */
const ShowcasePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('全部');
  const [activeSubCategory, setActiveSubCategory] = useState<string>('全部');
  const [sortBy, setSortBy] = useState<string>('recommended');

  const filteredCards = useMemo(() => {
    let cards = [...mockShowcaseCards];

    // Search
    if (searchTerm) {
      cards = cards.filter(card => 
        card.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (activeCategory !== '全部') {
      cards = cards.filter(card => card.category === activeCategory);
    }
    
    // Sub-category filter is not implemented on data, so this is for UI demonstration

    // Sorting
    cards.sort((a, b) => {
      switch (sortBy) {
        case 'popularity':
          return (b.likes + b.views) - (a.likes + a.views);
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'recommended':
        default:
          return (b.likes + b.views + b.forks * 2) - (a.likes + a.views + a.forks * 2);
      }
    });

    return cards;
  }, [searchTerm, activeCategory, activeSubCategory, sortBy]);

  const subCategories = activeCategory === '全部' ? [] : showcaseCategories[activeCategory as keyof typeof showcaseCategories];

  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-1/2 lg:w-1/3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="搜索卡片标题或标签..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-base"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="text-gray-600" />
              <div className="flex items-center space-x-2">
                {Object.entries(sortingOptions).map(([label, value]) => (
                  <Button
                    key={value}
                    variant={sortBy === value ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setSortBy(value)}
                  >
                    {label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant={activeCategory === '全部' ? 'primary' : 'outline'}
              onClick={() => {
                setActiveCategory('全部');
                setActiveSubCategory('全部');
              }}
            >
              全部
            </Button>
            {Object.keys(showcaseCategories).map(category => (
              <Button
                key={category}
                size="sm"
                variant={activeCategory === category ? 'primary' : 'outline'}
                onClick={() => {
                  setActiveCategory(category);
                  setActiveSubCategory('全部');
                }}
              >
                {category}
              </Button>
            ))}
          </div>
          {subCategories && subCategories.length > 0 && (
            <div className="mt-3 pt-3 border-t flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-gray-600 mr-2">子分类:</span>
                <Button 
                    size="sm"
                    variant={activeSubCategory === '全部' ? 'secondary' : 'ghost'}
                    onClick={() => setActiveSubCategory('全部')}
                >
                    全部
                </Button>
              {subCategories.map(sub => (
                <Button 
                    key={sub}
                    size="sm"
                    variant={activeSubCategory === sub ? 'secondary' : 'ghost'}
                    onClick={() => setActiveSubCategory(sub)}
                >
                    {sub}
                </Button>
              ))}
            </div>
          )}
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredCards.length > 0 ? (
          <div
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
          >
            {filteredCards.map(card => (
              <ShowcaseCard key={card.id} card={card} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">未找到匹配的卡片</h3>
            <p className="text-gray-500">尝试更换搜索词或清除筛选条件</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ShowcasePage; 