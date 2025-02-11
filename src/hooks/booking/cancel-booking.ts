import { create } from "zustand";
import { handleApiError } from '../check-login';

interface ApiResponse {
  status: boolean;
  message: string;
  data?: any;
}
interface StoreState {
  submitData: (formData: FormData) => Promise<ApiResponse>;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useCancleBookingStore = create<StoreState>()((set, get) => ({


    isLoading: false,
    setIsLoading: (loading: boolean) => set({ isLoading: loading }),

  submitData: async (task_id): Promise<ApiResponse> => {
    set({ isLoading: true });
    const token = localStorage.getItem("authToken");
    const parsedToken = token ? JSON.parse(token) : null;

    set({ isLoading: true }); 
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/cancel-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken?.token}`,
        },
        body: JSON.stringify({task_id:task_id}),
      });
      
      const data: ApiResponse = await response.json();
      await handleApiError(data);

      // if(data.status== true){
      set({ isLoading: false }); 

      // }
      return data;
      
    } catch (error) {
      console.error("Error:", error);
      set({ isLoading: false });
      return {
        status: false,
        message: "Submission failed, please try again."
      };
    }
  },


}));

