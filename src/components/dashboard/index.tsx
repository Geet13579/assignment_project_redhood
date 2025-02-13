"use client";

import React, { useState } from "react";
import PageTitle from "./PageTitle";
import ProdustList from "./product-list";
import Link from "next/link";


export default function Home() {
  const [showDropdowCity, setShowDropdowCity] = useState(false);

  return (
    <div className="flex  flex-col mt-6  w-full ">
      <div className="flex justify-between items-center px-[16px] ">
      <PageTitle title="All Product"/>
      <Link href={`add-product`} className={`w-[119px] py-[6px] px-5 border-[1.6px] border-borderColor rounded-[6px] text-xs font-semibold bg-blue-500 text-white text-center`}>
                 Add Product 
                </Link>
      </div>
      <ProdustList/>

    </div>
  );
}
