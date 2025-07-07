import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Card, CardTemplate, AppState, ToastProps } from '@/types';
import { apiService } from '@/services/api';

interface CardStore extends AppState {
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
}

interface ToastStore {
  toasts: ToastProps[];
  addToast: (toast: ToastProps) => void;
  removeToast: (index: number) => void;
  clearToasts: () => void;
}

// 卡片管理 Store
export const useCardStore = create<CardStore>()(
  devtools(
    persist(
      (set, get) => ({
        // Initial state
        cards: [],
        templates: [],
        currentCard: null,
        isLoading: false,
        error: null,
        config: {
          apiEndpoint: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000',
          arkApiKey: process.env.NEXT_PUBLIC_ARK_API_KEY || '',
          jinaApiKey: process.env.NEXT_PUBLIC_JINA_API_KEY || '',
          maxCardSize: 10 * 1024 * 1024, // 10MB
          supportedFormats: ['png', 'jpg', 'pdf'],
          defaultTemplate: 'modern-card',
        },

        // Actions
        setCards: (cards) => set({ cards }),
        setTemplates: (templates) => set({ templates }),
        setCurrentCard: (card) => set({ currentCard: card }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),

        // Async actions
        loadCards: async () => {
          set({ isLoading: true, error: null });
          try {
            const cards = await apiService.getCards();
            set({ cards, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : '加载卡片失败',
              isLoading: false 
            });
          }
        },

        loadTemplates: async () => {
          set({ isLoading: true, error: null });
          try {
            const templates = await apiService.getTemplates();
            set({ templates, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : '加载模板失败',
              isLoading: false 
            });
          }
        },

        createCard: async (cardData) => {
          set({ isLoading: true, error: null });
          try {
            const newCard = await apiService.createCard(cardData);
            if (newCard) {
              const { cards } = get();
              set({ 
                cards: [...cards, newCard],
                currentCard: newCard,
                isLoading: false 
              });
            } else {
              set({ error: '创建卡片失败', isLoading: false });
            }
            return newCard;
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : '创建卡片失败',
              isLoading: false 
            });
            return null;
          }
        },

        updateCard: async (cardId, cardData) => {
          set({ isLoading: true, error: null });
          try {
            const updatedCard = await apiService.updateCard(cardId, cardData);
            if (updatedCard) {
              const { cards } = get();
              const updatedCards = cards.map(card => 
                card.id === cardId ? updatedCard : card
              );
              set({ 
                cards: updatedCards,
                currentCard: updatedCard,
                isLoading: false 
              });
            } else {
              set({ error: '更新卡片失败', isLoading: false });
            }
            return updatedCard;
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : '更新卡片失败',
              isLoading: false 
            });
            return null;
          }
        },

        deleteCard: async (cardId) => {
          set({ isLoading: true, error: null });
          try {
            const success = await apiService.deleteCard(cardId);
            if (success) {
              const { cards, currentCard } = get();
              const updatedCards = cards.filter(card => card.id !== cardId);
              set({ 
                cards: updatedCards,
                currentCard: currentCard?.id === cardId ? null : currentCard,
                isLoading: false 
              });
            } else {
              set({ error: '删除卡片失败', isLoading: false });
            }
            return success;
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : '删除卡片失败',
              isLoading: false 
            });
            return false;
          }
        },
      }),
      {
        name: 'card-store',
        partialize: (state) => ({
          cards: state.cards,
          templates: state.templates,
          config: state.config,
        }),
      }
    )
  )
);

// Toast 通知 Store
export const useToastStore = create<ToastStore>()(
  devtools((set) => ({
    toasts: [],
    
    addToast: (toast) => 
      set((state) => ({
        toasts: [...state.toasts, { ...toast, duration: toast.duration || 3000 }],
      })),
    
    removeToast: (index) =>
      set((state) => ({
        toasts: state.toasts.filter((_, i) => i !== index),
      })),
    
    clearToasts: () => set({ toasts: [] }),
  }))
);
