import { create } from "zustand";
import { handleApiError } from './check-login';

// Define the TimeSlots interface
interface TimeSlots {
  id: string;
  end_time: string;
  start_time: string;
  is_active: boolean;
}

// Zustand store with types
interface TimeSlotsStore {
  timeSlots: TimeSlots[];
  setTimeSlot: (timeSlots: TimeSlots[]) => void;
  fetchTimeSlot: (date:any) => Promise<void>;
}

export const useTimeSlotStore = create<TimeSlotsStore>((set) => ({
  timeSlots: [
    {
      id: "",
      end_time: "",
      start_time: "",
      is_active: false,
    },
  ],

  setTimeSlot: (timeSlots) => set({ timeSlots }),
        //@ts-expect-error null

  fetchTimeSlot: async (date:any, activeTab:any) => {

    // console.log('activeTab', activeTab)
    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-time-slots`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken.token}`,
          },
          body: JSON.stringify({date:date,type:activeTab}),
        } 
      );

      const data = await response.json();
      await handleApiError(data);

      set({ timeSlots: data.data });
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));
