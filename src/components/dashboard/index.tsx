"use client";

import React, { useState } from "react";
import PageTitle from "./PageTitle";
import ProdustList from "./product-list";

export default function Home({ analytics }: any) {
  const [showDropdowCity, setShowDropdowCity] = useState(false);

  return (
    <div className="flex  flex-col mt-6  w-full ">
      <div className="flex justify-between items-center px-[16px] ">
      <PageTitle title="All Product"/>
      </div>
      <ProdustList/>

    </div>
  );
}
