import { create } from 'zustand';

// Define the Invoice interface to match the image columns
interface Invoice {
    product_id: string;
    description: string;
    qty: string;
    amount: string;
}

const invoice: Invoice[] = [
  {
    product_id: '#5425ghyt',
    description: 'Pick-up',
    qty: '21',
    amount: '₹4,200.00'
  },
  {
    product_id: '#5425ghyt',
    description: 'Pick-up',
    qty: '21',
    amount: '₹4,200.00'
  },
  {
    product_id: '#5425ghyt',
    description: 'Pick-up',
    qty: '21',
    amount: '₹4,200.00'
  },
  {
    product_id: '#5425ghyt',
    description: 'Exceed KM Charge - ( Multiple x ₹15 Each Ride )',
    qty: '21',
    amount: '₹4,200.00'
  },
  {
    product_id: '#5425ghyt',
    description: 'Exceed KM Charge - ( Multiple x ₹15 Each Ride )',
    qty: '21',
    amount: '₹4,200.00'
  }

];



// Zustand store with types
interface InvoiceStore {
  invoice: Invoice[];
  setInvoices: (invoices: Invoice[]) => void;
  fetchInvoices: () => Promise<void>;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  invoice: [],

  setInvoices: (invoices: Invoice[]) => set({ invoice: invoices }),
  fetchInvoices: async () => {
    // Simulate fetching data (replace with actual API call)
    // const response = await fetch('/api/invoices');
    // const data = await response.json();
    set({ invoice });
  },
}));