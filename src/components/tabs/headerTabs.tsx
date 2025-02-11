'use client'
import {useEffect} from 'react'
import Link from "next/link"
import { useBookingStore } from '@/hooks/use-add-booking'
import { useTabStore } from '@/hooks/use-tabs'
import { useTimeSlotStore } from "@/hooks/use-time-solts";
import SearchBar from "@/components/navbar/search-bar";
import { useRouter } from 'next/navigation'

// import { useParams } from 'next/navigation'
import { useLicenseStore } from '@/hooks/use-empoyee-list'


import { cn } from '@/lib/utils'

const Header = ({ cardData,slug }: any) => {
    const router = useRouter();

    const { formData , setpickupDrop } = useBookingStore()

    const { setActiveTab, activeTab } = useTabStore()
    const {  fetchLicenses } = useLicenseStore()
    const { fetchTimeSlot, timeSlots } = useTimeSlotStore();


    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };
    
    
  useEffect (()=>{
    setActiveTab(slug)
  }, [setActiveTab])

    const handleTabs = async(tab: any) => {

        if(tab=== "CHAUFFEUR"){
            setpickupDrop("BOTH")
          }

        //   if(tab === "CHAUFFEUR" || tab === "SERVICE" || tab === "RSA" || tab === "Upcoming-Booking"){
        //     try {
        //       await router.push(`/add-booking/${tab}`);
        //       // Wait for navigation to complete
        //       console.log('Navigation successful');
        //     } catch (error) {
        //       console.error('Navigation failed:', error);
        //     }
        //   }


        if(tab ===  "Inactive User") {
        
            fetchLicenses("INACTIVE")
        }

        if(tab ===  "User List") {

            fetchLicenses("")
        }

        formData.type = "PICKUP"
        formData.category = tab
        setActiveTab(tab)



        try {
            const currentDate = getCurrentDate();
            //@ts-expect-error null
            await fetchTimeSlot(currentDate, tab);
            // setIsSelectDate(currentDate);
    
          } catch (error) {
            console.error("Error fetching time slots:", error);
          } finally {
            // setIsLoading(false);
          }



    };


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

// function CarIcon(props: any) {
//     return (
//         <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <g clip-path="url(#clip0_1422_5308)">
//                 <path d="M15.3333 7.33301H0.666667C0.298477 7.33301 0 7.63149 0 7.99968C0 8.36787 0.298477 8.66635 0.666667 8.66635H15.3333C15.7015 8.66635 16 8.36787 16 7.99968C16 7.63149 15.7015 7.33301 15.3333 7.33301Z" fill="#211C1C" />
//                 <path d="M15.3333 2.66699H0.666667C0.298477 2.66699 0 2.96547 0 3.33366C0 3.70185 0.298477 4.00032 0.666667 4.00032H15.3333C15.7015 4.00032 16 3.70185 16 3.33366C16 2.96547 15.7015 2.66699 15.3333 2.66699Z" fill="#211C1C" />
//                 <path d="M12.8882 12H3.11046C2.865 12 2.66602 12.2985 2.66602 12.6667C2.66602 13.0349 2.865 13.3333 3.11046 13.3333H12.8882C13.1337 13.3333 13.3327 13.0349 13.3327 12.6667C13.3327 12.2985 13.1337 12 12.8882 12Z" fill="#211C1C" />
//             </g>
//             <defs>
//                 <clipPath id="clip0_1422_5308">
//                     <rect width="16" height="16" fill="white" />
//                 </clipPath>
//             </defs>
//         </svg>
//     )
// }


export default Header
