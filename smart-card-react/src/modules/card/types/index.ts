// 卡片模块类型定义
import { AppConfig } from '@/modules/common/types';

export interface BaseCard {
  title: string;
  content: string;
  htmlContent: string;
  imageUrl?: string;
  tags: string[];
  author?: string;
  category?: string;
}

export interface Card extends BaseCard {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface ShowcaseCard extends Card {
  thumbnailUrl: string;
  views: number;
  likes: number;
  forks: number;
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

export interface ImageExportOptions {
  format: 'png' | 'jpg' | 'jpeg' | 'pdf';
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

export interface CardPreviewProps {
  card: Card;
  template?: CardTemplate;
  onEdit?: (card: Card) => void;
  onDelete?: (cardId: string) => void;
  onExport?: (card: Card, options: ImageExportOptions) => void;
}

export interface CardStore {
  // State
  cards: Card[];
  templates: CardTemplate[];
  currentCard: Card | null;
  isLoading: boolean;
  error: string | null;
  config: AppConfig;
  
  // Actions
  setCards: (cards: Card[]) => void;
  setTemplates: (templates: CardTemplate[]) => void;
  setCurrentCard: (card: Card | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Async actions
  loadCards: () => Promise<void>;
  loadTemplates: () => Promise<void>;
  createCard: (card: Omit<Card, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Card | null>;
  updateCard: (cardId: string, card: Partial<Card>) => Promise<Card | null>;
  deleteCard: (cardId: string) => Promise<boolean>;
  forkCard: (cardId: string) => Promise<Card | null>;
} 