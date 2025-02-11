import { create } from "zustand";

// Interfaces for Form Data
interface CustomerDetails {
  id: number | null;
  customer_name: string;
  mobile_number: string;
  alt_mobile_number: string;
  email: string;
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


interface pickupDetails {
  appointment_date_time :null
  note_to_driver: null,
  flat: string;
  street: string;
  area: string;
  landmark: string;
  pincode: string;
  full_address: string;
  city_id: string;
  state_id: string;
  state:string;
  location: {
    lat: string;
    lng: string;
  };
  id: number | null;
  customer_name: string;
  mobile_number: string;
  alt_mobile_number: string;
  email: string;
  autofilled:boolean

}

interface dropOffDetails {
  appointment_date_time :null
  note_to_driver: null,
  flat: string;
  street: string;
  area: string;
  landmark: string;
  pincode: string;
  full_address: string;
  city_id: string;
  state_id: string;
  state:string;
  location: {
    lat: string;
    lng: string;
  };
  id: number | null;
  customer_name: string;
  mobile_number: string;
  alt_mobile_number: string;
  email: string;
  autofilled:boolean
}

interface FormData {
  type: string;
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
  pick_up: pickupDetails;
  drop_off: dropOffDetails;
}

interface ApiResponse {
  status: boolean;
  message: string;
  data?: any;
}

// Zustand State Interface
interface StoreState {
    dropFormData: FormData;
  bothvalidationErrors: Partial<Record<string, string>>; // Flexible error messages
  setBookingType: (booking: string) => void;
  setpickupDrop: (tab: string) => void;
  setPickupDetails: (customer: any) => void;
  setDropoffDetails: (customer: any) => void;
  setappointmentDate: (appointment_date_time: string) => void;
  BothvalidateForm: () => boolean;
  submitBothData: (dropFormData: FormData) => Promise<ApiResponse>;
  clearData: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  setbothValidationErrors: (errors: Partial<Record<string, string>> | ((prevErrors: Partial<Record<string, string>>) => Partial<Record<string, string>>)) => void;

}

// Zustand Store
export const useDropBookingStore = create<StoreState>()((set, get) => ({
  dropFormData: {
    type: "PICKUP",
    category: "SERVICE",
    cre_id: "",
    service_advicer_id: "",
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
    },
    pick_up: {
      appointment_date_time: null,
      note_to_driver: null,
        flat: "",
        street: "",
        area: "",
        landmark: "",
        pincode: "",
        city_id: "",
        state_id: "",
        full_address: "",
        state:"",
        location: { lat: "0", lng: "0" },  id: null,
        customer_name: "",
        mobile_number: "",
        alt_mobile_number: "",
        email: "",
        autofilled:false

      
    },
    drop_off: {
      appointment_date_time: null,
      note_to_driver: null,
        flat: "",
        street: "",
        area: "",
        landmark: "",
        pincode: "",
        city_id: "",
        state_id: "",
        full_address: "",
        state:"",
        location: { lat: "0", lng: "0" },  id: null,
        customer_name: "",
        mobile_number: "",
        alt_mobile_number: "",
        email: "",
        autofilled:false
      
    },
  },
  bothvalidationErrors: {},
  setbothValidationErrors: (errors) => set({ bothvalidationErrors: typeof errors === 'function' ? errors(get().bothvalidationErrors) : errors }),

  setPickupDetails: (pickupDetails: Partial<pickupDetails>) =>
    set((state) => ({
      dropFormData: {
        ...state.dropFormData,
        pick_up: {
          ...state.dropFormData.pick_up,
          ...pickupDetails,
        },
      },
    })),
    setDropoffDetails: (pickupDetails: Partial<pickupDetails>) =>
      set((state) => ({
        dropFormData: {
          ...state.dropFormData,
          drop_off: {
            ...state.dropFormData.drop_off,
            ...pickupDetails,
          },
        },
      })),
  setBookingType: (booking: string) =>
    set((state) => ({
      dropFormData: { ...state.dropFormData, category: booking },
    })),

  setpickupDrop: (tab: string) =>
    set((state) => ({
      dropFormData: { ...state.dropFormData, type: tab },
    })),

  setappointmentDate: (appointment_date_time: string) =>
    set((state) => ({
      dropFormData: { ...state.dropFormData, appointment_date_time },
    })),

  BothvalidateForm: () => {
    const { dropFormData } = get();
    const errors: Partial<Record<string, string>> = {};

    if (!dropFormData.cre_id) errors.cre_id = "CRE is required.";
    if (!dropFormData.service_advicer_id) errors.service_advicer_id = "Service advicer is required.";

    // Vehicle details validation
    const { vehicle } = dropFormData;
    if (!vehicle.car_number.trim()) errors["vehicle.car_number"] = "Car number is required.";
    if (!vehicle.variant.trim()) errors["vehicle.variant"] = "Variant is required.";
    if (!vehicle.model_name.trim()) errors["vehicle.model_name"] = "Model name is required.";

    const { pick_up } = dropFormData;

    if (!pick_up.full_address.trim())
      errors["pick_up.full_address"] = "Please enter address";

    if (!pick_up.city_id.trim()) errors["pick_up.city"] = "City is required.";

    if (!pick_up.flat.trim())
      errors["pick_up.flat"] = "Flat number is required.";
    if (!pick_up.street.trim())
      errors["pick_up.street"] = "Street is required.";
    if (!pick_up.area.trim()) errors["pick_up.area"] = "Area is required.";
    if (!pick_up.landmark.trim())
      errors["pick_up.landmark"] = "Landmark is required.";

    if (!pick_up.pincode.trim())
      errors["pick_up.pincode"] = "Pincode is required.";

    if (!pick_up.location.lat || !pick_up.location.lng)
      errors["pick_up.location"] = "Customer location is incomplete.";





    const { drop_off } = dropFormData;

    if (!drop_off.full_address.trim())
      errors["drop_off.full_address"] = "Please enter address";

    if (!drop_off.city_id.trim()) errors["drop_off.city"] = "City is required.";

    if (!drop_off.flat.trim())
      errors["drop_off.flat"] = "Flat number is required.";
    if (!drop_off.street.trim())
      errors["drop_off.street"] = "Street is required.";
    if (!drop_off.area.trim()) errors["drop_off.area"] = "Area is required.";
    if (!drop_off.landmark.trim())
      errors["drop_off.landmark"] = "Landmark is required.";

    if (!drop_off.pincode.trim())
      errors["drop_off.pincode"] = "Pincode is required.";

    if (!drop_off.location.lat || !drop_off.location.lng)
      errors["drop_off.location"] = "Customer location is incomplete.";
    // Customer validation
    // const validateCustomer = (customer: CustomerDetails, prefix: string) => {
    //   if (!customer.flat.trim()) errors[`${prefix}.flat`] = "Flat is required.";
    //   if (!customer.street.trim()) errors[`${prefix}.street`] = "Street is required.";
    //   if (!customer.area.trim()) errors[`${prefix}.area`] = "Area is required.";
    //   if (!customer.landmark.trim()) errors[`${prefix}.landmark`] = "Landmark is required.";
    //   if (!customer.pincode.trim()) errors[`${prefix}.pincode`] = "Pincode is required.";
    //   if (!customer.city_id.trim()) errors[`${prefix}.city_id`] = "City is required.";
    //   if (!customer.state_id.trim()) errors[`${prefix}.state_id`] = "State is required.";
    //   if (!customer.location.lat || !customer.location.lng) errors[`${prefix}.location`] = "Location is incomplete.";
    // };

    // validateCustomer(dropFormData.pick_up.customer, "pick_up.customer");
    // validateCustomer(dropFormData.drop_off.customer, "drop_off.customer");
   
    set({ bothvalidationErrors: errors });
    return Object.keys(errors).length === 0;
  },

  submitBothData: async (formData: FormData): Promise<ApiResponse> => {
    const token = localStorage.getItem("authToken");
    const parsedToken = token ? JSON.parse(token) : null;

    // set({ isLoading: true });

    // console.log('formData', formData)
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/create-booking-pick-up-drop-off`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${parsedToken?.token}` || "",
        },
        body: JSON.stringify(formData),
      });

      const data: ApiResponse = await response.json();
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
      dropFormData: {
        type: "PICKUP",
        category: "SERVICE",
        cre_id: "",
        service_advicer_id: "",
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
        },
        pick_up: {
          appointment_date_time: null,
          note_to_driver: null,
            flat: "",
            street: "",
            area: "",
            landmark: "",
            pincode: "",
            city_id: "",
            state_id: "",
            state:"",
            full_address: "",
            location: { lat: "0", lng: "0" },
            id: null,
          customer_name: "",
          mobile_number: "",
          alt_mobile_number: "",
          email: "",
          autofilled:false
        },
        drop_off: {
          appointment_date_time: null,
          note_to_driver: null,
            flat: "",
            street: "",
            area: "",
            landmark: "",
            pincode: "",
            city_id: "",
            state_id: "",
            state:"",
            full_address: "",
            location: { lat: "0", lng: "0" },
            id: null,
          customer_name: "",
          mobile_number: "",
          alt_mobile_number: "",
          email: "",
          autofilled:false,
        },
      },
      bothvalidationErrors: {},
    }),

  isLoading: false,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
}));

