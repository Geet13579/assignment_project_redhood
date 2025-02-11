import { create } from 'zustand';
import { handleApiError } from '../check-login';

// Define the License interface


interface TaskList {
    customer_id: string;
    customer_name: string;
    mobile_number: string;
    alt_mobile_number: string;
    mail_id: string;
    created_at: string;
    updated_at: string;
    booking_number: string;
    service_invoice_no: string;
    date_of_invoice: string;
    invoice_amount: string;
    invoice_attachment: string;
    service_advicer_id: string;
    cre_id: string;
    category: string;
    note_to_driver: string;
    appointment_date_time: string;
    pickup_address: '' ;
    drop_address:'';
    status: string;
    type: string;
    car_number: string;
    brand_name: string;
    model_name: string;
    variant: string;
    car_type: string;
    fuel_type: string;
}

interface FormData {
  status: string;
  id: string;
}

// Zustand store with types
interface TaskStore {
  tasks: TaskList[];
  formData: FormData;
  setBookingData: (taskss: TaskList[]) => void;
  fetchTaskDetails: (id:any) => Promise<void>;  
}

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  formData: {
    status: "",
    id: "",
  },
  setBookingData: (tasks) => set({ tasks }),

  fetchTaskDetails: async (id) => {
    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/get-ongoing-task`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken.token}`,
        },
        body: JSON.stringify({task_id:id})
      });

      const data = await response.json();
      await handleApiError(data);

      // console.log('data', data)

      set({ tasks: data.data });
      // // console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
  },


  
}));
