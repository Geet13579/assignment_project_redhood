'use client'
import { useEffect } from 'react'
import HeaderTab from '@/components/tabs/headerTabs'
import OverviewPage from './overview'
import CompletedPage from './completed'
import SearchBar from "@/components/navbar/search-bar";

import { useTabStore } from '@/hooks/use-tabs'
import {
  Ellipsis

} from "lucide-react";



const cardData = [
  { label: "Overview", active: true,value:"Overview" },
  { label: "Completed", active: true,value:"Completed" },
];

const cardData1 = [
  { label1: "Filter", icon: '' }
];


const dataMap = [
  {
    heading:"Pending Pick-up",
    totalNumber:"320",
    totalPercentage:"21.84%",
    totalIncreased:"+59",
    desc:"Total Number of Pick-up is Pending."

  },
  {
    heading:"Pending Drop-off",
    totalNumber:"263",
    totalPercentage:"16.68%",
    totalIncreased:"+36",
    desc:"Total Number of Drop-off is pending"

  },
  {
    heading:"Completed Today P-D",
    totalNumber:"176",
    totalPercentage:"32.84%",
    totalIncreased:"+759 Increased",
    desc:"Total Number of P-D is Completed Today"

  },
  {
    heading:"Completed in month P-D",
    totalNumber:"3645",
    totalPercentage:"226.84%",
    totalIncreased:"+1569",
    desc:"Total Number of P-D is Completed This Month"

  },
  

]

export default function HeaderTabs() {
  const { setActiveTab, activeTab } = useTabStore()

  useEffect(() => {
    setActiveTab("Overview")
     // Set "Overview" as the active tab on mount
  }, [setActiveTab])

  return (
    <div>
      <div className='grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 py-1 mt-5'>

        {/* {dataMap?.map( (data, index) => (
          <div className='h-auto bg-white border-[1.5px] border-borderColor rounded-[6px]' key={index}>
            <div className='border-[1px] border-gray-100 p-[12px] grid grid-cols-1 items-center gap-1'>
              <div className=' flex justify-between'>
                <div className='grid grid-cols-1 items-center '>
                  <div className='text-[#686868] text-[14px] font-medium leading-[16px]'>
                   {data.heading}

                  </div>

                </div>
                <div className='flex items-center gap-4'>

                  <Ellipsis className='border-[2px] text-borderColor border-borderColor w-[35px] h-[30px] rounded-[6px] ' />


                </div>

              </div>

              <div className='flex gap-2 items-center justify-start'>
                <p className='text-[20px] font-black'>
                 {data?.totalNumber}
                </p>
                <div>

                  <button className=' px-[10px] py-[4px] rounded-[6px] text-[10px] text-[#686868] bg-[#F9F4F4]' >{data?.totalPercentage}</button>

                </div>
                <div>
                  <button className=' rounded-[6px] text-[10px] text-textColorLight' >{data?.totalIncreased} Increased</button>

                </div>

              </div>
              <div className='text-[13px] text-textColorLight'>{data?.desc}</div>


            </div>

          </div>
        ))} */}




      </div>
      <HeaderTab cardData={cardData} cardData1={cardData1} />

<SearchBar />


      {activeTab === "Overview"? <OverviewPage />
      : activeTab==="Completed" ? <CompletedPage/>:""



      
      }
      
    </div>
  )
}
