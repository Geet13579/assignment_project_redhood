'use client'
import { useEffect } from 'react'
import Link from "next/link"
import { useBookingStore } from '@/hooks/use-add-booking'
import { useTabStore } from '@/hooks/use-tabs'
import { useTimeSlotStore } from "@/hooks/use-time-solts";
import SearchBar from "@/components/navbar/search-bar";
import { useRouter } from 'next/navigation'

// import { useParams } from 'next/navigation'
import { useLicenseStore } from '@/hooks/use-empoyee-list'


import { cn } from '@/lib/utils'

const Header = ({ cardData, slug }: any) => {

    const { setActiveTab, activeTab } = useTabStore()

    useEffect(() => {
        setActiveTab(slug)
    }, [setActiveTab])

    const handleTabs = async (tab: any) => {

        setActiveTab(tab)

    };

    console.log('activeTab', activeTab)

    return (
        <div >

            <div className="flex flex-col mt-5 mb-4 gap-3 w-full">



                <div className="w-full  border-[1.5px] rounded-[6px] border-borderColor md:overflow-hidden overflow-x-scroll   bg-white">
                    <header className="flex h-[62px] justify-between w-full shrink-0 items-center ">




                        <div className=" flex gap-5">

                            {cardData.map((card: any, index: number) => (
                                <Link
                                    href={["CHAUFFEUR", "SERVICE", "RSA", "Upcoming-Booking"].includes(card.value) ? `/add-booking/${card.value}` : "#/"}
                                    key={index}
                                    className={cn(
                                        "group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 font-medium transition-all ease-in-out",
                                        "before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-primary before:origin-center before:h-[1px] before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%]",
                                        "after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-primary after:origin-center after:h-[1px] after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]"
                                    )}
                                    prefetch={false}
                                    onClick={() => handleTabs(card.value)}
                                >
                                    <span className="relative z-10 transition-all ease-in-out flex items-center justify-center">
                                        <span
                                            className={cn(
                                                "w-1.5 h-1.5 rounded-full bg-primary mr-2 opacity-0 transform scale-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:scale-100",
                                                activeTab === card.value && "opacity-100 scale-100"
                                            )}
                                        ></span>
                                        <span className="relative py-2">
                                            {card.label}
                                            <span
                                                className={cn(
                                                    "absolute bottom-0 left-0 w-full h-[1.5px] bg-primary transform scale-x-0 transition-transform duration-300 ease-in-out origin-left group-hover:scale-x-100",
                                                    activeTab === card.value && "scale-x-100"
                                                )}
                                            ></span>
                                        </span>
                                    </span>
                                </Link>
                            ))}




                        </div>

                        {/* {cardData1.map((card, index) => (
              <Link href="#" className=" ml-auto mr-6 hidden lg:flex items-center gap-3 border border-borderColor p-2 rounded-[6px] font-medium font-[16px] " prefetch={false}>
                <span className="">{card.label1}</span>
                <CarIcon className="h-6 w-6" />

              </Link>

            ))} */}


                    </header>



                </div>







            </div>



        </div>

    )
}



export default Header
