import { create } from "zustand";
import { handleApiError } from "./check-login";

// Interfaces for Form Data
interface CustomerDetails {
  id: number | null;
  customer_name: string;
  mobile_number: string;
  alt_mobile_number: string;
  email: string;
  flat: string;
  street: string;
  area: string;
  landmark: string;
  pincode: string;
  full_address: string;
  city_id: string;
  state_id: string;
  location: {
    lat: string;
    lng: string;
  };
  isAutofilled: boolean;
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
  pick_up_id: number | null;
  category: string;
  cre_id: string;
  service_advicer_id: string;
  service_invoice_no: null;
  date_of_invoice: null;
  invoice_amount: null;
  invoice_attachment: null;
  note_to_driver: string;
  vehicle: VehicleDetails;
  customer: CustomerDetails;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data?: any;
}

// Zustand State Interface
interface StoreState {
  formData: FormData;
  validationErrors: Partial<Record<string, string>>; // Flexible error messages
  setBookingType: (booking: string) => void;
  setCustomerDetails: (customer: any) => void;
  setVehicleDetails: (vehicle: any) => void;
  setpickupDrop: (tab: string) => void;
  setappointmentDate: (appointment_date_time: string) => void;
  validateForm: () => boolean;
  submitData: (formData: FormData) => Promise<ApiResponse>;
  clearData: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setValidationErrors: (errors: Partial<Record<string, string>> | ((prevErrors: Partial<Record<string, string>>) => Partial<Record<string, string>>)) => void;
}

