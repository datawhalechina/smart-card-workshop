'use client';

import React, { useState } from 'react';
import { Button, Card, Textarea } from '@/components/ui';
import { Code, Send } from 'lucide-react';
import { useToastStore } from '@/store';

/**
 * @callback OnPasteCallback
 * @param {string} htmlContent - 用户粘贴的HTML内容。
 * @returns {void}
 */
interface HtmlPasterProps {
  onPaste: (htmlContent: string) => void;
}

/**
 * 一个允许用户粘贴HTML并生成卡片的组件。
 * @param {HtmlPasterProps} props - 组件属性。
 * @returns {React.ReactElement}
 */
export const HtmlPaster: React.FC<HtmlPasterProps> = ({ onPaste }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const addToast = useToastStore((state) => state.addToast);

  const handleCreate = () => {
    if (!htmlContent.trim()) {
      addToast({
        title: '内容为空',
        description: '请粘贴有效的HTML代码。',
        type: 'warning',
      });
      return;
    }
    onPaste(htmlContent);
  };

  const handleReset = () => {
    setHtmlContent('');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="flex items-center space-x-2">
          <Code className="h-6 w-6 text-green-600" />
          <h2 className="text-xl font-semibold text-gray-900">粘贴HTML代码</h2>
        </div>

        <div className="space-y-4">
          <Textarea
            label="HTML内容"
            placeholder="在此处粘贴完整的HTML代码..."
            value={htmlContent}
            onChange={(e) => setHtmlContent(e.target.value)}
            rows={12}
            fullWidth
            className="font-mono text-sm"
          />

          <div className="flex space-x-3">
            <Button
              onClick={handleCreate}
              disabled={!htmlContent.trim()}
              icon={Send}
              className="flex-1"
            >
              创建卡片
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
            >
              清空内容
            </Button>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-900 mb-2">使用说明</h4>
          <ul className="text-sm text-green-800 space-y-1">
            <li>• 请确保粘贴的是一段完整的、可以独立显示的HTML代码。</li>
            <li>• 支持内联的 <code>&lt;style&gt;</code> 标签和 <code>style</code> 属性。</li>
            <li>• 为了安全起见，<code>&lt;script&gt;</code> 标签将不会被执行。</li>
            <li>• 创建后，卡片将直接出现在您的工作台中。</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default HtmlPaster; 