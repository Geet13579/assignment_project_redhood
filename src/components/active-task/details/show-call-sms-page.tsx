// import { useEffect } from "react"
// import { useTaskStore } from "@/hooks/active-task/use-active-task";

// import { useSmsStore } from '@/hooks/active-task/use-call-sms'
import TablePage from './call-sms-list'

const tableHeading = [
  "Date",
  "Time",
  // "Delivery Time",
  "SMS/Call",
  "From",
  "To",
  "Content"

]

function OverviewPage({tasks}:{tasks:any}) {

  // const { licenses, fetchLicenses } = useSmsStore()

  // useEffect(() => {
  //   fetchLicenses();
  // }, [fetchLicenses]); // Added fetchBooking to the dependency array

  console.log('tasks', tasks)

  const licenses = [
    {
     
      date: '15-01-2025',
      time: '1:01 PM',
      smsCall: 'Message',
      from: 'Nexify World',
      to: 'Customer',
      deliveryTime:"24 Nov 2024",
      content: `Thank you for the booking on ${tasks?.appointment_date_time.split(" ")[0]} at ${tasks?.appointment_date_time.split(" ")[1]} for ${tasks?.car_number}. We will update you the ambassador details an hour prior to pickup time.Regards,Nexify World`  },
    {
     
      date: '15-01-2025',
      time: '1:15 PM',
      smsCall: 'Message',
      from: 'Nexify World',
      to: 'Customer',
      deliveryTime:"24 Nov 2024",
      content: `Your Ambassador ${tasks?.name} is enroute to your pick up location to pickup up ${tasks?.car_number}. Track here Regards, Nexify WorldDear Geetanjali Jangde, You have been assigned a new task. Please accept it in the next 60 seconds. Regards, Nexify World`},
    
    {
     
      date: '15-01-2025',
      time: '1:16 PM',
      smsCall: 'Message',
      from: 'Nexify World',
      to: 'Customer',
      deliveryTime:"24 Nov 2024",
      content: `Your Ambassador ${tasks?.name} is enroute to your pick up location to pickup up ${tasks?.car_number}. Track here Regards, Nexify World, `},  {
     
      date: '15-01-2025',
      time: '1:01 PM',
      smsCall: 'Message',
      from: 'Nexify World',
      to: 'Customer',
      deliveryTime:"24 Nov 2024",
      content: <div className="text-sm">
      Hi {tasks?.customer_name}, your booking is confirmed! ID: #{tasks?.id}, you can track it{' '}
      <a 
        href={`https://nexify-npi.vercel.app/vehicle-traking-page/${tasks.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800 underline"
      >
        here
      </a>
      . Regards, Nexify World
    </div>
    }
  
  ];

  return (
    <div>
   
      <div className='bg-white p-5  border-[1.5px] border-borderColor mt-5 mb-5'>

        <TablePage licenses={licenses} tableHeading={tableHeading}/>
      </div>
      <div className="text-right text-[#908A8A] font-regular mt-2">Note: This audio and content are available for 30 days. After that, both will be automatically deleted from the server.</div>

    </div>
  )
}

export default OverviewPage


