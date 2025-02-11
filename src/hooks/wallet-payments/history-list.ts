import { create } from 'zustand';
import { handleApiError } from '../check-login';

// Define the Invoice interface to match the image columns
interface historyDeatils {
    transition_details: string;
    queue_id: string;
    task: string;
    ref_id: string;
    debit: string;
    credit: string;
    balance: string;


}


const historyDeatils: historyDeatils[] = [
  {
    transition_details: "Money added to NPI Account",
    queue_id: "#5425ghyt",
    task: "",
    ref_id: "ref,825TH",
    debit: "--",
    credit: "₹ 5,000 cr.",
    balance: "₹ 5,500 Bal.",
    
  },
  {
    transition_details: "Money added to NPI Account",
    queue_id: "#5425ghyt",
    task: "",
    ref_id: "ref,825TH",
    debit: "--",
    credit: "₹ 5,000 cr.",
    balance: "₹ 5,500 Bal.",
    
  },


];



// Zustand store with types
interface hitoryStore {
    historyDeatils: historyDeatils[];
  setInvoices: (historyDeatils: historyDeatils[]) => void;
  fetchInvoices: () => Promise<void>;
}

export const usehistoryDeatilsStore = create<hitoryStore>((set) => ({
    historyDeatils: [],

  setInvoices: (historyDeatils: historyDeatils[]) => set({ historyDeatils: historyDeatils }),
  fetchInvoices: async () => {
      const getToken = localStorage.getItem("authToken");
      const parsedToken = getToken ? JSON.parse(getToken) : null;
  
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/get-all-transactions`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedToken.token}`,
            },
          }
        );
  
        const data = await response.json();
        await handleApiError(data);

  
        set({ historyDeatils:data.data });

        // // console.log("data", data);
      } catch (error) {
        console.error("Error:", error);
      }
     

  },
}));