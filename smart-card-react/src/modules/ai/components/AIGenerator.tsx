'use client';

import React, { useState } from 'react';
import { Button, Textarea, Card } from '@/components/ui';
import { Wand2, Loader2 } from 'lucide-react';
import { AIGenerationRequest, AIGenerationResponse } from '@/modules/ai/types';
import { aiApi } from '@/modules/ai/api';
import { useToastStore } from '@/modules/common/store/toastStore';

interface AIGeneratorProps {
  onGenerate: (htmlContent: string, prompt: string) => void;
}

export const AIGenerator: React.FC<AIGeneratorProps> = ({ onGenerate }) => {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('modern');
  const [language, setLanguage] = useState('zh-CN');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const { addToast } = useToastStore();

  const styleOptions = [
    { value: 'modern', label: '现代风格' },
    { value: 'classic', label: '经典风格' },
    { value: 'minimal', label: '简约风格' },
    { value: 'creative', label: '创意风格' },
    { value: 'professional', label: '专业风格' },
  ];

  const languageOptions = [
    { value: 'zh-CN', label: '中文' },
    { value: 'en-US', label: 'English' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      addToast({
        title: '请输入内容',
        description: '请输入要生成的内容描述',
        type: 'warning',
      });
      return;
    }

    setIsGenerating(true);
    try {
      const request: AIGenerationRequest = {
        prompt: prompt.trim(),
        style,
        language,
      };

      const response: AIGenerationResponse = await aiApi.generateContent(request);
      
      if (response.success) {
        setGeneratedContent(response.htmlContent);
        addToast({
          title: '生成成功',
          description: 'AI 内容已生成完成',
          type: 'success',
        });
      } else {
        addToast({
          title: '生成失败',
          description: response.error || '生成过程中发生错误',
          type: 'error',
        });
      }
    } catch {
      addToast({
        title: '生成失败',
        description: '网络连接错误，请稍后重试',
        type: 'error',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleUseGenerated = () => {
    if (generatedContent) {
      onGenerate(generatedContent, prompt);
      setGeneratedContent('');
      setPrompt('');
    }
  };

  const handleReset = () => {
    setPrompt('');
    setGeneratedContent('');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Wand2 className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">AI 内容生成器</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 输入区域 */}
          <div className="space-y-4">
            <Textarea
              label="内容描述"
              placeholder="请描述您想要生成的卡片内容，例如：'创建一个介绍人工智能的科技风格卡片'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={6}
              fullWidth
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  风格选择
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {styleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  语言
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button
                onClick={handleGenerate}
                loading={isGenerating}
                icon={isGenerating ? Loader2 : Wand2}
                disabled={!prompt.trim()}
                className="flex-1"
              >
                {isGenerating ? '生成中...' : '生成内容'}
              </Button>
              <Button
                variant="outline"
                onClick={handleReset}
                disabled={isGenerating}
              >
                重置
              </Button>
            </div>
          </div>

          {/* 预览区域 */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900">预览</h3>
              {generatedContent && (
                <Button
                  onClick={handleUseGenerated}
                  variant="outline"
                  size="sm"
                >
                  使用此内容
                </Button>
              )}
            </div>

            <div className="border rounded-lg p-4 bg-gray-50 min-h-[300px]">
              {isGenerating ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-2" />
                    <p className="text-gray-600">AI 正在生成内容...</p>
                  </div>
                </div>
              ) : generatedContent ? (
                <div
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: generatedContent }}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <p>生成的内容将在这里显示</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-900 mb-2">使用提示</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• 描述越详细，生成的内容越准确</li>
            <li>• 可以指定特定的格式，如：列表、段落、标题等</li>
            <li>• 支持中英文内容生成</li>
            <li>• 生成的内容会自动适配所选风格</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default AIGenerator; 