// auth-utils.ts

interface ApiResponse {
  message?: string;
  status?: boolean;
  statusCode?: number;
}

// Helper function to handle fetch errors
export const handleApiError = async (response: ApiResponse) => {
    if(response.message === "Unauthorized.") {

        window.location.href = "/unauthorized"

    }

};