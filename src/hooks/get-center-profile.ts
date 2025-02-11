 import { create } from "zustand";
import { handleApiError } from './check-login';


interface NpiDetails {
    id: string;
    code_id: string;
    support_contact_number: string;
    land_line_number: string;
    manager_contact_number: string;
    center_mail_id: string;
    center_capacity: string;
    center_address: {
      full_address: string;
      landmark: string;
      pincode: string;
      city: string;
      district: string;
      state: string;
    };
    bussiness_licence_number: string;
    insurance_policy_number: string;
  }
  
  interface EmployeeDetails {
    name: string;
    mobile_number: string;
    email_id: string;
    designation: string;
    branch_name: string;
    employee_uid:string
    id:string
  }
  

interface FormData {
  status: string;
  id: string;
}

// Zustand store with types
interface CenterStore {
    formData: FormData;
    npiDetails: NpiDetails | null;
    employeeDetails: EmployeeDetails | null;
    fetchCenterDetails: () => Promise<void>;
}

export const useCenterStore = create<CenterStore>((set) => ({
    formData: { status: "", id: "" },
    npiDetails: null,
    employeeDetails: null,


  fetchCenterDetails: async () => {
    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken?.token}`,
          },
        }
      );

      const data = await response.json();
      await handleApiError(data);


      set({
        npiDetails: data.data?.npi_details || null,
        employeeDetails: data.data?.employee_details
          ? data.data.employee_details
          : null, // Set null if empty
      });
      // // console.log("data",  data.data?.employee_details);
    } catch (error) {
      console.error("Error:", error);
    }
  },

}));
