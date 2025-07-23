// 网页抓取模块入口文件
export * from './components/WebScraper';
export * from './types';
export * from './api';

// 默认导出
import WebScraper from './components/WebScraper';
import { webscraperApi } from './api';

export default {
  WebScraper,
  webscraperApi,
}; 