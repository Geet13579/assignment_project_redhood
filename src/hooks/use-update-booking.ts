import { create } from "zustand";
import { handleApiError } from './check-login';






interface CustomerDetails {
  id: number | null;
  customer_name: string;
  mobile_number: string;
  alt_mobile_number: string;
  email: string;
  flat: string ;
  street: string ;
  area: string ;
  landmark: string ;
  pincode: string ;
  city: string ;
  district: string ;
  state: string ;
  location: {
      lat: string;
      lng: string;  }

}

interface VehicleDetails {
  id: number | null;
  car_number: string;
  brand_name: string;
  model_name: string;
  variant: string;
  car_type: string;
  fuel_type: string;
}

interface FormData {
  type: string;
  appointment_date_time: string;
  category: string;
  cre_id: string;
  service_advicer_id: string;
  service_invoice_no: string;
  date_of_invoice: string;
  invoice_amount: string;
  invoice_attachement: string;
  note_to_driver: string;
  vehicle: VehicleDetails;
  customer: CustomerDetails;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data?: any;
}
interface StoreState {
  formData: FormData;
  setBookingType: (booking: string) => void;
  setpickupDrop: (tab: string) => void;
  setappointmentDate: (appointment_date_time: string) => void;
  submitData: (formData: FormData) => Promise<ApiResponse>;
 
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useBookingStore = create<StoreState>()((set, get) => ({
  formData: {
    type: "PICKUP",
    appointment_date_time: "",
    category: "SERVICE",
    service_advicer_id: "",
    cre_id: "",
    service_invoice_no: "",
    date_of_invoice: "",
    invoice_amount: "",
    invoice_attachement: "",
    note_to_driver: "",
    vehicle: 
      {
        fuel_type: "Petrol",
        car_type: "Automatic",
        variant: "",
        model_name: "",
        brand_name: "",
        car_number: "",
        id: null,
      },
    
    customer: 
      {
        id: null,
        customer_name: "",
        mobile_number: "",
        alt_mobile_number: "",
        email: "",
        flat: "",
        street: "",
        area: "",
        landmark: "",
        pincode: "",
        city: "",
        district: "",
        state: "",
        location: {
            lat: "0",
            lng: "0"
        }
       
      }
    ,
  },

  setBookingType: (booking: string) =>
    set((state) => ({
      formData: {
        ...state.formData,
        category: booking,
      },
    })),
    isLoading: false,
    setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  setpickupDrop: (tab: string) =>
    set((state) => ({
      formData: {
        ...state.formData,
        type: tab,
      },
    })),

  setappointmentDate: (appointment_date_time: string) =>
    set((state) => ({
      formData: {
        ...state.formData,
        appointment_date_time,
      },
    })),



  submitData: async (formData: FormData): Promise<ApiResponse> => {
  
    const token = localStorage.getItem("authToken");
    const parsedToken = token ? JSON.parse(token) : null;
  
    if (
      formData.type === "DROPOFF" &&
      (!formData.invoice_amount.trim() ||
        !formData.invoice_attachement.trim() ||
        !formData.date_of_invoice ||
        !formData.service_invoice_no)
    ) {
      return {
        status: false,
        message: "Please fill in all Invoice Details."
      };
    }

   
  
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-booking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken?.token}`,
        },
        body: JSON.stringify(formData),
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
    } finally {
      set({ isLoading: false });
    }
  },


}));

