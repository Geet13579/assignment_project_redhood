import { useCallback, useMemo, useEffect } from 'react';
import { useBookingStore } from '@/hooks/use-add-booking';
import { LucideIcon } from "lucide-react";
import { UseProfileStore } from '@/hooks/get-profile-data';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

type OptionType = {
  name: string;
  id: string;
};

type CardProps = {
  label: string;
  active: boolean;
  icon: LucideIcon;
  value: string;
  designation: string;
  inputType: string;
  option: OptionType[];
};

type HeaderProps = {
  radioButtons: CardProps[];
  dropdown: CardProps[];
};

function Header({ radioButtons, dropdown }: HeaderProps) {
  const { 
    formData, 
    setpickupDrop, 
    validationErrors, 
    setValidationErrors 
  } = useBookingStore();

  const { 
    employee_name, 
    employee_id, 
    designation 
  } = UseProfileStore();

  useEffect(() => {
    dropdown.forEach(card => {
      if (card.designation === "Service Advicer" && card.option.length === 1) {
        const singleOption = card.option[0];
        formData.service_advicer_id = singleOption.id;
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.service_advicer_id;
          return newErrors;
        });
      }

      if (card.designation === "Customer Relation Executive" && card.option.length === 1) {
        const singleOption = card.option[0];
        formData.cre_id = singleOption.id;
        setValidationErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.cre_id;
          return newErrors;
        });
      }
    });
  }, [dropdown, formData, setValidationErrors]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      const fieldToUpdate = name === "Select Service Advicer*" ? "service_advicer_id" : "cre_id";
      delete newErrors[fieldToUpdate];
      return newErrors;
    });

    if (name === "Select Service Advicer*") {
      formData.service_advicer_id = value;
    } else {
      formData.cre_id = value;
    }
  }, [formData, setValidationErrors]);

  const RadioButtonsList = useMemo(() => (
    <ul className="border-0 flex md:justify-center justify-between items-center h-full">
      {radioButtons.map((card) => (
        <li 
          key={card.value}  
          className="flex inline-flex h-9 w-max items-center justify-center rounded-[6px] mr-4 py-2 lg:text-[16px] text-[13px]"
          onClick={() => setpickupDrop(card.value)}
        >
          <label
            htmlFor={card.value}
            className={`
              bg-white flex items-center border-[1.5px] 
              ${formData.type === card.value ? "border-primary" : "border-borderColor"}
              px-4 py-2 rounded-[6px] cursor-pointer relative
            `}
          >
            <input
              type="radio"
              className="mr-2 accent-[#5BD75B] appearance-none w-4 h-4 border-2 
                border-[#908A8A] border-dashed rounded-full absolute left-4 
                top-1/2 transform -translate-y-1/2"
              id={card.value}
              name="select"
              onChange={() => setpickupDrop(card.value)}
              checked={formData.type === card.value}
            />
            <span className="pl-6">{card.label}</span>
          </label>
        </li>
      ))}
    </ul>
  ), [radioButtons, formData.type, setpickupDrop]);

  const DropdownList = useMemo(() => (
    <TooltipProvider>
      <ul className="flex md:justify-center justify-between gap-4">
        {dropdown.map((card) => {
          const isSingleServiceAdvisor = card.designation === "Service Advicer" && card.option.length === 1;
          const isSingleCRE = card.designation === "Customer Relation Executive" && card.option.length === 1;
          
          return (
            <li key={card.label} className="rounded-[6px] ">
              <label htmlFor={card.label} className="sr-only">
                {card.label}
              </label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <select
                    name={card.label}
                    onChange={handleInputChange}
                    className={`
                      border-[1.5px] h-[38px] lg:text-[16px] text-[13px] cursor-pointer
                      placeholder:font-medium font-bold rounded-[6px] px-3 py-2 
                      transition duration-300 ease block w-full focus:outline-none 
                      focus:border-primary hover:border-primary
                      ${card.designation === designation ? "bg-[#fff0e6] font-block border-[1.6px] border-primary" : "border-borderColor"}
                      ${card.designation === "Service Advicer" && validationErrors["customer.email"] ? "border-red-500" : ""}
                      ${isSingleServiceAdvisor ? "bg-[#fff0e6] border-primary" : isSingleCRE ? "bg-[#fff0e6] border-primary" : ""}
                    `}
                    disabled={isSingleServiceAdvisor || isSingleCRE}
                  >
                    {card.designation === designation ? (
                      <option value={employee_id} selected>
                        {employee_name}
                      </option>
                    ) : isSingleServiceAdvisor ? (
                      <option className='font-bold' value={card.option[0].id} selected>
                        {card.option[0].name}
                      </option>
                    ) : isSingleCRE ? (
                      <option value={card.option[0].id} selected>
                        {card.option[0].name}
                      </option>
                    ) : (
                      <>
                        <option value="" disabled selected>
                          {card.label}
                        </option>
                        {card.option.length > 0 && card.option.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </>
                    )}
                  </select>
                </TooltipTrigger>
                <TooltipContent className="bg-black text-white p-2 shadow-xl rounded-[6px]">
                  <p>{card.designation}</p>
                </TooltipContent>
              </Tooltip>
              {(card.designation === "Service Advicer" ? 
                validationErrors["service_advicer_id"] : 
                validationErrors["cre_id"]) && (
                  <span className="error text-[12px] text-red-500">
                    ❗{card.designation === "Service Advicer" ? 
                      validationErrors["service_advicer_id"] : 
                      validationErrors["cre_id"]}
                  </span>
              )}
            </li>
          );
        })}
      </ul>
    </TooltipProvider>
  ), [dropdown, handleInputChange, designation, validationErrors, employee_id, employee_name]);

  return (
    <div className="w-full mt-[16px]">
      <header className="flex md:flex-row flex-col h-auto py-5 w-full shrink-0 items-center">
        <div className="flex md:flex-row flex-col w-full gap-5 justify-between">
          {RadioButtonsList}
          {DropdownList}
        </div>
      </header>
    </div>
  );
}

export default Header;