// // "use client";
// // import { useEffect, useState } from "react";
// // import { UserNav } from "@/components/navbar/user-nav";
// // import { SheetMenu } from "@/components/navbar/sheet-menu";
// // import SearchBar from "@/components/navbar/search-bar";
// // import { useBookingStore } from "@/hooks/use-add-booking";
// // import { useRouter } from "next/navigation";

// // import { useProfileDetails } from "@/hooks/use-profile-store";


// // import { UseProfileStore } from "@/hooks/get-profile-data";
// // import {  Bell, TriangleAlert, CirclePlus } from "lucide-react";

// // export function Navbar() {
// //   const {  profileData, fetchProfileData } = useProfileDetails();
// //   const { setActiveProfile, setEmployee_id, setDesignation } = UseProfileStore();
// //   const  router = useRouter();
// //   const { formData } = useBookingStore();

// //   useEffect(() => {
// //     fetchProfileData()
// //     //@ts-expect-error null
// //     setActiveProfile(profileData?.name);
// //     //@ts-expect-error null

// //     setEmployee_id(profileData?.id);

// //     //@ts-expect-error null

// //     setDesignation(profileData?.designation);


// //     if (

// //     //@ts-expect-error null

// //       profileData?.designation != null &&

// //     //@ts-expect-error null

// //       profileData?.designation === "Customer Relation Executive"
// //     ) {

// //     //@ts-expect-error null

// //       formData.cre_id = profileData?.id;
// //     }

// //     if (

// //     //@ts-expect-error null

// //       profileData?.designation != null &&
// //     //@ts-expect-error null

// //       profileData?.designation === "Service Advicer"
// //     ) {

// //     //@ts-expect-error null

// //       formData.service_advicer_id = profileData?.id;
// //     }
// //     //@ts-expect-error null

// //     formData.vehicle.brand_name = profileData?.brand_name;

// //     if (!profileData) {
// //       throw new Error("No data received from server");
// //     }



// //   }, [fetchProfileData]);

// //   formData.vehicle.brand_name = profileData?.brand_name;

// //   return (
// //     <div className="flex justify-between   mt-marginTop">
// //       <SheetMenu />

// //       <div className="hidden md:inline">
// //         <SearchBar />
// //       </div>
// //       <div>
// //         <div
// //           className={`flex ml-auto gap-2  border-[1.5px]  text-[16px] font-medium rounded-common divide-x-[1.5px]
          

// //           ${
// //             //@ts-expect-error null
// //             parseInt(profileData?.amount) < 1500
// //               ? "border-[#FF0B0F] text-[#FF0B0F]"
// //               : "divide-[#EADADA] border-[#EADADA]"
// //           } `}
// //         >
// //           <div className="px-[9px] py-[5px] hidden md:inline">
// //             {" "}
// //             Wallet
// //             <span className="hidden xl:inline ml-2">Balance</span>
// //           </div>
// //           <div className="px-[9px] py-[5px] flex items-center gap-2">
// //             &#8377;{" "}
// //             {
// //               //@ts-expect-error null

// //               parseInt(profileData?.amount)
// //             }{" "}
// //             <CirclePlus
// //               className="w-4 h-4 cursor-pointer"
// //               onClick={() => {
// //                 router.push("/wallet-payment/payment-gateway")
// //               }}
// //             />
// //           </div>
// //         </div>

// //         {
// //           //@ts-expect-error null
// //           parseInt(profileData?.amount) < 1500 ? (
// //             <p className="text-[10px] text-[#FF0B0F] flex items-center gap-2 mt-2">
// //               {" "}
// //               <TriangleAlert className="h-4 w-4" />
// //               Attention: Balance under ₹1500. Recharge now!
// //             </p>
// //           ) : (
// //             ""
// //           )
// //         }
// //       </div>
// //       {/* <div className="hidden md:block">
// //         <div className="flex ml-auto gap-2  border-[1.5px] border-[#EADADA] text-[16px] font-medium rounded-common divide-x-[1.5px] divide-[#EADADA]">
// //           <div className="px-[9px] py-[5px] flex items-center ">
// //             Filter <Filter className="ml-2 w-[20px] h-[20px]" />
// //           </div>
// //         </div>
// //       </div> */}
// //       <div>
// //         <div className="flex ml-auto gap-2  border-[1.5px] border-[#EADADA] text-[16px] font-medium rounded-common divide-x-[1.5px] divide-[#EADADA]">
// //           <div className="px-[9px] py-1  flex items-center ">
// //             <span className="hidden md:flex">Notification </span>
// //             <div className="bg-black text-white flex items-center text-[12px] ml-5 p-1 rounded-[34px]">
// //               <Bell className=" w-[15px] h-[15px] " />
// //               <span className="pl-2">20</span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <UserNav
// //         isOpen
// //         //@ts-expect-error null

