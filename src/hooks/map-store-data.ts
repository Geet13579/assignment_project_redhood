import { create } from "zustand";

// Define the License interface
interface License {
  description: string;
}

interface State {
  state: string;
}

interface FormData {
  status: string;
  id: string;
}

// Zustand store with types
interface LicenseStore {
  licenses: License[];
  state : State[];
  formData: FormData;
  setLicenses: (mapData: License[]) => void;
  fetchLicenses: (input: string) => Promise<void>;
  fetchState : () => void;
  updateEmployee?: (id: string, status: string) => Promise<void>; // Optional if not implemented yet
}

export const useMapStore = create<LicenseStore>((set) => ({
  licenses: [
    {
      description: "",
    },
  ],
  state: [
    {
      state: "",
    },
  ],
  formData: {
    status: "",
    id: "",
  },
  setLicenses: (mapData) => set({ licenses: mapData }),
  

  fetchLicenses: async (input) => {
    if (typeof window !== "undefined") {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=rai&key=AIzaSyAp64mA8cpUQCj0CcLvV_Uxs-sNlIM6MWQ`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        // console.log('data', input)
        // set({ licenses: data.data }); // Adjust if needed based on the response structure
        // // console.log("data", data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  },


  fetchState: async () => {
    if (typeof window !== "undefined") {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/get-states`,
          {
            method: "GET",
          }
        );

        const data = await response.json();
        // // console.log("data", data);

      } catch (error) {
        console.error("Error:", error);
      }
    }
  },
}));
