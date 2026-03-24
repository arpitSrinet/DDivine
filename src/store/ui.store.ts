/**
 * @file ui.store.ts
 * @description Shared UI-only Zustand state for transient shell interactions.
 * @module src/store/ui
 */
import { create } from 'zustand';

interface IToastItem {
  id: string;
  message: string;
  tone: 'error' | 'info' | 'success';
}

interface IUiState {
  isSidebarOpen: boolean;
  toasts: IToastItem[];
  addToast: (toast: IToastItem) => void;
  clearToasts: () => void;
  setSidebarOpen: (value: boolean) => void;
}

export const useUiStore = create<IUiState>((set) => ({
  addToast: (toast) => {
    set((state) => ({ toasts: [...state.toasts, toast] }));
  },
  clearToasts: () => {
    set({ toasts: [] });
  },
  isSidebarOpen: false,
  setSidebarOpen: (value) => {
    set({ isSidebarOpen: value });
  },
  toasts: [],
}));
