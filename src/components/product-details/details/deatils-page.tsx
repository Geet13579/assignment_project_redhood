import {useEffect} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTabStore } from "@/hooks/use-tabs";

function DeatilsPage({ product }: any) {
 
  const { setActiveTab, activeTab } = useTabStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveTab("Details");
    }
  }, [setActiveTab]);

  return (
    <div className=" mt-5 grid 2xl:grid-cols-2 grid-cols-1  gap-8">
      <div className="bg-white border-[1.5px] border-borderColor p-8 h-auto">
        <div className="h-[55px] flex justify-between  ">
          <div className="flex gap-2 items-center">
            <Avatar className="h-[100px] w-[100px]">
              <AvatarImage src="#" alt="Avatar" />
              <AvatarFallback className="bg-transparent ">
                <img
                  src={product.thumbnail}
                  className="h-full"
                />
              </AvatarFallback>
            </Avatar>
            <div className="grid grid-cols-1">
              {/* <div className="text-textColorLight text-[12px] font-medium leading-[16px]">
                Mr. Sunil Kumar Desai
                </div> */}
              <div className="text-[16px] font-medium">
              {product.title}
              </div>

              <div className="text-[#686868] text-[12px] font-medium leading-[16px]">
               {product.sku}
              </div>
              <div className="text-[#686868] text-[12px] font-medium leading-[16px]">
                {product.category}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              <button
                className={`border-[1.5px] border-borderColor px-[30px] py-[4px] rounded-[6px] text-[13px]`}
              >
              {product.brand}
              </button>
            </div>
          </div>
        </div>


        <div className="h-[55px] mt-[30px] flex justify-between ">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-textColorLight text-[12px] font-medium leading-[12px]">
              Warranty Information
              </div>
              <div className="text-[14px] font-medium text-[#686868]">
              {product.warrantyInformation}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-textColorLight text-[12px] font-medium leading-[12px]">
              Shipping Information
              </div>
              <div className="text-[14px] font-medium text-[#686868]">
             {product.shippingInformation}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-textColorLight text-[12px] font-medium leading-[16px]">
              Availability Status
              </div>
              <div className="text-[14px] font-medium text-[#686868]">
               {product.availabilityStatus}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-textColorLight text-[12px] font-medium leading-[16px]">
              Minimum Order Quantity
              </div>
              <div className="text-[14px] font-medium text-[#686868]">
             {product.minimumOrderQuantity}

              </div>
            </div>
          </div>
        </div>

        <div className="h-[55px] mt-[30px] grid grid-cols-3 justify-between ">
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-textColorLight text-[12px] font-medium leading-[12px]">
              Return Policy
              </div>
              <div className="text-[14px] font-medium text-[#686868]">
               {product.returnPolicy}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-textColorLight text-[12px] font-medium leading-[12px]">
              Tags
              </div>
              <div className="text-[14px] font-medium text-[#686868]">
                {product.tags.map((tag:any,index:any)=>{
                  return (
                    <span>{tag}, </span>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-textColorLight text-[12px] font-medium leading-[16px]">
                Vehicle at
              </div>
              <div className="text-[14px] font-medium text-[#686868]">
                Service center
              </div>
            </div>
          </div>

        </div>


        
        <div className="flex items-center gap-4">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-textColorLight text-[12px] font-medium leading-[16px]">
               Customer Address
              </div>
              <div className="text-[14px] font-medium text-[#686868]">
                 bvbv
              </div>
            </div>
          </div>
        
      </div>
    </div>
  );
}

export default DeatilsPage;
