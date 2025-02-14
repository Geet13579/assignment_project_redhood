
import { useTabStore } from "@/hooks/use-tabs";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useState, useCallback } from "react";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";


function TablePage({ data, tableHeading, limit }: any) {
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleDeleteProduct = async (id: any) => {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`, { method: "DELETE", });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log('data', data)
      if (data.isDeleted) {
        alert("Successfully Deleted!")
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }

  return (
    <div>
      <Table>
        <TableHeader className="border-0 px-10">
          <TableRow className="border-0">


            {tableHeading.map((heading: any, index: any) => (
              <TableHead key={index} className="text-center">
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentItems.map((item: any, index: any) => (
            <TableRow key={index} className="hover:bg-[#FCF5F5]">

              <TableCell className="text-center">{item.id}</TableCell>
              <TableCell className="text-center">{item.brand}</TableCell>
              <TableCell className="text-center">{item.sku}</TableCell>
              <TableCell className="text-center">{item.weight}</TableCell>
              <TableCell className="text-center">{item.minimumOrderQuantity}</TableCell>
              <TableCell className="text-center">{item.category}</TableCell>
              <TableCell className="text-center">{item.availabilityStatus}</TableCell>

              <TableCell className="text-center flex gap-3 justify-center">
                <Link href={`product-details/${item.id}`} className={`w-[119px] py-[6px] px-5 border-[1.6px] border-borderColor rounded-[6px] text-xs font-semibold bg-[#D1E8FF] text-black text-center`}>
                  View Details
                </Link>
                <Link href={`update-product/${item.id}`} className={`w-[119px] py-[6px] px-5 border-[1.6px] border-borderColor rounded-[6px] text-xs font-semibold bg-[#D1E8FF] text-black text-center`}>
                  Edit
                </Link>
                <Button onClick={() => handleDeleteProduct(item.id)} className={`w-[119px] py-[6px] px-5 border-[1.6px] border-borderColor rounded-[6px] text-xs font-semibold bg-red-500 text-white text-center`}>
                  Delete
                </Button>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>


      <div className="flex items-center justify-between px-2">
        <div className="text-sm text-gray-500">
          Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>

  );
}

export default TablePage;
