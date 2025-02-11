"use client";
import React, { useState } from "react";
import PageTitle from "./PageTitle";
import  { CardContent } from "./card";
import { Ellipsis } from "lucide-react";
import BarChart from "./BarChart";
import WeeklyChart from "./weeklyChart";



export default function Home() {
  const [selectValue, setSelectValue] = useState("year");
  return (
    <div className="flex  flex-col mt-6  w-full ">
      <PageTitle title="Service Center Performance Overview" />

      {/* <section className="grid lg:grid-cols-2  mt-4 gap-4 transition-all 2xl:grid-cols-2"> */}
       
      <section className="grid 2xl:grid-cols-2 grid-cols-1  mt-4 gap-4 transition-all ">

        <section className="flex flex-col gap-5 ">
          <CardContent className="">
            <div className="flex justify-between items-center ">
              <div className="text-[16px] font-bold flex gap-2">
                <span>Booking Performance</span>
              </div>

              <div className="flex gap-6">
                <div className="rounded-[6px] ">
                  <select
                    name=""
                    onChange={(e) => setSelectValue(e.target.value)}
                    className="cursor-pointer border-[1.5px] h-[30px] text-[13px] placeholder:font-medium font-medium border-borderColor rounded-[6px] transition duration-300 ease block w-full focus:outdivne-none focus:border-primary hover:border-primary"
                  >
                    <option value="weekly" >
                      {" "}
                      Weekly{" "}
                    </option>
                    <option value="monthly" >Monthly</option>

                    <option value="year" selected>Year</option>
                  </select>
                </div>
                <Ellipsis className="border-[2px] text-borderColor border-borderColor w-[35px] h-[30px] rounded-[6px]" />
              </div>
            </div>
            {selectValue === "weekly" ? 
            
            <WeeklyChart />
          :
          <BarChart />

          }
          </CardContent>

        </section>

        <section className="grid grid-cols-1   gap-4 gap-x-8 transition-all md:grid-cols-2 lg:grid-cols-1">
          <div className="flex  flex-col gap-3 rounded-xl border-[1.5px] bg-white border-borderColor p-5 ">
            <section className="flex flex-col justify-between gap-2">
              <div className="flex justify-between items-center ">
                <div className="text-[#686868] text-[16px] font-medium">
                Report
                </div>

       
                <div className="flex gap-6">
                <div className="rounded-[6px] ">
                  <select
                    name=""
                    className="cursor-pointer border-[1.5px] h-[30px] text-[13px] placeholder:font-medium font-medium border-borderColor rounded-[6px] transition duration-300 ease block w-full focus:outdivne-none focus:border-primary hover:border-primary"
                  >
                    <option value="weekly" selected>
                      2024
                    </option>
                    <option value="monthly">Monthly</option>

                    <option value="year">Year</option>
                  </select>
                </div>
                <Ellipsis className="border-[2px] text-borderColor border-borderColor w-[35px] h-[30px] rounded-[6px]" />
              </div>
              </div>
              <h1 className="text-[#211C1C] text-[20px] font-black ">
                321 Car &apos;s
              </h1>
              <p className="text-[#CCBEBE] text-[12px]">
              Average Vehicles Service Done
              </p>
              <div className="flex items-center gap-2 text-[#686868] text-[11px]">
                <p className="bg-[#F9F4F4] text-center p-2">68.84%</p>
                <span className="inline-flex">+12,50,350 Increased</span>
              </div>
            </section>
          </div>

          <div className="flex w-full flex-col gap-3 rounded-xl border-[1.5px] bg-white border-borderColor p-5 ">
            <section className="flex flex-col justify-between gap-2">
              <div className="flex justify-between items-center ">
                <div className="text-[#686868] text-[16px] font-medium">
                Report
                </div>

               
                <div className="flex gap-6">
                <div className="rounded-[6px] ">
                  <select
                    name=""
                    className="cursor-pointer border-[1.5px] h-[30px] text-[13px] placeholder:font-medium font-medium border-borderColor rounded-[6px] transition duration-300 ease block w-full focus:outdivne-none focus:border-primary hover:border-primary"
                  >
                    <option value="weekly" selected>
                      2024
                    </option>
                    <option value="monthly">Monthly</option>

                    <option value="year">Year</option>
                  </select>
                </div>
                <Ellipsis className="border-[2px] text-borderColor border-borderColor w-[35px] h-[30px] rounded-[6px]" />
              </div>
              </div>
              <h1 className="text-[#211C1C] text-[20px] font-black ">
                321 Car &apos;s
              </h1>
              <p className="text-[#CCBEBE] text-[12px]">
              Average Vehicles Service Done
              </p>
              <div className="flex items-center gap-2 text-[#686868] text-[11px]">
                <p className="bg-[#F9F4F4] text-center p-2">68.84%</p>
                <span className="inline-flex">+12,50,350 Increased</span>
              </div>
            </section>
          </div>

          <div className="flex w-full flex-col gap-3 rounded-xl border-[1.5px] bg-white border-borderColor p-5 ">
            <section className="flex flex-col justify-between gap-2">
              <div className="flex justify-between items-center ">
                <div className="text-[#686868] text-[16px] font-medium">
                Report
                </div>

               
                <div className="flex gap-6">
                <div className="rounded-[6px] ">
                  <select
                    name=""
                    className="cursor-pointer border-[1.5px] h-[30px] text-[13px] placeholder:font-medium font-medium border-borderColor rounded-[6px] transition duration-300 ease block w-full focus:outdivne-none focus:border-primary hover:border-primary"
                  >
                    <option value="weekly" selected>
                      2024
                    </option>
                    <option value="monthly">Monthly</option>

                    <option value="year">Year</option>
                  </select>
                </div>
                <Ellipsis className="border-[2px] text-borderColor border-borderColor w-[35px] h-[30px] rounded-[6px]" />
              </div>
              </div>
              <h1 className="text-[#211C1C] text-[20px] font-black ">42</h1>
              <p className="text-[#CCBEBE] text-[12px]">
              Average Vehicles Service Done
              </p>
              <div className="flex items-center gap-2 text-[#686868] text-[11px]">
                <p className="bg-[#F9F4F4] text-center p-2">68.84%</p>
                <span className="inline-flex">+12,50,350 Increased</span>
              </div>
            </section>
          </div>

        </section>

        <section className="grid grid-cols-1   gap-4 gap-x-8 transition-all md:grid-cols-2 lg:grid-cols-1">

        <PageTitle title="CRE Report By Name" />
        <p className="text-[#CCBEBE] text-[12px] font-medium">Average CRE Performance as per booking</p>




</section>

        
      </section>

    
    </div>
  );
}
