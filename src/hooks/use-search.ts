import { create } from 'zustand';

interface useSearchInputStore {
  inputSearchText: string;
  setInputSearchText: (tab: string) => void;
}

export const useSearchInputStore = create<useSearchInputStore>((set) => ({
    inputSearchText: '', 
  setInputSearchText: (tab: string) => set({ inputSearchText: tab }),
}));