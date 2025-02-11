import { create } from 'zustand';

interface UseTabStore {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const useTabStore = create<UseTabStore>((set) => ({
  activeTab: 'SERVICE', 
  setActiveTab: (tab: string) => set({ activeTab: tab }),
}));




