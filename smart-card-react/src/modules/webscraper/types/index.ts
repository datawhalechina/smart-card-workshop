// 网页抓取模块类型定义

export interface WebScrapingRequest {
  url: string;
  extractionType: 'summary' | 'content' | 'structured';
  customPrompt?: string;
}

export interface WebScrapingResponse {
  success: boolean;
  title: string;
  content: string;
  summary?: string;
  structuredData?: Record<string, unknown>;
  error?: string;
  metadata?: {
    processingTime: number;
    wordCount: number;
  };
} 