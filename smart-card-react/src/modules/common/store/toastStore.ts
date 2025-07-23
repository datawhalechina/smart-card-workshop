import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { ToastProps } from '@/modules/common/types';

interface ToastState {
  toasts: ToastProps[];
}

interface ToastActions {
  addToast: (toast: ToastProps) => void;
  removeToast: (index: number) => void;
  clearToasts: () => void;
}

export type ToastStore = ToastState & ToastActions;

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