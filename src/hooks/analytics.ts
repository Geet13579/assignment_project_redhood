import { create } from "zustand";
import { handleApiError } from './check-login';

// Define the License interface

interface AnalyticsList {
  total_bookings: string;
  bar_graph_data: object;
  total_vehicles: string;
  total_invoices: string;
  customers_rating: string;
  task_type: object;
}
// Zustand store with types
interface AnalyticsStore {
  analytics: AnalyticsList[];
  //   setBookingData: (taskss: TaskList[]) => void;
  fetchAnalyticsList: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  analytics: [],
  setAnalyticsData: (analytics: any) => set({ analytics }),

  fetchAnalyticsList: async () => {
    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-analytics`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken.token}`,
          },
          // body: JSON.stringify({task_status:status})
        }
      );

      const data = await response.json();
      await handleApiError(data);


      set({ analytics: data.data });
      // // console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));
