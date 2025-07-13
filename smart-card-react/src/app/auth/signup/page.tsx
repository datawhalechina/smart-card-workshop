'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Card, Input } from '@/components/ui';
import { useToastStore } from '@/store';
import { Sparkles, UserPlus } from 'lucide-react';

/**
 * 用户注册页面
 */
const SignUpPage: React.FC = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const handleSignUp = () => {
    setIsLoading(true);

    // 模拟API调用延时
    setTimeout(() => {
      // 在真实应用中，这里会调用后端API来创建用户
      console.log('注册信息:', { name, email, password });

      addToast({
        title: '注册成功',
        description: '您的账户已创建，请登录。',
        type: 'success',
      });
      
      // 注册成功后跳转到登录页面
      router.push('/auth/signin');

    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <Sparkles className="h-12 w-12 text-blue-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">创建新账户</h1>
            <p className="text-gray-500 mt-2">加入智能卡片工坊，开启您的创作之旅。</p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }} className="space-y-6">
            <div>
              <Input
                id="name"
                type="text"
                label="您的姓名"
                placeholder="王小明"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            
            <div>
              <Input
                id="email"
                type="email"
                label="邮箱地址"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <Input
                id="password"
                type="password"
                label="设置密码"
                placeholder="至少8位字符"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
                minLength={8}
              />
            </div>

            <div>
              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                icon={UserPlus}
              >
                {isLoading ? '创建中...' : '立即创建'}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            已经有账户了?{' '}
            <Link href="/auth/signin" className="font-medium text-blue-600 hover:underline">
              前往登录
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage; 