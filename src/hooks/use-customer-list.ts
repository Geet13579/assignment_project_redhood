import { create } from "zustand";
import { handleApiError } from './check-login';


// Define the License interface
interface License {
  id: string;
  mobile_number: string;
  alt_mobile_number: string;
  customer_name: string;
  email: string;
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
      mobile_number: "",
      alt_mobile_number: "",
      customer_name: "",
      email: "",
    },
  ],
  formData: {
    status: "",
    id: "",
  },
  setLicenses: (licenses) => set({ licenses }),

  fetchLicenses: async () => {
    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-all-customers`,
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

      set({ licenses: data.data });
      // // console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
  },

  updateEmployee: async (id, status) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to change the status?"
    );

    if (isConfirmed) {
      status = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
      // console.log("status8579867967", status);

      const getToken = localStorage.getItem("authToken");
      const parsedToken = getToken ? JSON.parse(getToken) : null;

      try {
        const response = await fetch(
          `${process.env.BASEURL}/update-employee-status`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${parsedToken.token}`,
            },
            body: JSON.stringify({ id, status }),
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
    } else {
    }
  },
}));
