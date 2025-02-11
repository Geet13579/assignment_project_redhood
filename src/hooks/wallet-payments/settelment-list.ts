import { create } from 'zustand';

// Define the Invoice interface to match the image columns
interface Settlement {
    service_period: string;
    settlement_date: string;
    neft_id: string;
    reference_id: string;
    notes: string;

}


const settlement: Settlement[] = [
  {
    service_period: '24 Sep 2024 to 26 Sep 2024',
    settlement_date: '27 Sep 2024',
    neft_id: '2540XXXXXXXX245',
    reference_id: 'AGD458T',
    notes:"--",
    
  },
  {
    service_period: '24 Sep 2024 to 26 Sep 2024',
    settlement_date: '27 Sep 2024',
    neft_id: '2540XXXXXXXX245',
    reference_id: 'AGD458T',
    notes:"--",
    
  },
  {
    service_period: '24 Sep 2024 to 26 Sep 2024',
    settlement_date: '27 Sep 2024',
    neft_id: '2540XXXXXXXX245',
    reference_id: 'AGD458T',
    notes:"--",
    
  },
  {
    service_period: '24 Sep 2024 to 26 Sep 2024',
    settlement_date: '27 Sep 2024',
    neft_id: '2540XXXXXXXX245',
    reference_id: 'AGD458T',
    notes:"--",
    
  },
  {
    service_period: '24 Sep 2024 to 26 Sep 2024',
    settlement_date: '27 Sep 2024',
    neft_id: '2540XXXXXXXX245',
    reference_id: 'AGD458T',
    notes:"--",
    
  },

];



// Zustand store with types
interface InvoiceStore {
    settlement: Settlement[];
  setInvoices: (settlement: Settlement[]) => void;
  fetchInvoices: () => Promise<void>;
}

export const useSettlementStore = create<InvoiceStore>((set) => ({
    settlement: [],

  setInvoices: (settlement: Settlement[]) => set({ settlement: settlement }),
  fetchInvoices: async () => {
    // Simulate fetching data (replace with actual API call)
    // const response = await fetch('/api/invoices');
    // const data = await response.json();
    set({ settlement });
  },
}));