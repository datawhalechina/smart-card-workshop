// AI模块入口文件
export * from './components/AIGenerator';
export * from './types';
export * from './api';

// 默认导出
import AIGenerator from './components/AIGenerator';
import { aiApi } from './api';

export default {
  AIGenerator,
  aiApi,
}; 