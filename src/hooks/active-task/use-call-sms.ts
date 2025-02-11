
import { create } from 'zustand';

// Define the License interface
interface License {
    date: string;
    time: string;
    smsCall: string;
    from: string; // Updated to match the data field
    to: string;
    content: string;
    // deliveryTime: string;
  }

const licenses = [
  {
   
    date: '15-01-2025',
    time: '1:01 PM',
    smsCall: 'Message',
    from: 'Nexify World',
    to: 'Customer',
    deliveryTime:"24 Nov 2024",
    content: 'Thank you for the booking on 2025-01-15 at 17:00:00 for GJ-01-HH-2022. We will update you the ambassador details an hour prior to pickup time.Regards,Nexify World'  },
  {
   
    date: '15-01-2025',
    time: '1:15 PM',
    smsCall: 'Message',
    from: 'Nexify World',
    to: 'Customer',
    deliveryTime:"24 Nov 2024",
    content: 'Your Ambassador Geetanjali Jangde is enroute to your pick up location to pickup up GJ-01-HH-2022. Track here Regards, Nexify WorldDear Geetanjali Jangde, You have been assigned a new task. Please accept it in the next 60 seconds. Regards, Nexify World',
  },
  {
   
    date: '15-01-2025',
    time: '1:16 PM',
    smsCall: 'Message',
    from: 'Nexify World',
    to: 'Customer',
    deliveryTime:"24 Nov 2024",
    content: 'Your Ambassador Geetanjali Jangde is enroute to your pick up location to pickup up GJ-01-HH-2022. Track here Regards, Nexify World, '  },  {
   
    date: '15-01-2025',
    time: '1:01 PM',
    smsCall: 'Message',
    from: 'Nexify World',
    to: 'Customer',
    deliveryTime:"24 Nov 2024",
    content: 'Hi Geetanjali Jangde, your booking is confirmed! ID: #144, you can track it here from LInk. Regards, Nexify World'
  }

];

interface LicenseStore {
    licenses: License[];
    setLicenses: (licenses: License[]) => void;
    fetchLicenses: () => Promise<void>;
  }
  
  export const useSmsStore = create<LicenseStore>((set) => ({
    licenses: [], // Initialize with an empty array
    setLicenses: (licenses: License[]) => set({ licenses }),
    fetchLicenses: async () => {
      // Simulate fetching data (replace with actual API call if needed)
      // const response = await fetch('/api/licenses');
      // const data: License[] = await response.json();
      set({ licenses }); // Use the local sample data for now
    },
  }));