import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { CardStore } from '@/modules/card/types';
import { cardApi } from '@/modules/card/api';

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
            const cards = await cardApi.getCards();
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
            const templates = await cardApi.getTemplates();
            set({ templates, isLoading: false });
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : '加载模板失败',
              isLoading: false 
            });
          }
        },
        
        forkCard: async (cardId: string) => {
          set({ isLoading: true, error: null });
          try {
            const forkedCard = await cardApi.forkCard(cardId);
            if (forkedCard) {
              // 将新的复刻卡片添加到卡片列表中
              const currentCards = get().cards;
              set({ 
                cards: [forkedCard, ...currentCards],
                isLoading: false
              });
              return forkedCard;
            } else {
              throw new Error('复刻卡片失败');
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : '复刻卡片失败',
              isLoading: false 
            });
            return null;
          }
        },

        createCard: async (cardData) => {
          set({ isLoading: true, error: null });
          try {
            const newCard = await cardApi.createCard(cardData);
            if (newCard) {
              const currentCards = get().cards;
              set({ 
                cards: [newCard, ...currentCards],
                currentCard: newCard,
                isLoading: false 
              });
              return newCard;
            } else {
              throw new Error('创建卡片失败');
            }
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
            const updatedCard = await cardApi.updateCard(cardId, cardData);
            if (updatedCard) {
              const cards = get().cards.map(card => 
                card.id === updatedCard.id ? updatedCard : card
              );
              set({ 
                cards,
                currentCard: updatedCard,
                isLoading: false 
              });
              return updatedCard;
            } else {
              throw new Error('更新卡片失败');
            }
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
            const success = await cardApi.deleteCard(cardId);
            if (success) {
              const cards = get().cards.filter(card => card.id !== cardId);
              set({ 
                cards, 
                currentCard: get().currentCard?.id === cardId ? null : get().currentCard,
                isLoading: false 
              });
              return true;
            } else {
              throw new Error('删除卡片失败');
            }
          } catch (error) {
            set({ 
              error: error instanceof Error ? error.message : '删除卡片失败',
              isLoading: false 
            });
            return false;
          }
        }
      }),
      {
        name: 'card-storage',
        partialize: (state) => ({
          cards: state.cards,
          templates: state.templates,
        }),
      }
    )
  )
); 