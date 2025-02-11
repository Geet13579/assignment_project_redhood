import { useState, useEffect } from "react";
import { useBookingStore } from "@/hooks/use-add-booking";
import { useVehicleStore } from "@/hooks/use-vehicle-list";

const radioData = [
  {
    type: "Car Type",
    name: "car_type",
    TypeOptions: ["Automatic", "Manual"],
  },
  {
    type: "Fuel Type",
    name: "fuel_type",
    TypeOptions: ["Petrol", "Diesel", "CNG", "Electric"],
  },
];

function Select(profile: any) {
  const { formData, validationErrors, setValidationErrors } = useBookingStore();
  const { VehicleDetails, fetchVehicleDetails } = useVehicleStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const [carType, setCarType] = useState("Automatic");
  const [fuleType, setFuelType] = useState("Petrol");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // formData.vehicle[e.target.name] = e.target.value;

    const { name, value } = e.target;


    console.log('value', value)
    if (name == "car_type") {
      setCarType(value);
      formData.vehicle.car_type = carType;
      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['vehicle.car_type']; // Remove the error
        return newErrors;
      });
      
    } else if (name == "fuel_type") {
      setFuelType(value)
      formData.vehicle.fuel_type = fuleType;

      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['vehicle.fuel_type']; // Remove the error
        return newErrors;
      });
    } else if (name == "variant") {
      formData.vehicle.variant = value;
      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['vehicle.variant']; // Remove the error
        return newErrors;
      });

    } else if (name == "model_name") {
      formData.vehicle.model_name = value;
      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['vehicle.model_name']; // Remove the error
        return newErrors;
      });
    } else if (name == "car_number") {
      formData.vehicle.car_number = value;
      setValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['vehicle.car_number']; // Remove the error
        return newErrors;
      });
    } else if (name == "brand_name") {
      formData.vehicle.brand_name = value;
    }
  };


  const handleSelect = (data: any) => {
    formData.vehicle.car_number = data.car_number;
    formData.vehicle.car_number = data.car_number;
    formData.vehicle.variant = data.variant;
    formData.vehicle.fuel_type = data.fuel_type;
    formData.vehicle.car_type = data.car_type;
    formData.vehicle.model_name = data.model_name;
    formData.vehicle.id = parseInt(data.id);

    setFuelType(data.fuel_type)
    setCarType(data.car_type)
    fetchVehicleDetails(data.customer_id);

    setValidationErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors['vehicle.car_number'];
      delete newErrors['vehicle.variant'];
      delete newErrors['vehicle.fuel_type'];
      delete newErrors['vehicle.car_type'];
      delete newErrors['vehicle.model_name'];

      return newErrors;
    });

    // formData.customer_details[0].alt_mobile_number =selectedLicense.alt_mobile_number
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200); // Delay to allow click to register
  };

  // // console.log("fuleType", fuleType);

  formData.vehicle.fuel_type = fuleType;
  formData.vehicle.car_type = carType;

  return (
    <div className="mt-4 ">
      <div className="flex justify-between items-center px-[16px] mb-4 text-textLightColor">
        <div>
          <p className="text-[14px] text-[#211C1C] leading-[16px]">
            Vehicle Details
          </p>
        </div>
      </div>
      <div className=" ">
        <div className=" bg-white border-[1.5px] p-[16px] border-borderColor rounded-[6px] ">
          <div className=" grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-6 py-4">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                Number Plate ( Car Number ) *
              </label>
              <div className="relative w-full max-w-md">
                <input
                  className={`border-[1.5px] h-[38px]  text-[16px] placeholder:font-medium placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary

                                  ${validationErrors["vehicle.car_number"]
                      ? "border-red-500"
                      : ""
                    }`}
                  placeholder="Enter Car Number"
                  name="car_number"
                  defaultValue={formData.vehicle.car_number}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  
                  onFocus={() => setShowDropdown(true)}
                />
                {validationErrors["vehicle.car_number"] && (
                  <span className="error text-[12px] text-red-500 ">
                    ❗{validationErrors["vehicle.car_number"]}
                  </span>
                )}

                {showDropdown && VehicleDetails && VehicleDetails.length > 0 && (
                  <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {VehicleDetails.map((data, index) => (
                      <div
                        key={index}
                        onClick={() => handleSelect(data)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      >
                        {data.car_number}
                      </div>
                    ))}
                  </div>
                )}

                {showDropdown && VehicleDetails && VehicleDetails.length === 0 && (
                  <div className="absolute w-full mt-1 bg-white border rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    <div className="px-4 py-2 text-gray-500">No matching numbers found</div>
                  </div>
                )}

              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                Vehicle Brand Name *
              </label>
              <input
                className={`border-[1.5px] h-[38px]  text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease
                         focus:outline-none focus:border-primary hover:border-primary 
                       `}

                placeholder="Enter Vehicle Brand Name"
                name="brand_name"
                defaultValue={formData.vehicle.brand_name}
                onChange={handleChange}
                disabled
              />

            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                Vehicle Model Name *
              </label>
              <input
                className={`border-[1.5px] h-[38px]  text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease
                         focus:outline-none focus:border-primary hover:border-primary 
                         ${validationErrors["vehicle.model_name"] ? "border-red-500" : ""}`}
                placeholder="Enter Vehicle Model Name"
                name="model_name"
                defaultValue={formData.vehicle.model_name}
                onChange={handleChange}
              />
              {validationErrors["vehicle.model_name"] && (
                <span className="error text-[12px] text-red-500">
                  ❗{validationErrors["vehicle.model_name"]}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                Vehicle Variant *
              </label>
              <input
                className={`border-[1.5px] h-[38px]  text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease
                         focus:outline-none focus:border-primary hover:border-primary 
                         ${validationErrors["vehicle.variant"] ? "border-red-500" : ""}`}
                placeholder="Enter Variant Name"
                name="variant"
                defaultValue={formData.vehicle.variant}
                onChange={handleChange}
              />

              {validationErrors["vehicle.variant"] && (
                <span className="error text-[12px] text-red-500 ">❗{validationErrors["vehicle.variant"]}</span>
              )}
            </div>
          </div>

          <div className="grid 2xl:grid-cols-2  grid-cols-1 gap-2 mt-2">
            {radioData.map((data, index) => {
              return (
                <div className="flex flex-col gap-2" key={index}>
                  <h1 className="text-[14px] text-textLightColor font-medium">
                    {data.type}
                  </h1>

                  <ul
                    className={`grid gap-2 ${index == 0
                        ? "md:grid-cols-3 grid-cols-2 gap-6"
                        : "md:grid-cols-4 grid-cols-2 gap-2"
                      }  `}
                  >
                    {data.TypeOptions.map((option, optionIndex) => (
                      <li
                        key={optionIndex}
                        className="flex inline-flex h-9 w-max items-center justify-center rounded-[6px] mr-4 py-2 lg:text-[16px] text-[13px]"
                        onClick={() => () =>
                          data.name === "car_type"
                            ? setCarType(option)
                            : setFuelType(option)} // Add full area click handler
                      >
                        <label
                          htmlFor={option}
                          className={`
                          bg-white 
                          flex 
                          items-center 
                          border-[1.5px] 
                          ${carType === option || fuleType === option
                              ? "border-primary"
                              : "border-borderColor"
                            }
                          px-8 
                          py-2 
                          rounded-[6px] 
                          cursor-pointer 
                          relative  // Add relative positioning
                        `}
                        >
                          <input
                            type="radio"
                            className="
                            mr-2 
                            accent-[#5BD75B] 
                            appearance-none 
                            w-4 
                            h-4 
                            border-2 
                            border-[#908A8A] 
                            border-dashed 
                            rounded-full 
                            absolute 
                            left-4  // Position absolutely
                            top-1/2 
                            transform 
                            -translate-y-1/2
                          "
                            id={option}
                            name={option}
                            onChange={() =>
                              data.name === "car_type"
                                ? setCarType(option)
                                : setFuelType(option)
                            }
                            checked={
                              data.name === "car_type"
                                ? carType === option
                                : fuleType === option
                            }
                          />
                          <span className="pl-6">{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}


          </div>
        </div>
      </div>
    </div>
  );
}

export default Select;
