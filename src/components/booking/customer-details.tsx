import { useState, useEffect } from "react";
import { useBookingStore } from "@/hooks/use-add-booking";
import { useLicenseStore } from '@/hooks/use-customer-list';
import { useVehicleStore } from '@/hooks/use-vehicle-list';

import { useDropBookingStore } from "@/hooks/use-for-both-pikup-dropoff";

interface License {
  mobile_number: string;
  alt_mobile_number: string;
  customer_name: string;
  email: string;
}

interface CustomerData {
  mobile_number: string;
  alt_mobile_number: string;
  customer_name: string;
  email: string;
}

function Select() {
  const { formData, validationErrors, setCustomerDetails, setVehicleDetails ,setValidationErrors} = useBookingStore();
  const { dropFormData, setPickupDetails, setDropoffDetails } = useDropBookingStore();

  const { fetchVehicleDetails } = useVehicleStore();
  const { licenses, fetchLicenses } = useLicenseStore();

  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredNumbers, setFilteredNumbers] = useState<License[]>(licenses);
  const [isAutofilled, setIsAutofilled] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchLicenses("");
  }, [fetchLicenses]);

  useEffect(() => {
    // Update filtered numbers whenever licenses change or input value changes
    if (inputValue) {
      const filtered = licenses.filter(data => data.mobile_number.includes(inputValue));
      setFilteredNumbers(filtered);
      setShowDropdown(filtered.length > 0);
    } else {
      setFilteredNumbers([]);
      setShowDropdown(false);
    }
  }, [inputValue, licenses]);

  const validateField = (name: string, value: string) => {
    let error = "";
    if (name === "customer_name" && value.trim() === "") {
      error = "Customer name is required.";
    }
    if (name === "email" && value.trim() !== "") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        error = "Invalid email format.";
      }
    }
    if (name === "mobile_number" && value !=="") {
      
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(value)) {
        error = "Mobile number must be 10 digits.";
      }
     
    }

    if ( name === "alt_mobile_number" && value !=="") {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(value)) {
        error = "Mobile number must be 10 digits.";
      }
    }
    return error;
  };

  const resetAllFields = () => {
    // Reset customer details
    setCustomerDetails({
      customer_name: "",
      alt_mobile_number: "",
      email: "",
      id: null,
      full_address: "",
      city_id: "",
      area: "",
      pincode: "",
      landmark: "",
      street: "",
      location: { lat: 0, lng: 0 },
      flat: "",
      city: "",
      isAutofilled: false
    });

    // Reset pickup details
    setPickupDetails({
      customer_name: "",
      alt_mobile_number: "",
      email: "",
      id: null,
      full_address: "",
      city_id: "",
      area: "",
      pincode: "",
      landmark: "",
      street: "",
      location: { lat: 0, lng: 0 },
      flat: "",
      city: "",
    });

    // Reset dropoff details
    setDropoffDetails({
      customer_name: "",
      alt_mobile_number: "",
      email: "",
      id: null,
      full_address: "",
      city_id: "",
      area: "",
      pincode: "",
      landmark: "",
      street: "",
      location: { lat: 0, lng: 0 },
      flat: "",
      city: "",
      autofilled: false
    });

    // Reset vehicle details
    setVehicleDetails({
      car_number: "",
      variant: "",
      fuel_type: "",
      car_type: "",
      model_name: "",
      id: null
    });

    // Reset form validation errors
    Object.keys(validationErrors).forEach(key => {
      validationErrors[key] = "";
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

 setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['customer.mobile_number']; // Remove the error
        return newErrors;
      });

      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['customer.customer_name']; // Remove the error
        return newErrors;
      });
    if (name === "mobile_number") {
      if(/^\d{10}$/.test(value)){
        const filtered = licenses.filter(data => data.mobile_number.includes(value));
        if(filtered.length != 0){
          handleBlur()
          setCustomerDetails({...formData.customer, id: filtered[0].id, customer_name: filtered[0].customer_name, alt_mobile_number: filtered[0].alt_mobile_number, email: filtered[0].email})

          fetchVehicleDetails(filtered[0].id)

        }
      }else{
        fetchVehicleDetails("")
        // handleBlur()
        resetAllFields();
      }
      setInputValue(value);
      setIsAutofilled(false);
      if (value === "") {
      resetAllFields();
      } else {
        setShowDropdown(true);
      
      }
    }

    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));

    // Update form data
    if (name === "customer_name"){ 
      formData.customer.customer_name = value
      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['customer.customer_name']; // Remove the error
        return newErrors;
      });
    };
    if(name === "alt_mobile_number"){ formData.customer.alt_mobile_number = value;}
    if (name === "email") {formData.customer.email = value};
    if (name === "mobile_number"){ formData.customer.mobile_number = value

      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['customer.mobile_number']; // Remove the error
        return newErrors;
      });
    };



  };

  const handleSelectNumber = async (data: any) => {
    const error = validateField("mobile_number", data.mobile_number);
    setErrors(prev => ({ ...prev, mobile_number: error }));
    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors['customer.mobile_number']; // Remove the error
      return newErrors;
    });   setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors['customer.customer_name']; // Remove the error
      return newErrors;
    });
    
    // Then set new state
    setIsAutofilled(true);
    setInputValue(data.mobile_number);
    
 

    // Set form data
    const updatedCustomer = {
      alt_mobile_number: data.alt_mobile_number,
      mobile_number: data.mobile_number,
      email: data.email,
      id: data.id,
      customer_name: data.customer_name,
      city_id: "",
      area: "",
      pincode: "",
      landmark: "",
      street: "",
      location: { lat: 0, lng: 0 },
      flat: "",
      city: "",
      autofilled: false
    };
    
    setDropoffDetails({  updatedCustomer })

    setPickupDetails({ updatedCustomer })

    setCustomerDetails(updatedCustomer);
    // Reset vehicle data
    formData.vehicle = {
      ...formData.vehicle,
      car_number: "",
      variant: "",
      fuel_type: "",
      car_type: "",
      model_name: "",
    };
 
    // Fetch and set state/city data
    try {
      const response = await fetch(
        "https://apis.nexifyworld.com/api/commons/get-states",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );
      const stateData = await response.json();

      const state = stateData.data.find((state: any) => state.id === data.state_id);
      if (state) {
        setCustomerDetails({ state: state.name,state_id: state.id });

        setDropoffDetails({ state: state.name,state_id: state.id });
        setPickupDetails({ state: state.name,state_id: state.id });


        const cityResponse = await fetch(
          "https://apis.nexifyworld.com/api/commons/get-cities",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ state_id: state.id }),
          }
        );
        const cityData = await cityResponse.json();

        const city = cityData.data.find((city: any) => city.id === data.city_id);
        if (city) {
          // setCustomerDetails({ city: city.name });
          // setPickupDetails({ city: city.name })
        }
      }
    } catch (error) {
    }

    // Set customer details
    // setCustomerDetails({
    //   ...data,
    //   location: { lat: JSON.parse(data.location).lat, lng: JSON.parse(data.location).lng },
    // });

    // setPickupDetails({
    //   ...data,
    //   location: { lat: JSON.parse(data.location).lat, lng: JSON.parse(data.location).lng },
    // })
    // setDropoffDetails({
    //   ...data,
    //   location: { lat: JSON.parse(data.location).lat, lng: JSON.parse(data.location).lng },
    // })

    setTimeout(() => setShowDropdown(false), 100);
    
    fetchVehicleDetails(data.id);
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };


  return (
    <div className="mt-4">
      <div className="flex justify-between items-center px-[16px] mb-4 text-textLightColor">
        <p className="text-[14px] text-[#211C1C] leading-[16px]">Customer Details</p>
      </div>
      <div className="bg-white border-[1.5px] p-[16px] border-borderColor rounded-[6px]">
        <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6">
          {/* Mobile Number */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-textLightColor font-medium">
              Mobile Number *
            </label>
            <div className="relative w-full max-w-md">
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowDropdown(true)}
                onBlur={handleBlur}
                name="mobile_number"
                autoComplete="new-item"
                className={`${
                  validationErrors['customer.mobile_number'] ? 'border-red-500' : ''
                } border-[1.5px] h-[38px] pl-12 text-[16px] placeholder:font-medium placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary`}
                placeholder="Enter Mobile Number"
              />
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.6 pl-1 pointer-events-none text-[16px] text-[#686868]">
                +91 |
              </div>
              {showDropdown && filteredNumbers.length > 0 && (
                <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                  {filteredNumbers.map((data, index) => (
                    <div
                      key={index}
                      onClick={() => handleSelectNumber(data)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {data.customer_name} - {data.mobile_number}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {validationErrors["customer.mobile_number"] ? (
              <span className="error text-[12px] text-red-500">
                ❗{validationErrors["customer.mobile_number"]}
              </span>
            ) : (
              errors.mobile_number && (
                <span className="error text-[12px] text-red-500">
                  ❗{errors.mobile_number}
                </span>
              )
            )}
          </div>

          {/* Alternate Mobile Number */}
          <div className="flex flex-col gap-2">
            <label className="md:text-[14px] text-textLightColor font-medium">
              Alternate Mobile Number *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.6 pl-1 pointer-events-none text-[16px] text-[#686868]">
                +91 |
              </div>
              <input
                name="alt_mobile_number"
                type="number"
                 autoComplete="new-item"
                value={formData.customer.alt_mobile_number}
                onChange={handleInputChange}
                className={`${
                  validationErrors['customer.alt_mobile_number'] ? 'border-red-500' : ''
                } border-[1.5px] h-[38px] pl-12 text-[16px] placeholder:font-medium placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary`}
                placeholder="Enter Alt Mobile Number"
                disabled={isAutofilled}
              />
            </div>
            {validationErrors["customer.alt_mobile_number"] ? (
              <span className="error text-[12px] text-red-500">
                ❗{validationErrors["customer.alt_mobile_number"]}
              </span>
            ) : (
              errors.alt_mobile_number && (
                <span className="error text-[12px] text-red-500">
                  ❗{errors.alt_mobile_number}
                </span>
              )
            )}
          </div>

          {/* Customer Full Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-textLightColor font-medium">
              Customer Full Name *
            </label>
            <input
              name="customer_name"
               autoComplete="new-item"
              value={formData.customer.customer_name}
              onChange={handleInputChange}
              className={`border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary ${
                validationErrors["customer.customer_name"] ? "border-red-500" : ""
              }`}
              placeholder="Enter Full Name"
              disabled={isAutofilled}
            />
            {validationErrors["customer.customer_name"] && (
              <span className="error text-[12px] text-red-500">
                ❗{validationErrors["customer.customer_name"]}
              </span>
            )}
          </div>

          {/* Email ID */}
          <div className="flex flex-col gap-2">
            <label className="text-[14px] text-textLightColor font-medium">
              Email ID
            </label>
            <input
            type="text"
              name="email"
               autoComplete="new-item"
              value={formData.customer.email}
              onChange={handleInputChange}
              className={`border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary ${
                validationErrors["customer.email"] ? "border-red-500" : ""
              }`}
              placeholder="Enter Email Id"
              disabled={isAutofilled}
            />
            {validationErrors["customer.email"] && (
              <span className="error text-[12px] text-red-500">
                ❗{validationErrors["customer.email"]}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Select;