// Zustand Store
export const useBookingStore = create<StoreState>()((set, get) => ({
  formData: {
    type: "PICKUP",
    pick_up_id:null,
    appointment_date_time: "",
    category: "SERVICE",
    service_advicer_id: "",
    cre_id: "",
    service_invoice_no: null,
    date_of_invoice: null,
    invoice_amount: null,
    invoice_attachment: null,
    note_to_driver: "",
    vehicle: {
      fuel_type: "Petrol",
      car_type: "Automatic",
      variant: "",
      model_name: "",
      brand_name: "",
      car_number: "",
      id: null,
    },
    customer: {
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
      full_address: "",
      city_id: "",
      state_id: "",
      city: "",
      isAutofilled:false,
      state: "",
      location: {
        lat: "0",
        lng: "0",
      },
    },
  },

  validationErrors: {},
  setValidationErrors: (errors) => set({ validationErrors: typeof errors === 'function' ? errors(get().validationErrors) : errors }),
  setBookingType: (booking: string) =>
    set((state) => ({
      formData: { ...state.formData, category: booking },
    })),

  setpickupDrop: (tab: string) =>
    set((state) => ({
      formData: { ...state.formData, type: tab },
    })),

  setappointmentDate: (appointment_date_time: string) =>
    set((state) => ({
      formData: { ...state.formData, appointment_date_time },
    })),
  // Add this to the Zustand store definition
  setCustomerDetails: (customerDetails: Partial<CustomerDetails>) =>
    set((state) => ({
      formData: {
        ...state.formData,
        customer: {
          ...state.formData.customer,
          ...customerDetails,
        },
      },
    })),
  setVehicleDetails: (VehicleDetails: Partial<VehicleDetails>) =>
    set((state) => ({
      formData: {
        ...state.formData,
        vehicle: {
          ...state.formData.vehicle,
          ...VehicleDetails,
        },
      },
    })),

  validateForm: () => {
    const { formData } = get();
    const errors: Partial<Record<string, string>> = {};

    if (!formData.cre_id) errors.cre_id = "CRE is required.";
    if (!formData.service_advicer_id)
      errors.service_advicer_id = "Service advicer is required.";

    // Top-level fields
    if (!formData.appointment_date_time)
      errors.appointment_date_time = "Appointment date and time are required.";
    if (!formData.type) errors.type = "Booking type is required.";

    // Vehicle details
    const { vehicle } = formData;
    if (!vehicle.car_number.trim())
      errors["vehicle.car_number"] = "Car number is required.";
    if (!vehicle.variant.trim())
      errors["vehicle.variant"] = "Variant is required.";
    if (!vehicle.model_name.trim())
      errors["vehicle.model_name"] = "Model name is required.";

    // Customer details
    const { customer } = formData;
    if (!customer.customer_name.trim())
      errors["customer.customer_name"] = "Customer name is required.";
    if (!customer.mobile_number.trim()) {
      errors["customer.mobile_number"] = "Mobile number is required.";
    }
    else if(!/^[6-9]\d{9}$/.test(customer.mobile_number)){
      errors["customer.mobile_number"] =
        "Mobile number must be start with 6-9.";
    }
   else if (!/^\d{10}$/.test(customer.mobile_number)) {
      errors["customer.mobile_number"] =
        "Mobile number must be exactly 10 digits.";
    }

 
    // if(customer.alt_mobile_number != ""){
    //   if (!/^\d{10}$/.test(customer.alt_mobile_number)) {
    //     errors["customer.alt_mobile_number"] =
    //       "Mobile number must be exactly 10 digits.";
    //   }
    // }

    if (customer.email!="") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
      if (!customer.email.trim()) {
        errors["customer.email"] = "Email is required.";
      } else if (!emailRegex.test(customer.email)) {
        errors["customer.email"] = "Invalid email format.";
      }
    }
    

    if (!customer.full_address.trim())
      errors["customer.full_address"] = "Please enter address";

    if (!customer.city_id.trim()) errors["customer.city"] = "City is required.";
    if (!customer.state_id.trim())
      errors["customer.state"] = "State is required.";

    if (!customer.flat.trim())
      errors["customer.flat"] = "Flat number is required.";
    if (!customer.street.trim())
      errors["customer.street"] = "Street is required.";
    if (!customer.area.trim()) errors["customer.area"] = "Area is required.";
    if (!customer.landmark.trim())
      errors["customer.landmark"] = "Landmark is required.";

    if (!customer.pincode.trim())
      errors["customer.pincode"] = "Pincode is required.";

    if (!customer.location.lat || !customer.location.lng)
      errors["customer.location"] = "Customer location is incomplete.";

    // Invoice fields for DROPOFF
    if (formData.type === "DROPOFF") {
      if (formData.invoice_amount== null)
        errors.invoice_amount = "Invoice amount is required for DROPOFF.";
      if (formData.invoice_attachment== null)
        errors.invoice_attachment =
          "Invoice attachment is required for DROPOFF.";
      if (formData.date_of_invoice== null)
        errors.date_of_invoice = "Invoice date is required for DROPOFF.";
      if (formData.service_invoice_no== null)
        errors.service_invoice_no =
          "Service invoice number is required for DROPOFF.";
    }

    set({ validationErrors: errors });
    return Object.keys(errors).length === 0;
  },

  submitData: async (formData: FormData): Promise<ApiResponse> => {
    const token = localStorage.getItem("authToken");
    const parsedToken = token ? JSON.parse(token) : null;

    set({ isLoading: true });

    try {
      let url = "";
      // if (formData.type === "BOTH") {
      //   url = `${process.env.NEXT_PUBLIC_API_URL}/create-booking-pick-up-drop-off`;
      // } else {
        url = `${process.env.NEXT_PUBLIC_API_URL}/create-booking`;
      // }
      formData.customer.state_id = parsedToken?.state_id

      console.log('formData', formData)
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken?.token}`,
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();
      await handleApiError(data);

      return data;
    } catch (error) {
      console.error("Error:", error);
      return { status: false, message: "Submission failed, please try again." };
    } finally {
      set({ isLoading: false });
    }
  },

  clearData: () =>
    set({
      formData: {
        type: "PICKUP",
        appointment_date_time: "",
        pick_up_id: null,
        category: "SERVICE",
        service_advicer_id: "",
        cre_id: "",
        service_invoice_no:null,
        date_of_invoice:null,
        invoice_amount:null,
        invoice_attachment:null,
        note_to_driver: "",
        vehicle: {
          fuel_type: "Petrol",
          car_type: "Automatic",
          variant: "",
          model_name: "",
          brand_name: "",
          car_number: "",
          id: null,
        },
        customer: {
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
          full_address: "",
          city_id: "",
          state_id: "",
          location: { lat: "0", lng: "0" },
          isAutofilled:false
        },
      },
      validationErrors: {},
    }),

  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));