// //         Profile={profileData}
// //       />
// //     </div>
// //   );
// // }








// "use client";
// import { useEffect, useState } from "react";
// import { UserNav } from "@/components/navbar/user-nav";
// import { SheetMenu } from "@/components/navbar/sheet-menu";
// import SearchBar from "@/components/navbar/search-bar";
// import { UseProfileStore } from "@/hooks/get-profile-data";
// import { useBookingStore } from "@/hooks/use-add-booking";
// import { useRouter } from "next/navigation";



// import { Filter, Bell, TriangleAlert, CirclePlus } from "lucide-react";

// export function Navbar() {
//   const [Profile, setProfile] = useState(null);
//   const { formData } = useBookingStore();

//   const  router = useRouter();
  

//   const { setActiveProfile, setEmployee_id, setDesignation, setWallet, wallet } =
//     UseProfileStore();
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const parsedToken = token ? JSON.parse(token) : null;

//         if (!parsedToken?.token) {
//           throw new Error("No auth token found");
//         }

//         const response = await fetch(
//           `${process.env.NEXT_PUBLIC_API_URL}/get-profile`,
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${parsedToken.token}`,
//             },
//           }
//         );

//         const data = await response.json();

//         if (data.message === "Unauthorized.") {
//           // console.log("first");
//           window.location.href = "/";
//         }
//         // // console.log("data", data);
//         setProfile(data?.data);
//         setActiveProfile(data?.data.name);
//         setEmployee_id(data?.data.id);
//         setDesignation(data?.data.designation);
//         setWallet(data?.data.amount)

//         if (
//           data?.data.designation != null &&
//           data?.data.designation === "Customer Relation Executive"
//         ) {
//           formData.cre_id = data?.data.id;
//         }

//         if (
//           data?.data.designation != null &&
//           data?.data.designation === "Service Advicer"
//         ) {
//           formData.service_advicer_id = data?.data.id;
//         }

//         formData.vehicle.brand_name = data?.data?.brand_name;

//         if (!data.data) {
//           throw new Error("No data received from server");
//         }
//       } catch (error) {
//         console.error("Error fetching ongoing task:", error);
//         // Optionally, set an error state to handle UI feedback
//         // setError(error.message);
//       }
//     };

//     fetchProfile();
//   }, []);

//   return (
//     <div className="flex justify-between   mt-marginTop">
//       <SheetMenu />

//       <div className="hidden md:inline">
//         <SearchBar />
//       </div>
//       <div>
//         <div
//           className={`flex ml-auto gap-2  border-[1.5px]  text-[16px] font-medium rounded-common divide-x-[1.5px]
          

//           ${
           
//             wallet < 1500
//               ? "border-[#FF0B0F] text-[#FF0B0F]"
//               : "divide-[#EADADA] border-[#EADADA]"
//           } `}
//         >
//           <div className="px-[9px] py-[5px] hidden md:inline">
//             {" "}
//             Wallet
//             <span className="hidden xl:inline ml-2">Balance</span>
//           </div>
//           <div className="px-[9px] py-[5px] flex items-center gap-2">
//             &#8377;{" "}
//             {
           

//               wallet
//             }{" "}
//             <CirclePlus
//               className="w-4 h-4 cursor-pointer"
//               onClick={() => {
//                 router.push("/wallet-payment/payment-gateway")
//               }}
//             />
//           </div>
//         </div>

//         {
//           wallet < 1500 ? (
//             <p className="text-[10px] text-[#FF0B0F] flex items-center gap-2 mt-2">
//               {" "}
//               <TriangleAlert className="h-4 w-4" />
//               Attention: Balance under ₹1500. Recharge now!
//             </p>
//           ) : (
//             ""
//           )
//         }
//       </div>
//       {/* <div className="hidden md:block">
//         <div className="flex ml-auto gap-2  border-[1.5px] border-[#EADADA] text-[16px] font-medium rounded-common divide-x-[1.5px] divide-[#EADADA]">
//           <div className="px-[9px] py-[5px] flex items-center ">
//             Filter <Filter className="ml-2 w-[20px] h-[20px]" />
//           </div>
//         </div>
//       </div> */}
//       <div>
//         <div className="flex ml-auto gap-2  border-[1.5px] border-[#EADADA] text-[16px] font-medium rounded-common divide-x-[1.5px] divide-[#EADADA]">
//           <div className="px-[9px] py-1  flex items-center ">
//             <span className="hidden md:flex">Notification </span>
//             <div className="bg-black text-white flex items-center text-[12px] ml-5 p-1 rounded-[34px]">
//               <Bell className=" w-[15px] h-[15px] " />
//               <span className="pl-2">20</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <UserNav
//         isOpen
//         //@ts-expect-error null

