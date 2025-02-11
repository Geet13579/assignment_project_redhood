import { create } from "zustand";
import { handleApiError } from '../check-login';

// Define the License interface

interface profileDetails {
  amount: string;
  branch_manager_name: string;
  brand_name: string;
  designation: string | null;
  id: string;
  name: string;
  user_type: string;
}
// Zustand store with types
interface ProfileDetails {
  profileData: profileDetails[];
  //   setBookingData: (taskss: TaskList[]) => void;
  fetchProfileData: () => Promise<void>;
}

export const useProfileDetails = create<ProfileDetails>((set) => ({
  profileData: [],
  setProfileData: (profileData: any) => set({ profileData }),

  fetchProfileData: async () => {
    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken.token}`,
          },
          // body: JSON.stringify({task_status:status})
        }
      );

      const data = await response.json();
      await handleApiError(data);


      set({ profileData: data.data });
      // // console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
  },
}));
