'use client';

import React, { useState } from 'react';
import { Button, Input, Card } from '@/components/ui';
import { Globe, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { WebScrapingRequest, WebScrapingResponse } from '@/modules/webscraper/types';
import { webscraperApi } from '@/modules/webscraper/api';
import { useToastStore } from '@/modules/common/store/toastStore';

interface WebScraperProps {
  onScrape: (content: string, title: string, url: string) => void;
}

export const WebScraper: React.FC<WebScraperProps> = ({ onScrape }) => {
  const [url, setUrl] = useState('');
  const [extractionType, setExtractionType] = useState<'summary' | 'content' | 'structured'>('summary');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isExtracting, setIsExtracting] = useState(false);
  const [result, setResult] = useState<WebScrapingResponse | null>(null);
  const { addToast } = useToastStore();

  const extractionOptions = [
    { value: 'summary', label: '智能摘要', description: '提取网页核心内容并生成摘要' },
    { value: 'content', label: '完整内容', description: '提取网页的完整文本内容' },
    { value: 'structured', label: '结构化数据', description: '提取网页的结构化信息' },
  ];

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch {
      return false;
    }
  };

  const handleExtract = async () => {
    if (!url.trim()) {
      addToast({
        title: '请输入网址',
        description: '请输入要抓取的网页地址',
        type: 'warning',
      });
      return;
    }

    if (!isValidUrl(url)) {
      addToast({
        title: '网址格式错误',
        description: '请输入有效的网页地址',
        type: 'error',
      });
      return;
    }

    setIsExtracting(true);
    setResult(null);

    try {
      const request: WebScrapingRequest = {
        url: url.trim(),
        extractionType,
        customPrompt: customPrompt.trim() || undefined,
      };

      const response: WebScrapingResponse = await webscraperApi.scrapeWebsite(request);
      setResult(response);

      if (response.success) {
        addToast({
          title: '抓取成功',
          description: '网页内容已成功提取',
          type: 'success',
        });
      } else {
        addToast({
          title: '抓取失败',
          description: response.error || '无法抓取网页内容',
          type: 'error',
        });
      }
    } catch {
      addToast({
        title: '抓取失败',
        description: '网络连接错误，请稍后重试',
        type: 'error',
      });
    } finally {
      setIsExtracting(false);
    }
  };

  const handleUseContent = () => {
    if (result && result.success) {
      const content = result.summary || result.content;
      onScrape(content, result.title, url);
      setUrl('');
      setResult(null);
    }
  };

  const handleReset = () => {
    setUrl('');
    setCustomPrompt('');
    setResult(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Globe className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">网页内容抓取</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 输入区域 */}
          <div className="space-y-4">
            <Input
              label="网页地址"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              fullWidth
              error={url && !isValidUrl(url) ? '请输入有效的网页地址' : undefined}
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                提取类型
              </label>
              <div className="space-y-2">
                {extractionOptions.map((option) => (
                  <label key={option.value} className="flex items-start space-x-3">
                    <input
                      type="radio"
                      name="extractionType"
                      value={option.value}
                      checked={extractionType === option.value}
                      onChange={(e) => setExtractionType(e.target.value as 'summary' | 'content' | 'structured')}
                      className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{option.label}</div>
                      <div className="text-sm text-gray-500">{option.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <Input
              label="自定义提示（可选）"
              placeholder="例如：只提取技术相关的内容"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              fullWidth
              helperText="可以指定特定的提取要求"
            />

            <div className="flex space-x-3">
              <Button
                onClick={handleExtract}
                loading={isExtracting}
                icon={isExtracting ? Loader2 : Globe}
                disabled={!url.trim() || !isValidUrl(url)}
                className="flex-1"
              >
                {isExtracting ? '抓取中...' : '开始抓取'}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isExtracting}
              >
                重置
              </Button>
            </div>
          </div>

          {/* 结果区域 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">抓取结果</h3>
              {result && result.success && (
                <Button
                  onClick={handleUseContent}
                  variant="outline"
                  size="sm"
                >
                  使用此内容
                </Button>
              )}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px]">
              {isExtracting ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-2" />
                    <p className="text-gray-600">正在抓取网页内容...</p>
                  </div>
                </div>
              ) : result ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                      {result.success ? '抓取成功' : '抓取失败'}
                    </span>
                  </div>

                  {result.success ? (
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-900">{result.title}</h4>
                      </div>
                      <div className="prose max-w-none text-sm">
                        <p className="text-gray-700 leading-relaxed">
                          {result.summary || result.content}
                        </p>
                      </div>
                      {result.metadata && (
                        <div className="text-xs text-gray-500 pt-2 border-t">
                          <div>处理时间: {result.metadata.processingTime}ms</div>
                          <div>字数: {result.metadata.wordCount}</div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-red-600 text-sm">
                      {result.error}
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>抓取的内容将在这里显示</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">使用提示</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• 输入完整的网页地址，包括 https:// 或 http://</li>
            <li>• 智能摘要适合获取网页核心内容</li>
            <li>• 完整内容适合需要全文的场景</li>
            <li>• 结构化数据适合提取产品、文章等特定信息</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default WebScraper; 