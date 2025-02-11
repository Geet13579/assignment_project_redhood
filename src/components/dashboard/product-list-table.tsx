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
  name: string;
  mobile_number: string;
  email_id: string;
  designation: string;
  branch_name: string;
  employee_uid: string;
  password: string;
  code_id: string;
  status: string;
  updated_at: string;
  created_at: string;
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
            <TableHead className="w-[100px] border-0 text-center">
              <div className="inline-flex items-center">
                <label className="flex items-center cursor-pointer relative">
                  <input
                    type="checkbox"
                    className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-gray-400 checked:bg-[#5BD75B] checked:border-[#5BD75B]"
                    id="check"
                  />
                  <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth={1}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </label>
              </div>
            </TableHead>

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
              <TableCell className="font-medium text-center">
                <div className="inline-flex items-center">
                  <label className="flex items-center cursor-pointer relative">
                    <input
                      type="checkbox"
                      className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded border border-gray-400 checked:bg-[#5BD75B] checked:border-[#5BD75B]"
                      id={`check-${item.id}`}
                    />
                    <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        stroke="currentColor"
                        strokeWidth={1}
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </label>
                </div>
              </TableCell>
              <TableCell className="text-center">{item.id}</TableCell>
              <TableCell className="text-center">{item.name}</TableCell>
              <TableCell className="text-center">
                {item.mobile_number}
              </TableCell>
              <TableCell className="text-center">{item.email_id}</TableCell>
              <TableCell className="text-center">{item.designation}</TableCell>
              <TableCell className="text-center">{item.branch_name}</TableCell>
              <TableCell className="text-center">{item.employee_uid}</TableCell>
              <TableCell className="text-center">{item.password}</TableCell>

              <TableCell className="text-center">
                <button
                  className={`w-[119px] py-[6px] border-[1.6px] border-borderColor rounded-[6px] text-xs font-semibold ${getTaskColor(
                    item.status
                  )}`}
                  onClick={() => handleStatus(item.id, item.status)}
                  type="button"
                >
                  {item.status}
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