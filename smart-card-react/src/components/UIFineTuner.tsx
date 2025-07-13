'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Button, Card, Textarea } from '@/components/ui';
import { Bot, User, CornerDownLeft, Save, Loader2, X } from 'lucide-react';
import { useToastStore } from '@/store';

/**
 * @callback OnSaveTunedHtml
 * @param {string} finalHtml - 最终调整好的HTML内容
 * @returns {void}
 */
interface UIFineTunerProps {
  initialHtml: string;
  onSave: (finalHtml: string) => void;
  onCancel: () => void;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

/**
 * 一个通过对话式UI微调卡片内容的组件
 * @param {UIFineTunerProps} props - 组件属性
 * @returns {React.ReactElement}
 */
export const UIFineTuner: React.FC<UIFineTunerProps> = ({ initialHtml, onSave, onCancel }) => {
  const [currentHtml, setCurrentHtml] = useState(initialHtml);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: '卡片已生成！您可以在此通过对话来调整UI细节，例如：“把标题改成红色”' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [isTuning, setIsTuning] = useState(false);
  const addToast = useToastStore(state => state.addToast);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages: Message[] = [...messages, { sender: 'user', text: userInput }];
    setMessages(newMessages);
    const currentInput = userInput;
    setUserInput('');
    setIsTuning(true);

    // --- 模拟对后端的API调用 ---
    try {
      // 在实际应用中，这里会调用一个真实的服务: 
      // const response = await apiService.tuneHtml({ currentHtml, prompt: currentInput });
      // 现在我们用延时和追加注释来模拟这个过程。
      await new Promise(resolve => setTimeout(resolve, 1500));
      const tuningComment = `\n<!-- AI-Tuning based on prompt: "${currentInput}" -->`;
      // 这里的模拟逻辑比较简单，在真实场景中，AI会返回修改后的HTML
      const updatedHtml = `${currentHtml}${tuningComment}`;
      
      setCurrentHtml(updatedHtml);
      setMessages([...newMessages, { sender: 'bot', text: `已根据您的要求“${currentInput}”进行调整。请查看左侧预览。` }]);
      addToast({ title: '调整成功', description: '卡片预览已更新', type: 'success' });
      
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: '抱歉，调整时遇到了问题，请稍后再试。' }]);
      addToast({ title: '调整失败', description: '无法应用更改', type: 'error' });
    } finally {
      setIsTuning(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* 左侧: 预览区域 */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900">实时预览</h2>
        <Card className="overflow-hidden">
          <iframe
            srcDoc={currentHtml}
            className="w-full h-[600px] border-0"
            title="Card Preview"
            sandbox="allow-same-origin"
          />
        </Card>
      </div>

      {/* 右侧: 对话调整区域 */}
      <div className="flex flex-col h-[680px]">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">对话式微调</h2>
        <Card className="flex-grow flex flex-col">
          {/* 对话历史 */}
          <div ref={chatContainerRef} className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50">
            {messages.map((msg, index) => (
              <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                {msg.sender === 'bot' && <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white flex-shrink-0"><Bot size={18} /></div>}
                <div className={`max-w-[75%] rounded-lg px-4 py-2 shadow-sm ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white border'}`}>
                  <p className="text-sm">{msg.text}</p>
                </div>
                {msg.sender === 'user' && <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0"><User size={18} /></div>}
              </div>
            ))}
            {isTuning && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white"><Loader2 size={18} className="animate-spin" /></div>
                <div className="max-w-[75%] rounded-lg px-4 py-2 bg-white border">
                  <p className="text-sm text-gray-500 italic">正在思考...</p>
                </div>
              </div>
            )}
          </div>
          
          {/* 输入框 */}
          <div className="border-t p-4 bg-white">
            <div className="relative">
              <Textarea
                placeholder="例如: 将标题字体调大，背景色改为淡蓝色..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                rows={2}
                fullWidth
                className="pr-24"
              />
              <Button
                onClick={handleSendMessage}
                disabled={!userInput.trim() || isTuning}
                className="absolute right-2 bottom-2"
                size="sm"
              >
                发送
                <CornerDownLeft className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="mt-4 flex justify-between">
                <Button variant="outline" onClick={onCancel} icon={X}>取消并返回</Button>
                <Button onClick={() => onSave(currentHtml)} icon={Save}>完成并保存卡片</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UIFineTuner; 