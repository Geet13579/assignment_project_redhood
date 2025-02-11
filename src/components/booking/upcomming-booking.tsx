import { useEffect, useCallback, useState } from "react";
import { Ellipsis, Loader2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useBookingsStore } from "@/hooks/use-bookings-list";
import { useProfileDetails } from "@/hooks/wallet-payments/use-profile-store";
import { UseProfileStore } from "@/hooks/get-profile-data";
import { formatTime, formatDate } from '@/lib/time-formates';
import SuccessPopup from '@/lib/popup-mgs'
import { useCancleBookingStore } from "@/hooks/booking/cancel-booking";
import { useSearchInputStore } from "@/hooks/use-search"

import {filterBookings} from '@/lib/search-function'
function Upcoming() {
  const { fetchBooking, bookings } = useBookingsStore();
  const { inputSearchText } = useSearchInputStore();
  const { submitData, isLoading: isCancelling } = useCancleBookingStore();
  const [isFiltering, setIsFiltering] = useState(false);
  const [filteredBookings, setFilteredBookings] = useState(bookings);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const { setWallet } = UseProfileStore();


  useEffect(() => {
    fetchBooking();
  }, [fetchBooking]);

  useEffect(() => {
    setIsFiltering(true);
    const filterBookingsData = filterBookings({ bookings, inputSearchText });
    setFilteredBookings(filterBookingsData);
    
    // Optional: Add a small delay just for the loading state if needed
    const timer = setTimeout(() => setIsFiltering(false), 300);
    return () => clearTimeout(timer);
  }, [inputSearchText, bookings]);
  // Loading states
  if (!bookings?.length) {
    return <div>Data Not Found..</div>;
  }
  
  if (isFiltering) {
    return (
      <div className="mt-4">
      <div className="flex flex-col  w-full items-center gap-2 p-2 rounded">
        <div className="grid grid-cols-3 w-full h-[150px] gap-4">
          <div className="bg-gray-200   rounded-[6px] animate-pulse"></div>
          <div className="bg-gray-200     rounded-[6px] animate-pulse"></div>
          <div className="bg-gray-200    rounded-[6px] animate-pulse"></div>
        </div>
        <div className="bg-gray-200 h-[300px] w-full  rounded-[6px] animate-pulse"></div>
        <div className="bg-gray-200 h-[300px] w-full  rounded-[6px] animate-pulse"></div>

        <div className="grid grid-cols-2 w-full h-[150px] gap-4">
          <div className="bg-gray-200   rounded-[6px] animate-pulse"></div>
          <div className="bg-gray-200     rounded-[6px] animate-pulse"></div>
        </div>
      </div>
    </div>
    );
  }

  if (filteredBookings?.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 text-gray-500">
        No pickup tasks found matching your search.
      </div>
    );
  }

  // console.log('inputSearchText', inputSearchText)


  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const parsedToken = token ? JSON.parse(token) : null;
  
      if (!parsedToken?.token) {
        throw new Error("No auth token found");
      }
  
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/get-profile`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${parsedToken.token}`,
          },
        }
      );
  
      const data = await response.json();
  
      if (data.message === "Unauthorized.") {
        // // console.log("first");
        window.location.href = "/";
      }
    
      setWallet(data?.data.amount)
  
  
      if (!data.data) {
        throw new Error("No data received from server");
      }
    } catch (error) {
      console.error("Error fetching ongoing task:", error);
      // Optionally, set an error state to handle UI feedback
      // setError(error.message);
    }
  };

  const handleCancelSubmit =async (task_id: any) => {
    // // console.log("task_id", task_id);

    const confirmCorrect = confirm("Are you sure you want to cancel this booking?");
    if (!confirmCorrect) {
      return;
    }
    // Avoid uncommenting conditional hooks
    try {
        const response = await submitData(task_id); // Ensure submitData is stable

        // // console.log('response.message', response.message)
        if (response.status) {
          
            setSuccessMessage(response.message);
            setShowSuccessPopup(true);
          fetchBooking();
          fetchProfile();

        } else {
        }
    } catch (error) {
        console.error("Submit error:", error);
    }
}; // Ensure submitData is defined and doesn't change unexpectedly






  const handlePopupClose =(() => {
    setShowSuccessPopup(false);

  });
  

  return (
    <div className="grid 2xl:grid-cols-2 xl:grid-cols-2 grid-cols-1 gap-8 pb-3 ">
      {filteredBookings?.map((details, index) => (
        <div
          className="h-auto bg-white border-[1.5px] border-borderColor rounded-[6px] "
          key={index}
        >
          {/* <div className={`border-[1px] border-gray-100 p-[25px] grid grid-cols-1 gap-3 ${details?.category ==="CHAUFFEUR" ? "bg-[#faf0e9]":}`}> */}
          <div className={`border-[1px] ${details?.category ==="CHAUFFEUR" ? "border-green-500 bg-[#f9fffb]":"border-yellow-500 bg-[#fffdf8]"}  p-[25px] grid grid-cols-1 gap-3`}>

            {/* Booking Number */}
            <div className="h-[55px] flex justify-between border-b-[1.5px] border-borderColor">
              <div className="grid grid-cols-1">
                <div className="text-textColorLight text-[12px] font-medium leading-[16px]">
                  Booking Number
                </div>
                <div className="text-[16px] font-medium">
                
                  #{
                    //@ts-expect-error null
                  details?.id}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                <button className="border-[1.5px] border-black px-[20px] py-[4px] rounded-[6px] text-[13px] text-black">
                    {details?.category}
                  </button>
                  <button className="border-[1.5px] border-primary px-[20px] py-[4px] rounded-[6px] text-[13px] text-primary bg-[#FFF0E6]">
                    {details?.type}
                  </button>
                </div>
                {/* <Ellipsis className="border-[2px] text-borderColor border-borderColor w-[35px] h-[30px] rounded-[6px]" /> */}
              </div>
            </div>

            <div className="h-auto py-1 flex justify-between mb-2">
              <ul className="w-[50%] flex flex-col gap-4">
                {/* Customer Details */}
                <li className="flex gap-2 items-center">
                  <div>
                    <Avatar className="h-[30px] w-[30px]">
                      <AvatarImage src="#" alt="Avatar" />
                      <AvatarFallback className="bg-transparent">
                        <img
                          src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg"
                          className="h-full"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-textColorLight text-[12px] font-medium leading-[16px]">
                      Customer Name
                    </p>
                    <p className="text-textLightColor text-[14px] font-medium">
                      {details?.customer_name}
                    </p>
                  </div>
                </li>

                {/* Car Details */}
                <li>
                  <div className="flex flex-col gap-1">
                    <p className="text-textColorLight text-[12px] font-medium leading-[16px]">
                      Car Name & Number
                    </p>
                    <p className="text-textLightColor text-[14px] font-medium">
                      {details?.brand_name}
                    </p>
                    <p className="text-textLightColor text-[14px] font-medium">
                      {details?.model_name}
                    </p>
                    <p className="text-textLightColor text-[14px] font-medium">
                      {details?.car_number}
                    </p>
                  </div>
                </li>

                {/* Pickup Address */}
                <li>
                  <div className="flex flex-col gap-1">
                    <p className="text-textColorLight text-[12px] font-medium leading-[16px]">
                      Location
                    </p>
                    {/* {details?.pickup_address && details?.pickup_address.length > 0 ? ( */}
                    <p className="text-textLightColor text-[14px] font-medium overflow-auto">
                      
                     {details.flat}, {details?.street} , {details?.area} , {details?.landmark} , {details?.pincode} , {
                     //@ts-expect-error null
                     details?.city_name} , {
                     //@ts-expect-error null
                      
                      details?.state_name}

                    </p>
                    {/* ) : (
                      <p className="text-textLightColor text-[14px] font-medium">No pickup address available</p>
                    )} */}
                  </div>
                </li>
              </ul>

              <ul className="w-[40%] flex flex-col gap-4">
                {/* Mobile Number */}
                <li>
                  <div className="flex flex-col gap-1">
                    <p className="text-textColorLight text-[12px] font-medium leading-[16px]">
                      Mobile Number
                    </p>
                    <p className="text-textLightColor text-[14px] font-medium">
                      {
                      //@ts-expect-error null
                      details?.customer_phone}
                    </p>
                  </div>
                </li>
                {/* Additional Details */}
                <li>
                  <div className="flex flex-col gap-1">
                    <p className="text-textColorLight text-[12px] font-medium leading-[16px]">
                      Date
                    </p>
                    <p className="text-textLightColor text-[14px] font-medium">
                      { details?.appointment_date_time=== null ? "------" :formatDate(details?.appointment_date_time)}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-col gap-1">
                    <p className="text-textColorLight text-[12px] font-medium leading-[16px]">
                      Pick-up Time
                    </p>
                    <p className="text-textLightColor text-[14px] font-medium">
                      {details?.appointment_date_time=== null ? "------" :formatTime(details?.appointment_date_time)}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-col gap-1">
                    <p className="text-textColorLight text-[12px] font-medium leading-[16px]">
                      Car Type
                    </p>
                    <p className="text-textLightColor text-[14px] font-medium">
                      {details?.car_type}
                    </p>
                  </div>
                </li>
                <li>
                  <div className="flex flex-col gap-1">
                    <p className="text-textColorLight text-[12px] font-medium leading-[16px]">
                      Fuel Type
                    </p>
                    <p className="text-textLightColor text-[14px] font-medium">
                      {details?.fuel_type}
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="h-[30px] flex justify-between ">
              
              <button className="w-[40%] hover:bg-[#FFF0E6] border-[1.5px] rounded-[6px]  border-borderColor text-[#686868] text-[14px]" onClick={() => 
              //@ts-expect-error null
              handleCancelSubmit(details?.id)}
              >
                Cancel
              </button>
              <button
                className="w-[40%] border-[1.5px] rounded-[6px] bg-primary text-white text-[14px]"
                onClick={() => {
                  //@ts-expect-error null
                  window.location.href = `/modify-booking/${details?.id}`;
                }}
              >
                Modify
              </button>
            </div>
          </div>
        </div>
      ))}


{showSuccessPopup && (
      <SuccessPopup 
        message={successMessage} 
        onClose={handlePopupClose}
      />
    )}

    </div>
  );
}

export default Upcoming;
