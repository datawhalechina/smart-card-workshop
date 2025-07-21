// 模块总入口文件
export * from './card';
export * from './ai';
export * from './webscraper';
export * from './common';

// 默认导出
import cardModule from './card';
import aiModule from './ai';
import webscraperModule from './webscraper';
import commonModule from './common';

export default {
  card: cardModule,
  ai: aiModule,
  webscraper: webscraperModule,
  common: commonModule,
}; 