//         Profile={Profile}
//       />
//     </div>
//   );
// }



// "use client";
// import { useEffect, useState } from "react";
// import { UserNav } from "@/components/navbar/user-nav";
// import { SheetMenu } from "@/components/navbar/sheet-menu";
// import SearchBar from "@/components/navbar/search-bar";
// import { useBookingStore } from "@/hooks/use-add-booking";
// import { useRouter } from "next/navigation";

// import { useProfileDetails } from "@/hooks/use-profile-store";


// import { UseProfileStore } from "@/hooks/get-profile-data";
// import {  Bell, TriangleAlert, CirclePlus } from "lucide-react";

// export function Navbar() {
//   const {  profileData, fetchProfileData } = useProfileDetails();
//   const { setActiveProfile, setEmployee_id, setDesignation } = UseProfileStore();
//   const  router = useRouter();
//   const { formData } = useBookingStore();

//   useEffect(() => {
//     fetchProfileData()
//     //@ts-expect-error null
//     setActiveProfile(profileData?.name);
//     //@ts-expect-error null

//     setEmployee_id(profileData?.id);

//     //@ts-expect-error null

//     setDesignation(profileData?.designation);


//     if (

//     //@ts-expect-error null

//       profileData?.designation != null &&

//     //@ts-expect-error null

//       profileData?.designation === "Customer Relation Executive"
//     ) {

//     //@ts-expect-error null

//       formData.cre_id = profileData?.id;
//     }

//     if (

//     //@ts-expect-error null

//       profileData?.designation != null &&
//     //@ts-expect-error null

//       profileData?.designation === "Service Advicer"
//     ) {

//     //@ts-expect-error null

//       formData.service_advicer_id = profileData?.id;
//     }
//     //@ts-expect-error null

//     formData.vehicle.brand_name = profileData?.brand_name;

//     if (!profileData) {
//       throw new Error("No data received from server");
//     }



//   }, [fetchProfileData]);

//   formData.vehicle.brand_name = profileData?.brand_name;

//   return (
//     <div className="flex justify-between   mt-marginTop">
//       <SheetMenu />

//       <div className="hidden md:inline">
//         <SearchBar />
//       </div>
//       <div>
//         <div
//           className={`flex ml-auto gap-2  border-[1.5px]  text-[16px] font-medium rounded-common divide-x-[1.5px]
          

//           ${
//             //@ts-expect-error null
//             parseInt(profileData?.amount) < 1500
//               ? "border-[#FF0B0F] text-[#FF0B0F]"
//               : "divide-[#EADADA] border-[#EADADA]"
//           } `}
//         >
//           <div className="px-[9px] py-[5px] hidden md:inline">
//             {" "}
//             Wallet
//             <span className="hidden xl:inline ml-2">Balance</span>
//           </div>
//           <div className="px-[9px] py-[5px] flex items-center gap-2">
//             &#8377;{" "}
//             {
//               //@ts-expect-error null

//               parseInt(profileData?.amount)
//             }{" "}
//             <CirclePlus
//               className="w-4 h-4 cursor-pointer"
//               onClick={() => {
//                 router.push("/wallet-payment/payment-gateway")
//               }}
//             />
//           </div>
//         </div>

//         {
//           //@ts-expect-error null
//           parseInt(profileData?.amount) < 1500 ? (
//             <p className="text-[10px] text-[#FF0B0F] flex items-center gap-2 mt-2">
//               {" "}
//               <TriangleAlert className="h-4 w-4" />
//               Attention: Balance under ₹1500. Recharge now!
//             </p>
//           ) : (
//             ""
//           )
//         }
//       </div>
//       {/* <div className="hidden md:block">
//         <div className="flex ml-auto gap-2  border-[1.5px] border-[#EADADA] text-[16px] font-medium rounded-common divide-x-[1.5px] divide-[#EADADA]">
//           <div className="px-[9px] py-[5px] flex items-center ">
//             Filter <Filter className="ml-2 w-[20px] h-[20px]" />
//           </div>
//         </div>
//       </div> */}
//       <div>
//         <div className="flex ml-auto gap-2  border-[1.5px] border-[#EADADA] text-[16px] font-medium rounded-common divide-x-[1.5px] divide-[#EADADA]">
//           <div className="px-[9px] py-1  flex items-center ">
//             <span className="hidden md:flex">Notification </span>
//             <div className="bg-black text-white flex items-center text-[12px] ml-5 p-1 rounded-[34px]">
//               <Bell className=" w-[15px] h-[15px] " />
//               <span className="pl-2">20</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       <UserNav
//         isOpen
//         //@ts-expect-error null

