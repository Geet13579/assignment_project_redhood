import { useEffect, useState, useCallback } from "react"
import { useTaskStore } from "@/hooks/active-task/use-active-task";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/manual-calender"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLicenseStore } from '@/hooks/active-task/use-overview-list'
import TablePage from './active-task-list'
import { useSearchInputStore } from "@/hooks/use-search"

const tableHeading = [
  "Booking Id",
  "Number Plate (Car Number)",
  "Date",
  "Customer Name",
  // "SVC Name",
  "Paid",
  "Amount",
  "Task",
  "Category",
  "Task Status",
  // "Details"

]

function OverviewPage() {

  const { fetchTaskList, tasks } = useTaskStore();
  const { inputSearchText } = useSearchInputStore();

  const [isFiltering, setIsFiltering] = useState(false);

  const [filteredBookings, setFilteredBookings] = useState(tasks);

  useEffect(()   => {
    fetchTaskList("COMPLETED");
  }, [fetchTaskList]); // Added fetchBooking to the dependency array

   // Debounced filtering function
  const filterBookings = useCallback(() => {
    setIsFiltering(true);
    
    // Simulate a delay to show loading state
    setTimeout(() => {
      const filtered = tasks?.filter(booking => {
        if (!inputSearchText) return true;
        
        const searchLower = inputSearchText.toLowerCase();
        return (
          booking?.customer_name?.toLowerCase().includes(searchLower) ||
          booking?.car_number?.toLowerCase().includes(searchLower) ||
          booking?.mobile_number?.toLowerCase().includes(searchLower) ||
          //@ts-expect-error null
          booking?.id?.toLowerCase().includes(searchLower) ||
          booking?.model_name?.toLowerCase().includes(searchLower)
        );
      });
      
      setFilteredBookings(filtered);
      setIsFiltering(false);
    }, 300); // 500ms delay to show loading state
  }, [tasks, inputSearchText]);



  useEffect(() => {
    filterBookings();
  }, [inputSearchText, filterBookings]);

  // Loading states
  if (!tasks?.length) {
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




  return (
    <div>
      {/* <div className='bg-white p-5  border-[1.5px] border-borderColor'>
        <p className='text-[#686868] text-[16px]'>Select Date Range</p>
        <div className='flex w-full justify-between gap-8 mt-4 '>
          <div className='w-[45%]'>
            <Popover>
              <PopoverTrigger asChild>

                <button
                  // variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal   border-[1.5px] border-[#CCBEBE] flex items-center p-2 rounded-[6px]",

                  )}
                >

                  <span className="text-[#686868] text-[16px]">Pick a date</span>

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </button>

              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"

                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

          </div>
          <div className='w-[45%]'>
            <Popover>
              <PopoverTrigger asChild>

                <button
                  // variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal  border-[1.5px] border-[#CCBEBE] flex items-center p-2 rounded-[6px]",

                  )}
                >

                  <span className="text-[#686868] text-[16px]">Pick a date</span>

                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </button>

              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"

                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>

          </div>
          <div className='w-[10%] flex '>
            <button className='bg-primary  text-white py-2 w-full rounded-[6px]' >Apply</button>
          </div>
        </div>



      </div> */}


      <div className='bg-white p-5  border-[1.5px] border-borderColor mt-5 mb-10'>

        <TablePage licenses={filteredBookings} tableHeading={tableHeading}/>
      </div>
    </div>
  )
}

export default OverviewPage


