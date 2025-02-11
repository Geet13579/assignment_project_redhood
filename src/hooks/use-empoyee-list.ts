import { create } from "zustand";
import { handleApiError } from './check-login';
// Define the License interface
interface License {
  id: string;
  name: string;
  mobile_number: string;
  email_id: string;
  designation: string;
  branch_name: string;
  employee_uid: string;
  code_id: string;
  status: string;
  updated_at: string;
  created_at: string;
}

interface FormData {
  status: string;
  id: string;
}

// Zustand store with types
interface LicenseStore {
  licenses: License[];
  formData: FormData;
  setLicenses: (licenses: License[]) => void;
  fetchLicenses: (status: any) => Promise<void>;
  updateEmployee: (id: string, status: string) => Promise<void>;
}

export const useLicenseStore = create<LicenseStore>((set, get) => ({
  licenses: [
    {
      id :"",
      name :"",
      mobile_number :"",
      email_id :"",
      designation :"",
      branch_name :"",
      employee_uid :"",
      code_id :"",
      status :"",
      updated_at :"",
      created_at :"",
    },
  ],
  formData: {
    status: "",
    id: "",
  },
  setLicenses: (licenses) => set({ licenses }),

  fetchLicenses: async (status:any) => {

    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-all-employees`,
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
      if(status=="INACTIVE"){
        set({ licenses: data.data.filter((e:any) => e.status ===status) });

      }else{
        set({ licenses: data.data });
      }


      
      // // console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
  },

  updateEmployee: async (id, status) => {
  
      status = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      // console.log("status8579867967", status);

      const getToken = localStorage.getItem("authToken");
      const parsedToken = getToken ? JSON.parse(getToken) : null;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/update-employee-status`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedToken.token}`,
            },
            body: JSON.stringify({ employee_id:id, status }),
          });

        const data = await response.json();
        
        await get().fetchLicenses("");

        // set({ licenses: data.data });
        // // console.log("data", data);
      } catch (error) {
        console.error("Error:", error);
      }

      // const response = await fetch("http://localhost:8080/api/npi/update-employee-status", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${parsedToken.token}`,
      //   },
      //   body: JSON.stringify({ id, status }),
      // });
      // // console.log('response', response)

  },
}));
