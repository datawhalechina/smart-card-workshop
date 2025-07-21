// 通用模块类型定义

export interface AppConfig {
  apiEndpoint: string;
  arkApiKey: string;
  jinaApiKey: string;
  maxCardSize: number;
  supportedFormats: string[];
  defaultTemplate: string;
}

export interface AppState {
  isLoading: boolean;
  error: string | null;
  config: AppConfig;
}

export interface ToastProps {
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
} 