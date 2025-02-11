
import { create } from 'zustand';

// Define the License interface
interface License {
    date: string;
    time: string;
    action: string;
    actionBy: string;
  }

const licenses = [
  {
   
    date: '26-09-2024',
    time: '9:30:52',
    action: 'Rahul',
    actionBy: 'Awaiting Amb Assiagnment',
  },
  {
   
    date: '26-09-2024',
    time: '9:30:52',
    action: 'Smeet',
    actionBy: 'Awaiting Amb Assiagnment',
  },
  {
   
    date: '26-09-2024',
    time: '9:30:52',
    action: 'Smeet',
    actionBy: 'Awaiting Amb Assiagnment',
  }, {
   
    date: '26-09-2024',
    time: '9:30:52',
    action: 'Smeet',
    actionBy: 'Awaiting Amb Assiagnment',
  }, {
   
    date: '26-09-2024',
    time: '9:30:52',
    action: 'Smeet',
    actionBy: 'Awaiting Amb Assiagnment',
  }, {
   
    date: '26-09-2024',
    time: '9:30:52',
    action: 'Smeet',
    actionBy: 'Awaiting Amb Assiagnment',
  },


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