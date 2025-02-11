
// import {useState} from 'react'
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  import Link from 'next/link'

  type TableProps = {
    licenses: any;   
    tableHeading: any; 
  };
function TablePage( { licenses, tableHeading }: TableProps) {

  // const [isChecked, setIsChecked] = useState(false)
  // const handleCheckbox = (e:any)=>{

  //   // console.log('e.target.checked', e.target.checked)

  //   if(e.target.checked){
  //     setIsChecked(true)
  //   }else{
  //     setIsChecked(false)

  //   }
  // }
  return (
    <div>
           <Table>

<TableHeader className='border-0 px-10'>
  <TableRow className='border-0'>
    <TableHead className="w-[100px] border-0 text-center" >
      <div className="inline-flex items-center">
        <label className="flex items-center cursor-pointer relative">
          <input type="checkbox" className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-gray-400 checked:bg-[#5BD75B] checked:border-[#5BD75B]" id="check" />
          <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth={1}>
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </span>
        </label>
      </div>
    </TableHead>

    {tableHeading.map((data:any, index:any) => {
      return (

        <TableHead key={index} className="text-center">{data}</TableHead>


      )
    })}

  </TableRow>
</TableHeader>
<TableBody>

  {licenses.map((license:any, index:any) => (
    <TableRow key={index} className='hover:bg-[#FCF5F5]'>
      <TableCell className="font-medium text-center">
        <div className="inline-flex items-center">
          <label className="flex items-center cursor-pointer relative">
            <input type="checkbox" className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded  border border-gray-400 checked:bg-[#5BD75B] checked:border-[#5BD75B]" id="check" />
            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth={1}>
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </span>
          </label>
        </div>

      </TableCell>
      <TableCell className={`text-center`}>{license?.licenseNo}</TableCell>
      <TableCell className={`text-center ${license?.task == "Cancelled" ? "text-[#CCBEBE]" : ''}`}>{license?.date}</TableCell>
      <TableCell className={`text-center ${license?.task == "Cancelled" ? "text-[#CCBEBE]" : ''}`}>{license?.customerName}</TableCell>
      <TableCell className={`text-center ${license?.task == "Cancelled" ? "text-[#CCBEBE]" : ''}`}>{license?.svcName}</TableCell>
      <TableCell className={`text-center ${license?.task == "Cancelled" ? "text-[#CCBEBE]" : ''}`}>{license?.paid}</TableCell>
      <TableCell className={`text-center ${license?.task == "Cancelled" ? "text-[#CCBEBE]" : ''}`}>{license?.amount}</TableCell>

      <TableCell className="text-center">

        <button className={`w-[119px] py-[6px] border-[1.6px] border-borderColor rounded-[6px] text-xs font-semibold
        ${getTaskColor(license?.task)}`}>
          {license?.task}
        </button>
      </TableCell>

      {/* <TableCell className={`text-center ${license?.task == "Cancelled" ? "hidden" : ''}`} ><button className="text-[#1E90FF] hover:underline">View Image</button></TableCell> */}
      <TableCell className={`text-center ${license?.task == "Cancelled" ? "hidden" : ''}`} ><Link className="text-[#1E90FF] hover:underline" href="/active-task-details">Details</Link></TableCell>



    </TableRow>
  ))}

</TableBody>
</Table>
    </div>
  )
}

export default TablePage





const getTaskColor = (task: any) => {
    switch (task.toLowerCase()) {
      case 'pick-up':
        return 'bg-[#D1E8FF] font-medium';
      case 'return to sc':
        return 'bg-[#F5F5F5] font-medium';
      case 'drop-off':
        return 'bg-[#DFFFD6] font-medium';
      case 'chauffeur':
        return 'bg-[#FFF6E6] font-medium';
      case 'cancelled':
        return 'bg-[#FF0B0F] text-white';
      case 'rsa':
        return 'bg-[#EADE94] text-red-800';
      case 'both':
        return 'bg-[#FFF8CC] text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  