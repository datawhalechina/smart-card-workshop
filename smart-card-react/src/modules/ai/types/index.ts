// AI生成模块类型定义

export interface AIGenerationRequest {
  prompt: string;
  template?: string;
  style?: string;
  language?: string;
}

export interface AIGenerationResponse {
  success: boolean;
  htmlContent: string;
  error?: string;
  metadata?: {
    tokenUsed: number;
    processingTime: number;
  };
} 