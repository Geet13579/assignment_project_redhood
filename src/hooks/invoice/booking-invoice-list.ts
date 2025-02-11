import { create } from 'zustand';

// Define the Invoice interface to match the image columns
interface Invoice {
  queueId: string;
  date: string;
  time: string;
  creId: string;
  customerName: string;
  amount: number;
  distanceExceedKm: string;
  gst: number;
  total: number;
  scInvoiceAmount: number | null;
  tranCharge: string | null;
  invoiceTotal: number | null;
  task: string;
  status: string;
}

const bookingInvoice: Invoice[] = [
  {
    queueId: '#5425GHYT',
    date: '24-09-2024',
    time: '9:30 AM',
    creId: '#CRE514D',
    customerName: 'Raj Mehta Sharma',
    amount: 200.00,
    distanceExceedKm: '15 KM X 15 = 225',
    gst: 18,
    total: 501.50,
    scInvoiceAmount: null,
    tranCharge: null,
    invoiceTotal: null,
    task: 'Pick-Up',
    status: 'Completed'
  },
  {
    queueId: '#5425GHYT',
    date: '24-09-2024',
    time: '9:30 AM',
    creId: '#CRE514D',
    customerName: 'Raj Mehta Sharma',
    amount: 200.00,
    distanceExceedKm: '200',
    gst: 18,
    total: 590.00,
    scInvoiceAmount: 5250.00,
    tranCharge: '2%',
    invoiceTotal: 5328.30,
    task: 'Drop-Off',
    status: 'Completed'
  },
  {
    queueId: '#5425GHYT',
    date: '24-09-2024',
    time: '9:30 AM',
    creId: '#CRE514D',
    customerName: 'Raj Mehta Sharma',
    amount: 200.00,
    distanceExceedKm: '20 KM X 15 = 300',
    gst: 18,
    total: 590.00,
    scInvoiceAmount: 5250.00,
    tranCharge: '2%',
    invoiceTotal: 5328.30,
    task: 'Drop-Off',
    status: 'Completed'
  },
  {
    queueId: '#5425GHYT',
    date: '24-09-2024',
    time: '9:30 AM',
    creId: '#CRE514D',
    customerName: 'Raj Mehta Sharma',
    amount: 200.00,
    distanceExceedKm: '--',
    gst: 18,
    total: 236.00,
    scInvoiceAmount: null,
    tranCharge: null,
    invoiceTotal: null,
    task: 'Return to SC',
    status: 'Completed'
  },
  {
    queueId: '#5425GHYT',
    date: '24-09-2024',
    time: '9:30 AM',
    creId: '#CRE514D',
    customerName: 'Raj Mehta Sharma',
    amount: 200.00,
    distanceExceedKm: '15 KM X 15 = 225',
    gst: 18,
    total: 501.50,
    scInvoiceAmount: null,
    tranCharge: null,
    invoiceTotal: null,
    task: 'Pick-Up',
    status: 'Completed'
  },
  {
    queueId: '#5425GHYT',
    date: '24-09-2024',
    time: '9:30 AM',
    creId: '#CRE514D',
    customerName: 'Raj Mehta Sharma',
    amount: 200.00,
    distanceExceedKm: '15 KM X 15 = 225',
    gst: 18,
    total: 501.50,
    scInvoiceAmount: null,
    tranCharge: null,
    invoiceTotal: null,
    task: 'Pick-Up',
    status: 'Completed'
  },
  {
    queueId: '#5425GHYT',
    date: '24-09-2024',
    time: '9:30 AM',
    creId: '#CRE514D',
    customerName: 'Raj Mehta Sharma',
    amount: 200.00,
    distanceExceedKm: '20 KM X 15 = 300',
    gst: 18,
    total: 590.00,
    scInvoiceAmount: 5250.00,
    tranCharge: '2%',
    invoiceTotal: 5328.30,
    task: 'Drop-Off',
    status: 'Completed'
  },
  {
    queueId: '#5425GHYT',
    date: '24-09-2024',
    time: '9:30 AM',
    creId: '#CRE514D',
    customerName: 'Raj Mehta Sharma',
    amount: 200.00,
    distanceExceedKm: '20 KM X 15 = 300',
    gst: 18,
    total: 590.00,
    scInvoiceAmount: 5250.00,
    tranCharge: '2%',
    invoiceTotal: 5328.30,
    task: 'Drop-Off',
    status: 'Completed'
  },
  {
    queueId: '#5425GHYT',
    date: 'No Show',
    time: 'No Show',
    creId: 'NO SHOW',
    customerName: 'No Show',
    amount: 150.00,
    distanceExceedKm: 'NO SHOW',
    gst: 18,
    total: 177.00,
    scInvoiceAmount: null,
    tranCharge: null,
    invoiceTotal: null,
    task: 'No Show',
    status: 'Cancelled'
  },
  {
    queueId: '#5425GHYT',
    date: '24-09-2024',
    time: '9:30 AM',
    creId: '#CRE514D',
    customerName: 'Raj Mehta Sharma',
    amount: 200.00,
    distanceExceedKm: '20 KM X 15 = 300',
    gst: 18,
    total: 590.00,
    scInvoiceAmount: null,
    tranCharge: null,
    invoiceTotal: null,
    task: 'Chauffeur',
    status: 'Completed'
  }
];

// Define totals interface
interface InvoiceTotals {
  totalAmount: number;
  totalGst: number;
  totalFinal: number;
  totalScInvoice: number;
  totalTranCharge: string;
  totalInvoiceAmount: number;
}

// Zustand store with types
interface InvoiceStore {
  bookingInvoice: Invoice[];
  totals: InvoiceTotals;
  setInvoices: (invoices: Invoice[]) => void;
  fetchInvoices: () => Promise<void>;
}

export const useInvoiceStore = create<InvoiceStore>((set) => ({
  bookingInvoice: [],
  totals: {
    totalAmount: 1750.00,
    totalGst: 18,
    totalFinal: 4631.50,
    totalScInvoice: 21000.00,
    totalTranCharge: '1.5%',
    totalInvoiceAmount: 21315.00
  },
  setInvoices: (invoices: Invoice[]) => set({ bookingInvoice: invoices }),
  fetchInvoices: async () => {
    // Simulate fetching data (replace with actual API call)
    // const response = await fetch('/api/invoices');
    // const data = await response.json();
    set({ bookingInvoice });
  },
}));