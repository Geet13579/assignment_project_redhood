import React, { useEffect, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTimeSlotStore } from "@/hooks/use-time-solts";
import { useTabStore } from '@/hooks/use-tabs'

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Calendar from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useBookingStore } from "@/hooks/use-add-booking";

interface DateItem {
  month: string;
  day: string;
  date: string;
  year: string;
  standardDate: string;
}

interface DateTimeItem {
  standardDate: string;
  standardTime: string;
  error: string;
}


const Select = () => {
  const { activeTab } = useTabStore()

  const [date, setDate] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(true);
  const [datesArray, setDatesArray] = useState<DateItem[]>([]);
  const [selectedDateItem, setSelectedDateItem] = useState<DateTimeItem | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSelect, setIsSelect] = useState("");
  const [isSelectDate, setIsSelectDate] = useState("");


const  [ selectedDate,SetselectedDate] = useState("")

  const { fetchTimeSlot, timeSlots } = useTimeSlotStore();

  const { formData,validationErrors } = useBookingStore();

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // // console.log('activeTab34565789', activeTab)

  
  useEffect(() => {
    const initializeData = async () => {
      setIsLoading(true);
      try {
        const currentDate = getCurrentDate();
        //@ts-expect-error null
        await fetchTimeSlot(currentDate, activeTab);
        setIsSelectDate(currentDate);

      } catch (error) {
        console.error("Error fetching time slots:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();

    // Add window focus event listener for data refresh
    const handleFocus = () => {
      initializeData();
    };

    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("focus", handleFocus);
    };
  }, [fetchTimeSlot]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      
      setDate(selectedDate);
      setShowMonthPicker(false);
      setOpen(false);
    }
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (isOpen) {
      setShowMonthPicker(true);
    }
  };

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
    };
    return date.toLocaleDateString("en-US", options);
  };

  const getDaysInMonth = useCallback((date: Date): DateItem[] => {
    const year = date.getFullYear();
    const monthNumber = date.getMonth();
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const selectedMonth = months[monthNumber];
    const daysInMonth = new Date(year, monthNumber + 1, 0).getDate();
    const today = new Date();
    const currentDay = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    return Array.from({ length: daysInMonth }, (_, day) => {
      const currentDate = new Date(year, monthNumber, day + 1);
      const dayOfWeek = currentDate.toLocaleString("en-US", {
        weekday: "short",
      });

      // Format the standard date as YYYY-MM-DD

      const dataStd = new Date(year, monthNumber, day + 2);
      const standardDate = dataStd.toISOString().split("T")[0];

      if (
        year > currentYear ||
        (year === currentYear && monthNumber > currentMonth) ||
        (year === currentYear &&
          monthNumber === currentMonth &&
          day + 1 >= currentDay)
      ) {
        return {
          month: selectedMonth,
          day: dayOfWeek,
          date: (day + 1).toString(),
          year: year.toString(),
          standardDate, // Add the standard date here
        };
      }
      return null;
    }).filter((item): item is DateItem => item !== null);
  }, []);

  useEffect(() => {
    const newDatesArray = getDaysInMonth(date);
    setDatesArray(newDatesArray);
  }, [date, getDaysInMonth]);

  const handleDateItemClick = (date:any)=>{

        //@ts-expect-error null

        // // console.log('activeTab', activeTab)
      fetchTimeSlot(date , activeTab);
      setIsSelectDate(date)
    
  };

  const formatTime = useCallback((dateTimeString: string) => {
    if (!dateTimeString) return "";

    const timePart = dateTimeString.split(" ")[1];
    const [hours, minutes] = timePart.split(":");
    const hoursNum = parseInt(hours);
    const hours12 = hoursNum % 12 || 12;
    const ampm = hoursNum >= 12 ? "PM" : "AM";

    return `${hours12}:${minutes} ${ampm}`;
  }, []);


  const handleTimeItemClick =(time:any)=>{
    setIsSelect(time);
    validationErrors["appointment_date_time"] = "";
    formData.appointment_date_time = time
  }

  
  return (
    <div className="bg-white border-[1.5px] border-borderColor p-[16px] rounded-[6px]">
      <div className="mt-1">
        <div className="flex justify-between items-center text-textLightColor">
          <div>Appointment Date *</div>
          <div className="border-[1.5px] border-borderColor px-2 py-1 text-center rounded-[6px]">
            ...
          </div>
        </div>

        <Popover open={open} onOpenChange={handleOpenChange}>
          <PopoverTrigger asChild>
            <div className="flex justify-between w-[400px] items-center text-textLightColor mt-2">
              <div className="border-[1.5px] border-borderColor px-2 py-1 flex gap-3 text-[14px] rounded-[6px]">
                {formatDate(date)}
                <ChevronDown />
              </div>
            </div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            {showMonthPicker && (
              <Calendar selected={date} onSelect={handleDateSelect} />
            )}
          </PopoverContent>
        </Popover>

        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full mt-4"
        >
          <CarouselContent>
            {datesArray.map((dateItem, index) => (
              <CarouselItem key={index} className="basis-[120px]">
                <div className="p-1">
                  <Card
                    className={cn(
                      "transition-all duration-500 ease-in-out cursor-pointer",
                      isSelectDate ===
                        dateItem?.standardDate
                        ? "border-primary bg-[#fff0e6]"
                        : "border-borderColor"
                    )}
                    onClick={() =>
                      handleDateItemClick(
                        dateItem?.standardDate
                      )
                    }
                  >
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                      <span className="text-[13px] text-textLightColor font-medium">
                        {dateItem?.day}
                      </span>
                      <span className="text-[16px] font-bold whitespace-nowrap">
                        {dateItem?.date} {dateItem?.month}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p className="text-primary text-[15px] flex gap-2">
          {selectedDateItem?.error}{" "}
        </p>
      </div>

      {/* Appointment Time section */}
      <div className="mt-6 mb-4">
        <div className="flex justify-between items-center text-textLightColor">
          <div>
            <p className="text-[16px] leading-[16px]">Appointment Time *</p>
            <span className="text-[#CCBEBE] text-[12px]">
              Select average time for Pick-up & Drop
            </span>
          </div>
          <div className="border-[1.5px] border-borderColor px-2 py-1 text-center rounded-[6px]">
            ...
          </div>
        </div>

        <div className="grid xl:grid-cols-5 md:grid-cols-3  grid-cols-2 gap-6 mt-4">
          {
            timeSlots?.length === 0 ? "No Time Slot Available":
          timeSlots?.map((data, index) => (
            <div
              key={index}

              onClick={() =>
                data?.is_active==true ?
                  handleTimeItemClick( data?.start_time)
                :
                ""
              
              }
              className={cn(
                "transition-all duration-500 ease-in-out cursor-pointer h-[30px] font-bold border-borderColor rounded-[6px] flex justify-center border-[1.5px]",
                isSelect ===  data?.start_time
                  ? "border-primary bg-[#fff0e6]"
                  : "border-borderColor",
                data?.is_active==true ? "" : "bg-gray-100 text-gray-400"
              )}
            >
              <span className="text-[13px] font-bold p-1">
                {`${formatTime(data?.start_time)} to ${formatTime(
                  data?.end_time
                )}`}
              </span>
            </div>
          ))}
        </div>

        {/* <div className="grid grid-cols-3 gap-6 mt-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="border-[1.5px] h-[30px] text-[12px] text-textLightColor font-medium border-borderColor rounded-[6px] flex justify-center">
                            <span className="text-[13px] p-1">8:00 to 8:30 AM</span>
                        </div>
                    ))}
                </div> */}
      </div>

      {validationErrors["appointment_date_time"] && (
          <span className="error text-[12px] text-red-500 ">❗{validationErrors["appointment_date_time"]}</span>
        )}
    </div>
  );
};

export default Select;
