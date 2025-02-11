

  import { create } from 'zustand';

  // Define the License interface
  interface License {
    licenseNo: string;
    date: string;
    customerName: string;
    svcName: string;
    paid: string;
    amount: string;
    task: string;
  }
  
  const licenses = [
    {
     
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Customer Name',
      svcName: 'SVC Name',
      paid: 'Paid',
      amount: 'Amount',
      task: 'Pick-Up'
    },
    {
      
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Mr. Mikes Deshn',
      svcName: 'Automatic',
      paid: 'Paid',
      amount: 'Amount',
      task: 'Return To SC'
    },
    {
      
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Mr. Sunil Kumar Desai',
      svcName: 'SVC Name',
      paid: 'Paid',
      amount: 'Amount',
      task: 'Drop-Off'
    },
    {
     
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Customer Name',
      svcName: 'SVC Name',
      paid: 'Paid',
      amount: 'Amount',
      task: 'Chauffeur'
    },
    {
     
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Customer Name',
      svcName: 'SVC Name',
      paid: 'Paid',
      amount: 'Amount',
      task: 'Pick-Up'
    },
    {
     
      licenseNo: '#5425GHYT',
      date: 'No Show',
      customerName: 'No Show',
      svcName: 'No Show',
      paid: 'No Show',
      amount: 'No Show',
      task: 'Cancelled'
    },
    {
      
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Mr. Sunil Kumar Desai',
      svcName: 'SVC Name',
      paid: 'Paid',
      amount: 'Amount',
      task: 'Drop-Off'
    },
    {
     
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Customer Name',
      svcName: 'SVC Name',
      paid: 'Paid',
      amount: 'Amount',
      task: 'RSA'
    },
    {
     
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Customer Name',
      svcName: 'SVC Name',
      paid: 'Unpaid',
      amount: 'Amount',
      task: 'Both'
    },
    {
     
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Customer Name',
      svcName: 'SVC Name',
      paid: 'Paid',
      amount: 'Amount',
      task: 'Chauffeur'
    },
    {
     
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Customer Name',
      svcName: 'SVC Name',
      paid: 'Unpaid',
      amount: 'Amount',
      task: 'Both'
    },
    {
     
      licenseNo: '#5425GHYT',
      date: '26-09-2024',
      customerName: 'Customer Name',
      svcName: 'SVC Name',
      paid: 'Paid',
      amount: 'Amount',
      task: 'RSA'
    }
  ];


  
  // Zustand store with types
  interface LicenseStore {
    licenses: License[];
    setLicenses: (licenses: License[]) => void;
    fetchLicenses: () => Promise<void>;
  }
  
  export const useLicenseStore = create<LicenseStore>((set) => ({
    licenses: [], // Initialize with an empty array
    setLicenses: (licenses: License[]) => set({ licenses }),
    fetchLicenses: async () => {
      // Simulate fetching data (you can replace this with actual API call)
      // const response = await fetch('/api/licenses');
      // const data: License[] = await response.json();
      
      // Set the licenses with the fetched data
      set({ licenses });
    },
  }));
  
  