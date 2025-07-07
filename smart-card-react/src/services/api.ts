import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { 
  AIGenerationRequest, 
  AIGenerationResponse, 
  WebScrapingRequest, 
  WebScrapingResponse,
  ImageExportOptions,
  ImageExportResponse,
  Card
} from '@/types';

class ApiService {
  private apiClient: AxiosInstance;

  constructor() {
    this.apiClient = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 请求拦截器
    this.apiClient.interceptors.request.use(
      (config) => {
        console.log('API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 响应拦截器
    this.apiClient.interceptors.response.use(
      (response: AxiosResponse) => {
        console.log('API Response:', response.status, response.config.url);
        return response;
      },
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  // AI 内容生成
  async generateContent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    try {
      const response = await this.apiClient.post<AIGenerationResponse>('/ai/generate', request);
      return response.data;
    } catch (error) {
      console.error('AI Generation Error:', error);
      return {
        success: false,
        htmlContent: '',
        error: error instanceof Error ? error.message : 'AI 生成失败',
      };
    }
  }

  // 网页内容抓取
  async scrapeWebsite(request: WebScrapingRequest): Promise<WebScrapingResponse> {
    try {
      const response = await this.apiClient.post<WebScrapingResponse>('/scrape/website', request);
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

  // 图片导出
  async exportImage(htmlContent: string, options: ImageExportOptions): Promise<ImageExportResponse> {
    try {
      const response = await this.apiClient.post<ImageExportResponse>('/export/image', {
        htmlContent,
        options,
      });
      return response.data;
    } catch (error) {
      console.error('Image Export Error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : '图片导出失败',
      };
    }
  }

  // 获取卡片列表
  async getCards(): Promise<Card[]> {
    try {
      const response = await this.apiClient.get<Card[]>('/cards');
      return response.data;
    } catch (error) {
      console.error('Get Cards Error:', error);
      return [];
    }
  }

  // 创建卡片
  async createCard(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card | null> {
    try {
      const response = await this.apiClient.post<Card>('/cards', card);
      return response.data;
    } catch (error) {
      console.error('Create Card Error:', error);
      return null;
    }
  }

  // 更新卡片
  async updateCard(cardId: string, card: Partial<Card>): Promise<Card | null> {
    try {
      const response = await this.apiClient.put<Card>(`/cards/${cardId}`, card);
      return response.data;
    } catch (error) {
      console.error('Update Card Error:', error);
      return null;
    }
  }

  // 删除卡片
  async deleteCard(cardId: string): Promise<boolean> {
    try {
      await this.apiClient.delete(`/cards/${cardId}`);
      return true;
    } catch (error) {
      console.error('Delete Card Error:', error);
      return false;
    }
  }

  // 获取卡片模板
  async getTemplates() {
    try {
      const response = await this.apiClient.get('/templates');
      return response.data;
    } catch (error) {
      console.error('Get Templates Error:', error);
      return [];
    }
  }
}

export const apiService = new ApiService();
export default apiService;
