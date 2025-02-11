import { create } from "zustand";

interface UseProfileStore {
  employee_name: string;
  employee_id: string;
  designation: string;
  wallet: number;
  setActiveProfile: (tab: string) => void;
  setEmployee_id: (tab: string) => void;
  setDesignation: (tab: string) => void;
  setWallet: (tab: number) => void;

}

export const UseProfileStore = create<UseProfileStore>((set) => ({
  employee_name: "",
  employee_id: "",
  designation: "",
  wallet:0,
  setActiveProfile: (tab: string) => set({ employee_name: tab }),
  setEmployee_id: (tab: string) => set({ employee_id: tab }),
  setDesignation: (tab: string) => set({ designation: tab }),
  setWallet: (tab: number) => set({ wallet: tab }),
}));
