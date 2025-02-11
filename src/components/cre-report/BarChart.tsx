"use client"

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"


const chartData = [
  { month: "Jan", pickup: 25, dropoff: 35, chauffeur: 45, rsa: 45, both: 60 },
  { month: "Feb", pickup: 48, dropoff: 42, chauffeur: 60, rsa: 35, both: 75 },
  { month: "Mar", pickup: 52, dropoff: 70, chauffeur: 55, rsa: 40, both: 65 },
  { month: "Apr", pickup: 58, dropoff: 80, chauffeur: 65, rsa: 45, both: 55 },
  { month: "May", pickup: 45, dropoff: 65, chauffeur: 85, rsa: 50, both: 45 },
  { month: "Jun", pickup: 65, dropoff: 75, chauffeur: 75, rsa: 35, both: 50 },
  { month: "July", pickup: 60, dropoff: 80, chauffeur: 65, rsa: 40, both: 55 },
  { month: "Aug", pickup: 70, dropoff: 55, chauffeur: 85, rsa: 45, both: 60 },
  { month: "Sep", pickup: 55, dropoff: 75, chauffeur: 80, rsa: 50, both: 75 },
  { month: "Oct", pickup: 75, dropoff: 85, chauffeur: 70, rsa: 55, both: 80 },
  { month: "Nov", pickup: 70, dropoff: 75, chauffeur: 65, rsa: 60, both: 65 },
  { month: "Dec", pickup: 75, dropoff: 90, chauffeur: 70, rsa: 65, both: 70 },
]
const chartConfig = {
  pickup: {
    label: "Pickup",
    color: "#D1E8FF",
  },
  dropoff: {
    label: "Dropoff",
    color: "#DFFFD6",
  },
} satisfies ChartConfig

export default function Component() {
  return (
    <>
    
    <div className="flex justify-between">
      <div className="flex gap-2">
        <p className="text-[11px] font-medium bg-[#F9F4F4] p-2 rounded-[6px] ">68.84%</p>
        <p className="text-[11px] font-medium py-2">+12,50,350 Increased</p>
      </div>

      <div className="flex gap-4">
        <div className="flex items-center gap-2">
          <p className="bg-[#D1E8FF] w-[15px] h-[15px] rounded-[2px]"></p>
          <p>Pick-up</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="bg-[#DFFFD6] w-[15px] h-[15px] rounded-[2px]"></p>
          <p>Drop-off</p>
        </div>

        <div className="flex items-center gap-2">
          <p className="bg-[#FFF6E6] w-[15px] h-[15px] rounded-[2px]"></p>
          <p>Chauffeur</p>
        </div>


        <div className="flex items-center gap-2">
          <p className="bg-[#EADE94] w-[15px] h-[15px] rounded-[2px]"></p>
          <p>RSA</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="bg-[#FFF8CC] w-[15px] h-[15px] rounded-[2px]"></p>
          <p>Both</p>
        </div>

      </div>
    </div>
        <ChartContainer config={chartConfig} className="[aspect-ratio:13/9]">
          <LineChart
           width={500}
           height={400}
           data={chartData}
           margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#CCBEBE"/>
          
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => value.slice(0, 3)}
            
            />
            <YAxis
            stroke="#686868"
            fontSize={14}
            tickLine={false}
            axisLine={false}
            tickCount={9}
            domain={[0, 200]}
            tickFormatter={(value) => value ==0 ? value : `${value}k`}
          />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
             <Line
              type="linear"
              dataKey="pickup"
              stroke="#D1E8FF"
              strokeWidth={4}
              dot={false}
              name="Pick-up"
            />
            <Line
              type="linear"
              dataKey="dropoff"
              stroke="#DFFFD6"
              strokeWidth={4}
              dot={false}
              name="Drop-off"
            />
            <Line
              type="linear"
              dataKey="chauffeur"
              stroke="#FFF6E6"
              strokeWidth={4}
              dot={false}
              name="Chauffeur"
            />
            <Line
              type="linear"
              dataKey="rsa"
              stroke="#EADE94"
              strokeWidth={4}
              dot={false}
              name="RSA"
            />
            <Line
              type="linear"
              dataKey="both"
              stroke="#FFF8CC"
              strokeWidth={4}
              dot={false}
              name="Both"
            />
          </LineChart>
        </ChartContainer>
     
    </>
  )
}

