
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
  

  type TableProps = {
    licenses: any;   
    tableHeading: any; 
  };
function TablePage( { licenses, tableHeading }: TableProps) { 

  // console.log('licenses', licenses)
  // const [isChecked, setIsChecked] = useState(false)
  // const handleCheckbox = (e:any)=>{

  //   // console.log('e.target.checked', e.target.checked)

  //   if(e.target.checked){
  //     setIsChecked(true)
  //   }else{
  //     setIsChecked(false)

  //   }
  // }
  // const dataFormat = (dateValue: any) => {
  //   const date = new Date(dateValue);
  
  //   const formattedDate = new Intl.DateTimeFormat("en-GB", {
  //     day: "2-digit",
  //     month: "2-digit",
  //     year: "numeric",
  //   }).format(date);
  
  //   return formattedDate.replace(/\//g, "-");
  // };
  

  // // console.log('licenses', licenses)
  return (
    <div>
           <Table className="xl:w-[950px] w:[800px]">

<TableHeader className='border-0 px-10'>
  <TableRow className='border-0'>
    {/* <TableHead className=" border-0 text-center" >
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
    </TableHead> */}

    {tableHeading.map((data:any, index:any) => {
      return (

        <TableHead key={index} className="text-center">{data}</TableHead>


      )
    })}

  </TableRow>
</TableHeader>
<TableBody>

{licenses.action_history == null ?
  <TableRow>
    <TableCell colSpan={6} className="h-24 text-center">
      No data
    </TableCell>
  </TableRow>

  :

  licenses?.action_history.map((license:any, index:any) => (
    <TableRow key={index} className='hover:bg-[#FCF5F5]'>
      {/* <TableCell className="font-medium text-center">
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

      </TableCell> */}
      <TableCell className={`text-center w-[100px]`}>{license?.time.split(' ')[0]}</TableCell>
      <TableCell className={`text-center ${license?.task == "Cancelled" ? "text-[#CCBEBE]" : ''}`}>{license?.time.split(' ')[1]}</TableCell>
  
      <TableCell className={`text-center 2xl:w-[200px] w-[50px] ${license?.task == "Cancelled" ? "text-[#CCBEBE]" : ''}`}>{license?.action}</TableCell>
      <TableCell className={`text-center ${license?.task == "Cancelled" ? "text-[#CCBEBE]" : ''}`}>{license?.action_by}</TableCell>


    </TableRow>
  ))
    
    
    }


</TableBody>
</Table>
    </div>
  )
}

export default TablePage





  