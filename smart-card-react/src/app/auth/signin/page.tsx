'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button, Card, Input } from '@/components/ui';
import { useToastStore } from '@/store';
import { Sparkles, LogIn } from 'lucide-react';

// --- 模拟认证 ---
const MAGIC_EMAIL = "test@example.com";
const MAGIC_PASSWORD = "password123";

/**
 * 用户登录页面
 */
const SignInPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const addToast = useToastStore((state) => state.addToast);

  const handleSignIn = () => {
    setIsLoading(true);

    // 模拟API调用延时
    setTimeout(() => {
      if (email === MAGIC_EMAIL && password === MAGIC_PASSWORD) {
        addToast({
          title: '登录成功',
          description: '欢迎回来！正在跳转到您的工作台...',
          type: 'success',
        });
        // 在真实应用中，这里会设置认证状态（如token或session）
        // 例如: auth.login(token);
        router.push('/dashboard');
      } else {
        addToast({
          title: '登录失败',
          description: '邮箱或密码不正确，请重试。',
          type: 'error',
        });
        setIsLoading(false);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="p-8 shadow-lg">
          <div className="text-center mb-8">
            <Link href="/" className="inline-block mb-4">
              <Sparkles className="h-12 w-12 text-blue-600" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">登录您的账户</h1>
            <p className="text-gray-500 mt-2">
              使用固定密码登录: <br />
              邮箱: <code className="bg-gray-200 px-1 rounded">{MAGIC_EMAIL}</code> <br/>
              密码: <code className="bg-gray-200 px-1 rounded">{MAGIC_PASSWORD}</code>
            </p>
          </div>
          
          <form onSubmit={(e) => { e.preventDefault(); handleSignIn(); }} className="space-y-6">
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
                label="密码"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            
            <div className="flex items-center justify-between">
                <a href="#" className="text-sm text-blue-600 hover:underline">忘记密码?</a>
            </div>

            <div>
              <Button
                type="submit"
                fullWidth
                loading={isLoading}
                icon={LogIn}
              >
                {isLoading ? '登录中...' : '安全登录'}
              </Button>
            </div>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            还没有账户?{' '}
            <Link href="/auth/signup" className="font-medium text-blue-600 hover:underline">
              立即注册
            </Link>
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage; 