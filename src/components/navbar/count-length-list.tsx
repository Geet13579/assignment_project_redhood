import {useEffect} from 'react'

import { useTaskStore } from "@/hooks/active-task/use-active-task";

import { useBookingsStore } from "@/hooks/use-bookings-list";


function CountList(label: any) {

 
    const { fetchTaskList, tasks } = useTaskStore();
    const { fetchBooking, bookings } = useBookingsStore();

    useEffect(() => {
      fetchBooking();
    }, [fetchBooking]);

    
  useEffect(() => {
    fetchTaskList("");
  }, [fetchTaskList]); 





  return (
<div className='width-[50%]'>
<div className={`${label.label=="Active Tasks"? "":"hidden"} bg-[#f09c65] w-[15px]  inline-flex justify-center ml-[10px]  h-[15px] items-center text-center rounded-full text-white`}><p className='text-center text-[10px]'>{tasks.length}</p></div>

<div className={`${label.label=="Paused"? "":"hidden"} bg-[#f09c65] w-[15px]  inline-flex justify-center ml-[10px]  h-[15px] items-center text-center rounded-full text-white`}><p className='text-center text-[10px]'>{tasks.length}</p></div>


<div className={`${label.label=="Message"? "":"hidden"} bg-[#f09c65] w-[15px]  inline-flex justify-center ml-[10px]  h-[15px] items-center text-center rounded-full text-white`}><p className='text-center text-[10px]'>{tasks.length}</p></div>


<div className={`${label.label=="Upcoming Booking"? "":"hidden"}  bg-[#f09c65] w-[15px]  inline-flex justify-center ml-[10px]  h-[15px] items-center text-center rounded-full text-white`}><p className='text-center text-[10px]'>{bookings.length}</p></div>

</div>


  )
}

export default CountList