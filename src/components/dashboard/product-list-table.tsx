import { useLicenseStore } from "@/hooks/use-empoyee-list";
import { useTabStore } from "@/hooks/use-tabs";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useState, useCallback } from "react";

import ConfirmPopup from "@/lib/confirm-popup";

interface Employee {
  id: string;
  brand: string;
  sku: string;
  weight: string;
  category: string;
  availabilityStatus: string;
  minimumOrderQuantity: string;
}

interface TableProps {
  data: Employee[];
  tableHeading: string[];
}

function TablePage({ data, tableHeading }: TableProps) {
  const { updateEmployee, fetchLicenses } = useLicenseStore();
  const { activeTab } = useTabStore();

  const [showConfirmPopup, setConfirmPopup] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<{ id: string; status: string } | null>(null);

  const handleStatus = async (id: string, status: string) => {
    setSelectedEmployee({ id, status });
    setConfirmPopup(true);
  };

  const handlePopupWarningClose = useCallback(() => {
    setConfirmPopup(false);
    setSelectedEmployee(null);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (selectedEmployee) {
      // Call updateEmployee with the stored ID and status
      await updateEmployee(selectedEmployee.id, selectedEmployee.status);
      
      // Refresh the list based on active tab
      if (activeTab === "Inactive User") {
        await fetchLicenses("INACTIVE");
      } else if (activeTab === "User List") {
        await fetchLicenses("");
      }
    }
    
    // Close popup and reset selection
    setConfirmPopup(false);
    setSelectedEmployee(null);
  }, [selectedEmployee, updateEmployee, fetchLicenses, activeTab]);

  return (
    <div>
      <Table>
        <TableHeader className="border-0 px-10">
          <TableRow className="border-0">
       

            {tableHeading.map((heading, index) => (
              <TableHead key={index} className="text-center">
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="hover:bg-[#FCF5F5]">
          
              <TableCell className="text-center">{item.id}</TableCell>
              <TableCell className="text-center">{item.brand}</TableCell>
              <TableCell className="text-center">{item.sku}</TableCell>
              <TableCell className="text-center">{item.weight}</TableCell>
              <TableCell className="text-center">{item.minimumOrderQuantity}</TableCell>
              <TableCell className="text-center">{item.category}</TableCell>
              <TableCell className="text-center">{item.availabilityStatus}</TableCell>
              
              <TableCell className="text-center">
                <button
                  className="w-[119px] py-[6px] border-[1.6px] bg-blue-200 border-borderColor rounded-[6px] text-xs font-semibold"
                  type="button"
                >
                  View Details
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showConfirmPopup && (
        <ConfirmPopup
          message="Are you sure you want to update status?"
          onClose={handlePopupWarningClose}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default TablePage;

const getTaskColor = (task: string) => {
  return task === "ACTIVE" ? "bg-[#DFFFD6] font-medium text-[#2EBB2E]" : "";
};