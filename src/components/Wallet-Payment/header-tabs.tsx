'use client'
import { useEffect } from 'react'
import HeaderTab from '@/components/tabs/headerTabs'
import WalletPayment from './settlement-page'
import { useTabStore } from '@/hooks/use-tabs'
import PaymentGateway from './payment-gateway-page'
import HistoryPage from './history-page'

import { useParams } from "next/navigation";

const cardData = [
  { label: "Settlement", active: true,value:"settlement" },
  { label: "Payment Gateway", active: true,value:"payment-gateway" },
  { label: "History", active: true,value:"history" }
];

const cardData1 = [
  { label1: "Filter", icon: '' }
];

export default function HeaderTabs() {
  const { setActiveTab, activeTab } = useTabStore()
  const params = useParams();
  const { slug } = params


  useEffect(() => {
    setActiveTab(slug as string)
     // Set "Settlement" as the active tab on mount
  }, [setActiveTab])

  return (
    <div>
      <div className='grid 2xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 pb-1 mt-5'>

      </div>
      <HeaderTab cardData={cardData} cardData1={cardData1} />
      {activeTab === "settlement"? <WalletPayment />:activeTab === "payment-gateway"? <PaymentGateway/>  : activeTab==="history"?  <HistoryPage/>:"" 
      }
      
    </div>
  )
}
