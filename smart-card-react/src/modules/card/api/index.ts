import { httpClient } from '@/modules/common/api/httpClient';
import { Card, ImageExportOptions, ImageExportResponse } from '@/modules/card/types';

// 卡片模块API服务
export const cardApi = {
  // 获取卡片列表
  async getCards(): Promise<Card[]> {
    try {
      const response = await httpClient.client.get<Card[]>('/cards');
      return response.data;
    } catch (error) {
      console.error('Get Cards Error:', error);
      return [];
    }
  },

  // 创建卡片
  async createCard(card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>): Promise<Card | null> {
    try {
      const response = await httpClient.client.post<Card>('/cards', card);
      return response.data;
    } catch (error) {
      console.error('Create Card Error:', error);
      return null;
    }
  },

  // 更新卡片
  async updateCard(cardId: string, card: Partial<Card>): Promise<Card | null> {
    try {
      const response = await httpClient.client.put<Card>(`/cards/${cardId}`, card);
      return response.data;
    } catch (error) {
      console.error('Update Card Error:', error);
      return null;
    }
  },

  // 删除卡片
  async deleteCard(cardId: string): Promise<boolean> {
    try {
      await httpClient.client.delete(`/cards/${cardId}`);
      return true;
    } catch (error) {
      console.error('Delete Card Error:', error);
      return false;
    }
  },

  // 获取卡片模板
  async getTemplates() {
    try {
      const response = await httpClient.client.get('/templates');
      return response.data;
    } catch (error) {
      console.error('Get Templates Error:', error);
      return [];
    }
  },

  // 复刻卡片
  async forkCard(cardId: string): Promise<Card | null> {
    try {
      const response = await httpClient.client.post<Card>(`/cards/${cardId}/fork`);
      return response.data;
    } catch (error) {
      console.error('Fork Card Error:', error);
      return null;
    }
  },

  // 图片导出
  async exportImage(htmlContent: string, options: ImageExportOptions): Promise<ImageExportResponse> {
    try {
      const response = await httpClient.client.post<ImageExportResponse>('/export/image', {
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
};

export default cardApi; 