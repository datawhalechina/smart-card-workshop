// 智能卡片工坊项目类型定义

export interface Card {
  id: string;
  title: string;
  content: string;
  htmlContent: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  author?: string;
  category?: string;
}

export interface CardTemplate {
  id: string;
  name: string;
  description: string;
  htmlTemplate: string;
  previewImage: string;
  category: string;
  tags: string[];
}

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

export interface ImageExportOptions {
  format: 'png' | 'jpg' | 'pdf';
  quality: number;
  width?: number;
  height?: number;
  scale?: number;
}

export interface ImageExportResponse {
  success: boolean;
  imageUrl?: string;
  error?: string;
  metadata?: {
    fileSize: number;
    dimensions: {
      width: number;
      height: number;
    };
  };
}

export interface AppConfig {
  apiEndpoint: string;
  arkApiKey: string;
  jinaApiKey: string;
  maxCardSize: number;
  supportedFormats: string[];
  defaultTemplate: string;
}

export interface AppState {
  cards: Card[];
  templates: CardTemplate[];
  currentCard: Card | null;
  isLoading: boolean;
  error: string | null;
  config: AppConfig;
}

export interface ToastProps {
  title: string;
  description?: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface CardPreviewProps {
  card: Card;
  template?: CardTemplate;
  onEdit?: (card: Card) => void;
  onDelete?: (cardId: string) => void;
  onExport?: (card: Card, options: ImageExportOptions) => void;
}
