import React from 'react'
import {
    Table,
    TableBody,
    // TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  

function ReviewDetails({product}:any) {
  return (
    <div className=" mt-5 grid grid-cols-1  gap-8">
      <div className="bg-white border-[1.5px] flex  gap-5 justify-around border-borderColor p-8 h-auto">

      <Table className="w-full">

<TableHeader className='border-0 px-10'>
  <TableRow className='border-0'>
   

        <TableHead  className="text-center">Name</TableHead>
        <TableHead  className="text-center">Email</TableHead>
        <TableHead  className="text-center">date</TableHead>
        <TableHead  className="text-center">rating</TableHead>
        <TableHead  className="text-center">comment</TableHead>



  </TableRow>
</TableHeader>
<TableBody>

{product.reviews.length == 0 ?
  <TableRow>
    <TableCell colSpan={6} className="h-24 text-center">
      No data
    </TableCell>
  </TableRow>

  :

  product?.reviews.map((review:any, index:any) => (
    <TableRow key={index} className='hover:bg-[#FCF5F5]'>

      <TableCell className={`text-center`}>{review?.reviewerName}</TableCell>
      <TableCell className={`text-center`}>{review?.reviewerEmail}</TableCell>
      <TableCell className={`text-center`}>{review?.date}</TableCell>
      <TableCell className={`text-center text-primary font-black`}>{review?.rating}</TableCell>
      <TableCell className={`text-center`}>{review?.comment}</TableCell>



    </TableRow>
  ))
    
    
    }


</TableBody>
</Table>
        </div>
        </div>
  )
}

export default ReviewDetails