//         Profile={profileData}
//       />
//     </div>
//   );
// }








"use client";
import { useEffect, useState } from "react";
import { UserNav } from "@/components/navbar/user-nav";
import { SheetMenu } from "@/components/navbar/sheet-menu";
// import SearchBar from "@/components/navbar/search-bar";
import { UseProfileStore } from "@/hooks/get-profile-data";
import { useBookingStore } from "@/hooks/use-add-booking";
import { useRouter } from "next/navigation";



import { Filter, Bell, TriangleAlert, CirclePlus } from "lucide-react";

export function Navbar() {
  const [Profile, setProfile] = useState(null);
  const { formData , setCustomerDetails} = useBookingStore();

  const  router = useRouter();
  

  const { setActiveProfile, setEmployee_id, setDesignation, setWallet, wallet } =
    UseProfileStore();
  useEffect(() => {
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
          // console.log("first");
          window.location.href = "/";
        }
        // // console.log("data", data);
        setProfile(data?.data);
        setActiveProfile(data?.data.name);
        setEmployee_id(data?.data.id);
        setDesignation(data?.data.designation);
        setWallet(data?.data.amount)

        if (
          data?.data.designation != null &&
          data?.data.designation === "Customer Relation Executive"
        ) {
          formData.cre_id = data?.data.id;
        }

        if (
          data?.data.designation != null &&
          data?.data.designation === "Service Advicer"
        ) {
          formData.service_advicer_id = data?.data.id;
        }

        formData.vehicle.brand_name = data?.data?.brand_name;

        const state_response = await fetch(
          `https://apis.nexifyworld.com/api/commons/get-states`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const stateData = await state_response.json();




        stateData.data.map(async (state: any) => {
          
          if (state.id === data?.data?.state_id) {
            console.log('state.id', state)
            setCustomerDetails({ state: state.name })
          }})
       
        formData.customer.state_id = data?.data?.state_id;




        // console.log('formData', formData)
        if (!data.data) {
          throw new Error("No data received from server");
        }
      } catch (error) {
        console.error("Error fetching ongoing task:", error);
        // Optionally, set an error state to handle UI feedback
        // setError(error.message);
      }
    };

    fetchProfile();
  }, [setProfile, setActiveProfile]);

  return (
    <div className="flex justify-between   mt-marginTop">
      <SheetMenu />

      {/* <div className="hidden md:inline">
        <SearchBar />
      </div> */}
      <div className="grid grid-cols-2 gap-10">

      <div>
        <div
          className={`flex ml-auto gap-2  border-[1.5px]  text-[16px] font-medium rounded-common divide-x-[1.5px]
          

          ${
           
            wallet < 1500
              ? "border-[#FF0B0F] text-[#FF0B0F]"
              : "divide-[#EADADA] border-[#EADADA]"
          } `}
        >
          <div className="px-[9px] py-[5px] hidden md:inline">
            {" "}
            Wallet
            <span className="hidden xl:inline ml-2">Balance</span>
          </div>
          <div className="px-[9px] py-[5px] flex items-center gap-2">
            &#8377;{" "}
            {
           

              wallet
            }{" "}
            <CirclePlus
              className="w-4 h-4 cursor-pointer"
              onClick={() => {
                router.push("/wallet-payment/payment-gateway")
              }}
            />
          </div>
        </div>

        {
          wallet < 1500 ? (
            <p className="text-[10px] text-[#FF0B0F] flex items-center gap-2 mt-2">
              {" "}
              <TriangleAlert className="h-4 w-4" />
              Attention: Balance under ₹1500. Recharge now!
            </p>
          ) : (
            ""
          )
        }
      </div>
    
      <div>
        <div className=" ml-auto gap-2  border-[1.5px] border-[#EADADA] text-[16px] font-medium rounded-common divide-x-[1.5px] divide-[#EADADA]">
          <div className="px-[9px] py-1   flex justify-between items-center ">
            <span className="hidden md:flex">Notification </span>
            <div className="bg-black text-white flex items-center text-[12px] ml-5 p-1 rounded-[34px]">
              <Bell className=" w-[15px] h-[15px] " />
              <span className="pl-2">20</span>
            </div>
          </div>
        </div>
      </div>

      </div>


      <UserNav
        isOpen
        //@ts-expect-error null

        Profile={Profile}
      />
    </div>
  );
}
