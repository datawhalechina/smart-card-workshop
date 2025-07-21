import { httpClient } from '@/modules/common/api/httpClient';
import { AIGenerationRequest, AIGenerationResponse } from '@/modules/ai/types';

// AI模块API服务
export const aiApi = {
  // AI 内容生成
  async generateContent(request: AIGenerationRequest): Promise<AIGenerationResponse> {
    try {
      const response = await httpClient.client.post<AIGenerationResponse>('/ai/generate', request);
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
};

export default aiApi; 