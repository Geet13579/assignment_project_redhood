import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils";

interface MonthPickerProps {
  selected?: Date;
  onSelect: (date: Date) => void;
}

const MonthPicker: React.FC<MonthPickerProps> = ({ selected, onSelect }) => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const [year, setYear] = useState(() => selected ? selected.getFullYear() : currentYear);

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];

  const handlePrevYear = () => setYear(prevYear => Math.max(prevYear - 1, currentYear));
  const handleNextYear = () => setYear(prevYear => prevYear + 1);

  const handleSelectMonth = (monthIndex: number) => {
    if (year === currentYear && monthIndex < currentMonth) return; 
    const newDate = new Date(year, monthIndex);
    onSelect(newDate);
  };

  const isDisabled = (monthIndex: number) => {
    return year === currentYear && monthIndex < currentMonth;
  };

  const isCurrentMonth = (monthIndex: number) => {
    return year === currentYear && monthIndex === currentMonth;
  };

  return (
    <div className="p-3 w-[300px] h-[270px]">
      <div className="flex justify-between items-center mb-4">
        <button
          className="h-7 w-7 flex items-center justify-center border rounded-[6px] border-[#f4f4f5] disabled:opacity-50"
          onClick={handlePrevYear}
          disabled={year <= currentYear}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <div className="mx-4 text-sm font-medium">
          {year}
        </div>
        <button
          className="h-7 w-7 flex items-center justify-center border rounded-[6px] border-[#f4f4f5]"
          onClick={handleNextYear}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {months.map((month, index) => (
          <button
            key={month}
            className={cn(
              "h-9 px-2 rounded-md text-sm",
              isCurrentMonth(index)
                ? "border border-borderColor rounded-[6px] text-black font-bold"
                : isDisabled(index)
                  ? "bg-gray-100 rounded-[6px] text-gray-400 cursor-not-allowed"
                  : selected && selected.getMonth() === index && selected.getFullYear() === year
                    ? "bg-[#fff0e6] rounded-[6px] text-black"
                    : "bg-white hover:bg-[#fff0e6] rounded-[6px]"
            )}
            onClick={() => handleSelectMonth(index)}
            disabled={isDisabled(index)}
          >
            {month.slice(0, 3)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MonthPicker;