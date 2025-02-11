import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

  
import { MoveUpRight, MoveDownLeft } from "lucide-react";
  
  type TableProps = {
    transaction_list: {
        transition_details: string;
        created_at: string;
        reason: string;
        type: string;
        queue_id: string;
        order_no: string;
        reference_no: string;
        status:string;
        task: string;
        ref_id: string;
        debit: string;
        credit: string;
        balance: string;
        amount: string;
        charge_amount: string;  
        charge_percentage: string
    }[];
    tableHeading: string[];
  };
  
  function TablePage({ transaction_list, tableHeading }: TableProps) {

  
    return (
      <div className="w-full">
        <Table className="caption-bottom text-sm">
          <TableHeader className="bg-[#FCF5F5]">
            <TableRow>
              <TableHead className="w-[50px] text-center ">
                
              </TableHead>
              {tableHeading.map((heading: string, index: number) => (
                <TableHead key={index} className="text-center font-regular">
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
  
          <TableBody>
            {transaction_list.map((data, index) => (
              <TableRow 
                key={index} 
                className={`hover:bg-[#FCF5F5] text-[#CCBEBE]`}
              >
                <TableCell className="text-center">

                  <div className="inline-flex items-center">
                    <label className="flex items-center cursor-pointer relative">
                      {data?.type === "CREDIT"? <MoveUpRight className="text-[#32CD32] font-black"/> : <MoveDownLeft className="text-red-600 font-black"/>}
           
                    </label>
                  </div>
                  
                </TableCell>
                <TableCell className="text-center">
               {
                    data?.reason === "RECHARGE"? "Money added to NPI Account" : data?.reason === "CANCEL"? 
                    " Money Deducted from NPI Account" :  "Money Deducted from NPI Account"

               }

                  <p className="text-[#908A8A] text-[10px] mt-1">{new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date(data?.created_at))}</p>
                </TableCell>
                <TableCell className="text-center">{data?.order_no}</TableCell>
                <TableCell className="text-center">{data?.reason}</TableCell>
                <TableCell className={`text-center ${data?.status === "SUCCESS"? "text-green-500" : "text-red-500"}`}>{data?.status}</TableCell>

                <TableCell className="text-center">{data?.reference_no}</TableCell>
                
                <TableCell className="text-center">{data?.type === "DEBIT"? <span className="text-red-500"> - &#8377; {data?.amount}</span> : "-----"} </TableCell>
                <TableCell className="text-center">{data?.type === "CREDIT"? <span className="text-green-500">+ &#8377; {data?.amount}</span> : "-----"}</TableCell>
                <TableCell className="text-center text-red-500">&#8377; {data?.charge_amount}</TableCell>
                <TableCell className="text-center text-red-500">{data?.charge_percentage}%</TableCell>

                <TableCell className="text-center flex justify-center"><span className="flex gap-2 border-[1.5px] border-primary  text-black px-5 py-2 rounded-[6px]">&#8377; {data.balance}</span></TableCell>


          
              </TableRow>
            ))}
  
      
          </TableBody>
        </Table>
        <div className="text-[15px] text-[#908A8A] mt-4 text-right">Note: “Alert: Wallet balance below ₹1500. Recharge to maintain services.”</div>

      </div>
    );
  }
  
  export default TablePage;