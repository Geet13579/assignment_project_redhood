import { create } from "zustand";
import { handleApiError } from './check-login';

// Define the VehicleDetails interface
interface VehicleDetails {
  fuel_type: string;
  car_type: string;
  variant: string;
  model_name: string;
  brand_name: string;
  car_number: string;
  customer_id: string;
  id: string;

}

interface FormData {
  status: string;
  id: string;
}

// Zustand store with types
interface LicenseStore {
  VehicleDetails: VehicleDetails[];
  formData: FormData; // Make sure to manage formData if needed
  setVehicleDetails: (VehicleDetails: VehicleDetails[]) => void;
  fetchVehicleDetails: (customer_id: string) => Promise<void>; 
}

export const useVehicleStore = create<LicenseStore>((set) => ({
  VehicleDetails: 
  [
    {
      fuel_type: "",
      car_type: "",
      variant: "",
      model_name: "",
      brand_name: "",
      car_number: "",
      customer_id: "",
      id: "",
    }
    
  ],
  

  formData: { status: "", id: "" }, // Initialize formData

  setVehicleDetails: (VehicleDetails) => set({ VehicleDetails }),

  fetchVehicleDetails: async (customer_id) => {
    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-all-vehicles`,
        {
          method: "POST",
          body: JSON.stringify({ customer_id}),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken?.token}`,
          },
        }
      );

      const data = await response.json();
            await handleApiError(data);
      
      set({ VehicleDetails: data.data });
      // // console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
  },

}));
