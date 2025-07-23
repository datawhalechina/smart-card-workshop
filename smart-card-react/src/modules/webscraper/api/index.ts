import { httpClient } from '@/modules/common/api/httpClient';
import { WebScrapingRequest, WebScrapingResponse } from '@/modules/webscraper/types';

// 网页抓取模块API服务
export const webscraperApi = {
  // 网页内容抓取
  async scrapeWebsite(request: WebScrapingRequest): Promise<WebScrapingResponse> {
    try {
      const response = await httpClient.client.post<WebScrapingResponse>('/scrape/website', request);
      return response.data;
    } catch (error) {
      console.error('Web Scraping Error:', error);
      return {
        success: false,
        title: '',
        content: '',
        error: error instanceof Error ? error.message : '网页抓取失败',
      };
    }
  }
};

export default webscraperApi; 