
export function filterBookings({ bookings, inputSearchText }:any) {
  if (!bookings) return [];
  if (!inputSearchText) return bookings;

  
  
  const searchLower = inputSearchText.toLowerCase().trim();
  
  return bookings.filter((booking:any) => {


    console.log('booking', booking)
    return (
      booking?.customer_name?.toLowerCase().includes(searchLower) ||
      booking?.car_number?.toLowerCase().includes(searchLower) ||
      booking?.mobile_number?.toLowerCase().includes(searchLower) ||
      booking?.id?.toString().toLowerCase().includes(searchLower) ||
      booking?.model_name?.toLowerCase().includes(searchLower)
    );
  });
}

// You can create a type for the return object if needed
interface SearchFunctions {
  filterBookings: typeof filterBookings;
}

export default {
  filterBookings,
} as SearchFunctions;