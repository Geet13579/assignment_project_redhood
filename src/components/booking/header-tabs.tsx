
'use client'
import { useEffect } from 'react'
import HeaderTab from '@/components/tabs/headerTabs'
import { useTabStore } from '@/hooks/use-tabs'
import { useParams } from "next/navigation";
import SearchBar from "@/components/navbar/search-bar";
import { useBookingStore } from "@/hooks/use-add-booking";

import { lazyLoad } from '@/lib/lazyLoading'
const AddBooking = lazyLoad(() => import('@/components/booking/add-booking'));
const UpcomingBooking = lazyLoad(() => import('@/components/booking/upcomming-booking'));

const cardData = [
  { label: "Add Booking", active: true, value: "SERVICE" },
  { label: "Chauffeur", active: true, value: "CHAUFFEUR" },
  { label: "RSA", active: true, value: "RSA" },
  { label: "Upcoming Booking", active: true, value: "Upcoming-Booking" }
];

const cardData1 = [
  { label1: "Filter", icon: '' }
];


function HeaderTabs() {
  const { setActiveTab, activeTab } = useTabStore()
  const params = useParams();
  const {formData} = useBookingStore()
  const { slug } = params



  useEffect(() => {
   
    formData.category = slug as string
    setActiveTab(slug as string)
    // Set "Settlement" as the active tab on mount
  }, [setActiveTab])

  return (
    <div>
      <HeaderTab cardData={cardData} cardData1={cardData1} />
      {
        activeTab == "Upcoming-Booking" ?

         <><SearchBar />
              <UpcomingBooking />
              </>
         
          : activeTab == "RSA" ? "Coming Soon..." : <AddBooking />
      }
    </div>
  )
}

export default HeaderTabs