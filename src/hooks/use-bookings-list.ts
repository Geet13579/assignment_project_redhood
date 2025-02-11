import { create } from 'zustand';
import { handleApiError } from './check-login';

// Define the Bookings interface
interface Bookings {
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
  pickup_address: string;
  drop_address: string;
  status: string;
  type: string;
  car_number: string;
  brand_name: string;
  model_name: string;
  variant: string;
  car_type: string;
  fuel_type: string;
  flat: string;
  street: string;
  area: string;
  landmark: string;
  pincode: string;
  city: string;
  district: string;
  state: string;
  location?: string; // Assuming location is stored as a stringified JSON
}

// Define the formData interface
interface FormData {
  type?: string;
  appointment_date_time?: string;
  category?: string;
  service_advicer_id?: string;
  cre_id?: string;
  service_invoice_no?: string;
  date_of_invoice?: string;
  invoice_amount?: string;
  invoice_attachement?: string;
  note_to_driver?: string;
  vehicle?: {
    id?: string | null;
    car_number?: string;
    brand_name?: string;
    model_name?: string;
    variant?: string;
    car_type?: string;
    fuel_type?: string;
  };
  customer?: {
    id?: string | null;
    customer_name?: string;
    mobile_number?: string;
    alt_mobile_number?: string;
    email?: string;
    flat?: string;
    street?: string;
    area?: string;
    landmark?: string;
    pincode?: string;
    city_id?: string;
    state_id?: string;
    location?: {
      lat?: number;
      lng?: number;
    };
  };
}

// Zustand store with types
interface LicenseStore {
  bookings: Bookings[];
  singleBooking: Bookings | null; // Single booking should be a single object or null
  UpdatedformData: FormData; // Add formData here
  loading: boolean; // Loading state for fetching
  error: string | null; // Error state for fetching
  setBookingData: (bookings: Bookings[]) => void;
  setOneBookingData: (booking: Bookings | null) => void;
  setUpdatedFormData: (data: Partial<FormData>) => void; // Add setter for formData
  clearFormData: () => void; // Clear form data function
  fetchBooking: () => Promise<void>;
  fetchOneBooking: (id: string) => Promise<void>;
  updateData: Record<string, any>; // Add this to store updated key-value pairs
  setUpdateBookingData: (key: string, value: any) => void;
}

export const useBookingsStore = create<LicenseStore>((set) => ({
  bookings: [],
  singleBooking: null, // Initialize singleBooking as null
  UpdatedformData: {}, // Initialize formData
  loading: false, // Initialize loading state
  error: null, // Initialize error state
  updateData: {},
  setUpdateBookingData: (key: string, value: any) =>
    set((state) => ({
      updateData: {
        ...state.updateData,
        [key]: typeof value === 'object' 
          ? { ...(state.updateData[key] || {}), ...value }
          : value,
      },
    })),
  
  setBookingData: (bookings) => set({ bookings }),
  setOneBookingData: (singleBooking) => set({ singleBooking }),
  
  setUpdatedFormData: (data) =>
    set((state) => ({
      UpdatedformData: { ...state.UpdatedformData, ...data }, // Merge new data with existing formData
    })),
  
  clearFormData: () => set({ UpdatedformData: {} }), // Function to clear form data

  fetchBooking: async () => {
    set({ loading: true, error: null }); // Set loading state
    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-all-upcoming-tasks`,
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

      set({ bookings: data.data, loading: false }); // Update bookings and loading state
    } catch (error) {
      console.error("Error:", error);
      set({ loading: false, error: "Failed to fetch bookings." }); // Update error state
    }
  },

  fetchOneBooking: async (id: string) => {
    set({ loading: true, error: null }); // Set loading state
    const getToken = localStorage.getItem("authToken");
    const parsedToken = getToken ? JSON.parse(getToken) : null;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-upcoming-task`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken?.token}`,
          },
          body: JSON.stringify({ task_id: id }),
        }
      );

      const data = await response.json();
      await handleApiError(data);

      const booking = data.data;

      set({
        singleBooking: booking,
        loading: false,
      });

      // Update formData based on the fetched singleBooking
      set((state) => ({
        UpdatedformData: {
          ...state.UpdatedformData,
          booking_id: booking.id,
          type: booking.type,
          appointment_date_time: booking.appointment_date_time,
          category: booking.category,
          service_advicer_id: booking.service_advicer_id,
          cre_id: booking.cre_id,
          service_invoice_no: booking.service_invoice_no,
          date_of_invoice: booking.date_of_invoice,
          invoice_amount: booking.invoice_amount,
          invoice_attachement: booking.invoice_attachement,
          note_to_driver: booking.note_to_driver,
          vehicle: {
            car_number: booking.car_number,
            brand_name: booking.brand_name,
            model_name: booking.model_name,
            variant: booking.variant,
            car_type: booking.car_type,
            fuel_type: booking.fuel_type,
          },
          customer: {
            customer_name: booking.customer_name,
            mobile_number: booking.mobile_number,
            alt_mobile_number: booking.alt_mobile_number,
            email: booking.email,
            flat: booking.flat,
            street: booking.street,
            area: booking.area,
            landmark: booking.landmark,
            pincode: booking.pincode,
            city_id: booking.city_id,
            state_id: booking.state_id,
            full_address: booking.full_address,
            location: booking.location
              ? JSON.parse(booking.location)
              : undefined,
          },
        },
        updateData:{
          booking_id:booking.id
        }
        
      }));

     
    } catch (error) {
      console.error("Error:", error);
      set({ loading: false, error: "Failed to fetch booking details." }); // Update error state
    }
  },
}));
