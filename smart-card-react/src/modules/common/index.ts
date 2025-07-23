// 通用模块入口文件
export * from './types';
export * from './api/httpClient';
export * from './store/toastStore';
export * from './utils';

// 默认导出
import { httpClient } from './api/httpClient';
import { useToastStore } from './store/toastStore';
import { cn, formatDate, debounce, throttle } from './utils';

export default {
  httpClient,
  useToastStore,
  utils: {
    cn,
    formatDate,
    debounce,
    throttle
  }
}; 