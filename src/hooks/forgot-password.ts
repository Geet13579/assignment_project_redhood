import { create } from "zustand";

// Interface for Form Data
interface Data {
  email: string;
  otp: string;
  password: string;
  cpassword: string;
}

// Interface for Errors
interface Errors {
  email?: string;
  otp?: string;
  password?: string;
  cpassword?: string;
}

// Store State Interface
interface StoreState {
  forgotPasswordDetails: Partial<Data>;
  errors: Errors;
  setForgotPasswordDetails: (details: Partial<Data>) => void;
  validateForm: (step: number, data:any) => boolean;
  setErrors: (errors: Errors) => void;
}

export const useForgotPassStore = create<StoreState>((set, get) => ({
  // Initial State
  forgotPasswordDetails: {
    email: "",
    otp: "",
    password: "",
    cpassword: "",
  },
  errors: {},

  // Method to update the state
  setForgotPasswordDetails: (details: Partial<Data>) =>
    set((state) => ({
      forgotPasswordDetails: {
        ...state.forgotPasswordDetails,
        ...details,
      },
    })),

  // Method to validate form based on current step
  validateForm: (step: number,data:any) => {

    console.log('data', data)
    const { forgotPasswordDetails } = get();
    const { email, otp, password, cpassword } = forgotPasswordDetails;
    const errors: Errors = {};

    switch (step) {
      case 0:
        // Validate only email at step 0
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
          errors.email = "Email is required.";
        } else if (!emailRegex.test(email)) {
          errors.email = "Please enter a valid email address.";
        }
    
        if(data.status ===false){
          errors.email = data.message
        }
        break;

      case 1:
        // Validate only OTP at step 1
        if (!otp) {
          errors.otp = "Please Enter OTP";
        } 

        if(data.status ===false){
          errors.otp = data.message
        }
        break;

      case 2:
        // Validate password and confirm password at step 2
        if (!password) {
          errors.password = "Password is required.";
        } else if (password.length < 8) {
          errors.password = "Password must be at least 8 characters long.";
        }

        if (!cpassword) {
          errors.cpassword = "Confirm Password is required.";
        } else if (cpassword !== password) {
          errors.cpassword = "Passwords do not match.";
        }
        break;
    }
console.log('errors', errors)
    set({ errors }); // Update errors in state
    return Object.keys(errors).length === 0;
  },

  // Method to set validation errors
  setErrors: (errors: Errors) => set({ errors }),
}));