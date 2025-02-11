import React from "react";
import { Ellipsis, CirclePlus } from "lucide-react";
import Checkout from './checkpout'

function PaymentGateway() {
  return (
    <>
      <div className="  gap-8 my-5 grid xl:grid-cols-2 grid-cols-1 ">
        <div>
<Checkout/>
        </div>
        
      <div className='my-4'>
        <div className='flex justify-between items-center px-[16px] mb-4 text-textLightColor'>
            <div>
                <p className='text-[14px] text-[#211C1C] leading-[16px]'>Add Details</p>
            </div>
        </div>
          <div className="bg-white p-5 border-[1.5px] border-borderColor mt-3">
            <div className="flex justify-between items-center ">
              <div className="text-[#686868] text-[16px] font-medium ">
                <span className="text-[16px] text-[#686868] ">
                Our Bank Details
                </span>
              </div>

              <Ellipsis className="border-[2px] text-borderColor border-borderColor w-[35px] h-[30px] rounded-[6px]" />
            </div>
            <p className="text-[12px] text-[#CCBEBE] pt-2 border-b-[1.5px] border-borderColor pb-3">
            You can Pay though Bank Trasfer
            </p>

            <div className="flex flex-col gap-10 justify-between mt-4 ">
              <div className="flex xl:gap-10 gap-8 justify-between">
                <div className="w-[40%]">
                  <span className="text-[14px] text-[#686868]">
                    Account Number
                  </span>
                </div>
                <div className="w-[50%] text-right">
                  <span className="text-[14px]  ">
                    9240 2004 9280 888
                  </span>
                </div>
              </div>

              <div className="flex gap-10 justify-between">
                <div className="w-[40%]">
                  <span className="text-[14px] text-[#686868]">
                    Account Name
                  </span>
                </div>
                <div className="w-[50%] text-right">
                  <span className="text-[14px] ">
                    ADN Wheel Serve Private Limited
                  </span>
                </div>
              </div>
              <div className="flex gap-10 justify-between">
                <div className="w-[40%]">
                  <span className="text-[14px] text-[#686868]">Bank Name</span>
                </div>
                <div className="w-[50%] text-right">
                  <span className="text-[14px]  ">
                    Axis Bank LTD
                  </span>
                </div>
              </div>

              <div className="flex gap-10 justify-between">
                <div className="w-[40%]">
                  <span className="text-[14px] text-[#686868]">
                    Branch Name
                  </span>
                </div>
                <div className="w-[50%] text-right">
                  <span className="text-[14px]  ">
                    Green Field Col far HR, FAridabad, 121001
                  </span>
                </div>
              </div>

              <div className="flex gap-10 justify-between">
                <div className="w-[40%]">
                  <span className="text-[14px] text-[#686868]">IFSC Code</span>
                </div>
                <div className="w-[50%] text-right">
                  <span className="text-[14px] ">
                    utib0002693
                  </span>
                </div>
              </div>

              <div className="flex gap-10 justify-between">
                <div className="w-[40%]">
                  <span className="text-[14px] text-[#686868]">Acc. Type</span>
                </div>
                <div className="w-[50%] text-right">
                  <span className="text-[14px] ">Current</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentGateway;
