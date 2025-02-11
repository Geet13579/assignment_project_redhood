import { useDropBookingStore } from "@/hooks/use-for-both-pikup-dropoff";
import { useState, useCallback, useEffect } from "react";
import { useBookingStore } from "@/hooks/use-add-booking";
import debounce from 'lodash/debounce';
import { useLicenseStore } from '@/hooks/use-customer-list';


interface License {
  mobile_number: string;
  alt_mobile_number: string;
  customer_name: string;
  email: string;
}

function AddressForm({userProfile}:{userProfile:any}) {
  const { formData, setCustomerDetails } = useBookingStore();
  const { dropFormData, bothvalidationErrors, setPickupDetails, setDropoffDetails,setbothValidationErrors } = useDropBookingStore();
  const [formFields, setFormFields] = useState({
    full_address: "",
    flat: "",
    street: "",
    area: "",
    landmark: "",
    pincode: "",
  });
  const [inputValue, setInputValue] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { licenses, fetchLicenses } = useLicenseStore();

  const [error, setErrors] = useState("");
  // state
  const [inputValueState, setInputValueState] = useState("");
  const [predictionsState, setPredictionsState] = useState([]);

  const [addressChecked, setAddressChecked] = useState(false);


  // console.log('userProfile', userProfile)
  // City

  const [inputValueCity, setInputValueCity] = useState("");
  const [predictionsCity, setPredictionsCity] = useState([]);

  const debouncedSearchState = useCallback(
    debounce(async () => {

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://apis.nexifyworld.com/api/commons/get-states`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const data = await response.json();
        const filteredData = data.data.filter((item: any) => item.id === formData?.customer?.state_id);
        // console.log('filteredData', filteredData[0].name)
        setInputValueState(filteredData[0].name)
        setDropoffDetails({state:filteredData[0].name, state_id:filteredData[0].id})
        setPickupDetails({state:filteredData[0].name})
        debouncedSearchCities(filteredData[0].id);

        setPredictionsState(data.data || []);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setPredictionsState([]);
      } finally {
        setIsLoading(false);
      }
    }, 500), // 500ms delay
    []
  );

  useEffect(() => {
    setInputValue("");
    setInputValueState("");
    setInputValueCity("");
    if (!formData?.customer?.isAutofilled) {
      setPickupDetails({
        full_address: "",
        city_id: "",
        area: "",
        pincode: "",
        landmark: "",
        street: "",
        location: { lat: 0, lng: 0 },
        flat: "",
        city: "",
      })
    }

  }, [setPickupDetails])


  useEffect(() => {
    fetchLicenses("");
  }, [fetchLicenses]);

  useEffect(() => {

    debouncedSearchState();
  }, [debouncedSearchState]); // Added fetchBooking to the dependency array


  // Debounced API call for cities
  const debouncedSearchCities = useCallback(
    debounce(async (stateID) => {

      // // console.log('stateID', stateID)
      try {
        const response = await fetch(
          `https://apis.nexifyworld.com/api/commons/get-cities`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ state_id: stateID }),
          }
        );

        const data = await response.json();

        setPredictionsCity(data.data || []);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setPredictionsCity([]);
      } finally {
        setIsLoading(false);
      }
    }, 200), // 500ms delay
    []
  );





  const handleSearchLocation = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setInputValue(value);

    dropFormData.pick_up.full_address = value

    if (!value.trim()) {
      setPredictions([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places:autocomplete`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
          },
          body: JSON.stringify({ input: value }),
        }
      );

      const data = await response.json();

      // // console.log("data.suggestions", data.suggestions);
      setPredictions(data.suggestions || []);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setPredictions([]);
    } finally {
      setIsLoading(false);
    }

  };

  const handleSelectLocation = async (prediction: any) => {
    setInputValue(prediction.text.text);
    setShowDropdown(false);

    bothvalidationErrors["pick_up.full_address"] = "";

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${prediction.placeId}`,
        {
          method: "GET",
          //@ts-expect-error null
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
            "X-Goog-FieldMask": "*",
          },
        }
      );

      const data = await response.json();

      // // console.log('data', data)

      dropFormData.pick_up.full_address = prediction.text.text;

      dropFormData.pick_up.location.lat = data.location.latitude;
      dropFormData.pick_up.location.lng = data.location.longitude;
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  // for state




  const handleCityInput = (event: any) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const cityId = selectedOption.getAttribute('name');
    const stateName = event.target.value;
    setInputValueCity((prevState) => stateName);
    dropFormData.pick_up.city_id = cityId;
    bothvalidationErrors["pick_up.city"] = "";
    

  }

  const handleAddressCheckbox = async (e: any) => {

    setAddressChecked(e.target.checked);

    setCustomerDetails({isAutofilled:e.target.checked})
    if (e.target.checked == false) {
      setInputValue("");
      setInputValueState("");
      setInputValueCity("");

      setPickupDetails({
        full_address: "",
        city_id: "",
       
        area: "",
        pincode: "",
        landmark: "",
        street: "",
        flat: "",
        city: "",
       
        location: { lat: 0, lng: 0 }
      });
      setErrors("");



      setFormFields({
        full_address: "",
        flat: "",
        street: "",
        area: "",
        landmark: "",
        pincode: "",
      });
    }
    else {
      setDropoffDetails({
        full_address: "",
        city_id: "", 
        area: "",
        pincode: "",
        landmark: "",
        street: "",
        location: { lat: 0, lng: 0 },
        flat: "",
        city: "",
      })

      if (formData.customer.id == null) {
        setAddressChecked(false)
        
    setCustomerDetails({isAutofilled:false})

        setErrors("NO have existing customer please Enter Manually")

      }

      //@ts-expect-error null
      const customerLicense = licenses.find(data => data.id === formData.customer.id);
      

      if (customerLicense) {
        const updatedPickupDetails = {
          //@ts-expect-error null

          full_address: customerLicense.full_address,
          //@ts-expect-error null

          city_id: customerLicense.city_id,
          //@ts-expect-error null

          state_id: customerLicense.state_id,
          //@ts-expect-error null

          area: customerLicense.area,
          //@ts-expect-error null

          pincode: customerLicense.pincode,
          //@ts-expect-error null

          landmark: customerLicense.landmark,
          //@ts-expect-error null

          street: customerLicense.street,
          //@ts-expect-error null

          flat: customerLicense.flat,
          //@ts-expect-error null
          location: { lat: JSON.parse(customerLicense.location).lat, lng: JSON.parse(customerLicense.location).lat },
        };

      

        setPickupDetails(updatedPickupDetails);
        setDropoffDetails({state_id: updatedPickupDetails.state_id})



        
        const response = await fetch(
          `https://apis.nexifyworld.com/api/commons/get-states`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const stateData = await response.json();




        stateData.data.map(async (state: any) => {
          //@ts-expect-error null

          if (state.id === customerLicense.state_id) {
            console.log('state.id', state)
            setPickupDetails({ state: state.name })

            const cityResponse = await fetch(
              `https://apis.nexifyworld.com/api/commons/get-cities`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ state_id: state.id }),
              }
            );


            const cityData = await cityResponse.json();

            console.log('cityData', cityData)

            cityData.data.map(async (city: any) => {
              //@ts-expect-error null
              if (city.id === customerLicense.city_id) {
                console.log('city.id', city)
                setPickupDetails({ city: city.name })

              }
            })

          }
        })
        // Also update local form fields
        setFormFields({
          //@ts-expect-error null

          full_address: customerLicense.full_address,
          //@ts-expect-error null

          flat: customerLicense.flat,
          //@ts-expect-error null

          street: customerLicense.street,
          //@ts-expect-error null

          area: customerLicense.area,
          //@ts-expect-error null

          landmark: customerLicense.landmark,
          //@ts-expect-error null

          pincode: customerLicense.pincode,
        });
      }

      setbothValidationErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors['pick_up.full_address'];
        delete newErrors['pick_up.city_id'];
        delete newErrors['pick_up.area'];
        delete newErrors['pick_up.pincode'];
        delete newErrors['pick_up.landmark'];
        delete newErrors['pick_up.street'];
        delete newErrors['pick_up.flat'];
        delete newErrors['pick_up.location'];
        delete newErrors['pick_up.city'];


  
        return newErrors;
      });

    }
  }


  return (
    <div className="mt-4">
      <div className="flex justify-between items-center px-4 mb-4 text-textLightColor">
        <div className="flex gap-5 items-center">
          <p className="text-sm text-[#211C1C] leading-4">Pick-up Address</p>
          <div className="flex gap-2">
            <input
             autoComplete="new-item"
              type="checkbox"
              checked={formData?.customer?.isAutofilled}
              onChange={handleAddressCheckbox}
            />
            <p>
              Existing address can be used

              {error === "" ? "" : (
                <span className="text-red-500 text-[15px]">&#40;{error}&#41;</span>
              )}
            </p>

          </div>
        </div>
      </div>
      <div className="">
        <div className="bg-white border-[1.5px] p-4 border-borderColor rounded-lg">
          <div className="grid gap-3">
            <div className="flex flex-col gap-2">
              <label className="text-[14px] text-textLightColor font-medium">
                Enter Locality *
              </label>
              <div className="relative w-full w-full">
                <input
                 autoComplete="new-item"
                  type="text"

                  value={formData.customer.isAutofilled ? dropFormData.pick_up.full_address : inputValue}
                  onChange={handleSearchLocation}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={handleBlur}
                  name="Enter Location"
                  className={`border-[1.5px] h-[38px]  text-[16px] placeholder:font-medium placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary
              ${bothvalidationErrors["pick_up.full_address"] ? "border-red-500" : ""}`}
                  readOnly={formData.customer.isAutofilled ? true : false}

                  placeholder="Enter Location"
                />

                {showDropdown && (
                  <div className="absolute w-full mt-1 bg-white border shadow-lg max-h-60 overflow-y-auto z-10">
                    {isLoading ? (
                      <div className="px-4 py-2 text-gray-500">Loading...</div>
                    ) : predictions.length > 0 ? (
                      predictions.map((prediction, index) => (
                        <div
                          //@ts-expect-error null
                          key={`${prediction.placePrediction.placeId}`}

                          onClick={() =>
                            //@ts-expect-error null
                            handleSelectLocation(prediction.placePrediction)
                          }
                          className="px-4 py-2 hover:bg-[#fff0e6] cursor-pointer"
                        >
                          <div className="font-medium">
                            {
                              //@ts-expect-error null
                              prediction.placePrediction.text.text
                            }
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No locations found
                      </div>
                    )}
                  </div>
                )}
              </div>

              {bothvalidationErrors["pick_up.full_address"] && (
                <span className="error text-[12px] text-red-500 ">❗{bothvalidationErrors["pick_up.full_address"]}</span>
              )}
            </div>

            <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-textLightColor font-medium">
                  House / Flat / Floor *
                </label>
                <input
                 autoComplete="new-item"
                  name="Floor_details"
                  className={`border-[1.5px] rounded-[6px] h-[38px] text-base placeholder:text-[#CCBEBE] font-medium border-borderColor px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary
              ${bothvalidationErrors["pick_up.flat"] ? "border-red-500" : ""}`}
                  placeholder="Enter House / Flat / Floor"
                  defaultValue={formData.customer.isAutofilled ? dropFormData.pick_up.flat : ""}
                  onChange={(e) => {
                    bothvalidationErrors["pick_up.flat"] = "";
                    // setFormFields({ flat: e.target.value });
                    setPickupDetails({flat:e.target.value})
                    // dropFormData.pick_up.flat = e.target.value;
                  }}

                  readOnly={formData.customer.isAutofilled ? true : false}

                />
                {bothvalidationErrors["pick_up.flat"] && (
                  <span className="error text-[12px] text-red-500 ">❗{bothvalidationErrors["pick_up.flat"]}</span>
                )}


              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-textLightColor font-medium">
                  Street *
                </label>
                <input
                 autoComplete="new-item"
                  name="street"
                  className={`border-[1.5px] rounded-[6px] h-[38px] text-base placeholder:text-[#CCBEBE] font-medium border-borderColor px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary
              ${bothvalidationErrors["pick_up.street"] ? "border-red-500" : ""}`}
                  placeholder="Enter Street"
                  defaultValue={formData.customer.isAutofilled ? dropFormData.pick_up.street : ""}
                  onChange={(e) => {
                    bothvalidationErrors["pick_up.street"] = "";
                    setPickupDetails({street:e.target.value})

                  }}

                  readOnly={formData.customer.isAutofilled ? true : false}

                />
                {bothvalidationErrors["pick_up.street"] && (
                  <span className="error text-[12px] text-red-500 ">❗{bothvalidationErrors["pick_up.street"]}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-textLightColor font-medium">
                  Area *
                </label>
                <input
                 autoComplete="new-item"
                  name="area"
                  className={`border-[1.5px] rounded-[6px] h-[38px] text-base placeholder:text-[#CCBEBE] font-medium border-borderColor px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary
              ${bothvalidationErrors["pick_up.area"] ? "border-red-500" : ""}`}
                  placeholder="Enter Area"
                  defaultValue={formData.customer.isAutofilled ? dropFormData.pick_up.area : ""}
                  onChange={(e) => {
                    bothvalidationErrors["pick_up.area"] = "";
                    setPickupDetails({area:e.target.value})

                  }}

                  readOnly={formData.customer.isAutofilled ? true : false}

                />
                {bothvalidationErrors["pick_up.area"] && (
                  <span className="error text-[12px] text-red-500 ">❗{bothvalidationErrors["pick_up.area"]}</span>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm text-textLightColor font-medium">
                  Land Mark *
                </label>
                <input
                 autoComplete="new-item"
                  name="land_mark"
                  className={`border-[1.5px] rounded-[6px] h-[38px] text-base placeholder:text-[#CCBEBE] font-medium border-borderColor px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary
              ${bothvalidationErrors["pick_up.landmark"] ? "border-red-500" : ""}`}
                  placeholder="Enter Land Mark"
                  defaultValue={formData.customer.isAutofilled ? dropFormData.pick_up.landmark : ""}
                  onChange={(e) => {
                    bothvalidationErrors["pick_up.landmark"] = "";
                    setPickupDetails({landmark:e.target.value})

                  }
                  }
                  readOnly={formData.customer.isAutofilled ? true : false}

                />
                {bothvalidationErrors["pick_up.landmark"] && (
                  <span className="error text-[12px] text-red-500 ">❗{bothvalidationErrors["pick_up.landmark"]}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-textLightColor font-medium">
                  Pincode *
                </label>
                <input
                 autoComplete="new-item"
                  name="pincode"
                  type="number"
                  className={`border-[1.5px] rounded-[6px] h-[38px] text-base placeholder:text-[#CCBEBE] font-medium border-borderColor px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary
                  ${bothvalidationErrors["pick_up.pincode"] ? "border-red-500" : ""}`}
                  placeholder="Enter Pincode"
                  defaultValue={formData.customer.isAutofilled ? dropFormData.pick_up.pincode : ""}
                  onChange={(e) => {
                    bothvalidationErrors["pick_up.pincode"] = "";
                    setPickupDetails({pincode:e.target.value})

                  }
                  }
                  readOnly={formData.customer.isAutofilled ? true : false}


                />

                {bothvalidationErrors["pick_up.pincode"] && (
                  <span className="error text-[12px] text-red-500 ">❗{bothvalidationErrors["pick_up.pincode"]}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-textLightColor font-medium">
                  State *
                </label>
                <div className="w-full w-full">
                  <input
                    autoComplete="new-item"
                    name="State"
                    type="text"
                    className={`border-[1.5px] h-[38px] text-[16px] placeholder:font-medium placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary 
                 `}
                  defaultValue={
                    //@ts-expect-error null
                    formData.customer.state}
                    disabled
                  />
                </div>

                {bothvalidationErrors["pick_up.state"] && (
                  <span className="error text-[12px] text-red-500 ">❗{bothvalidationErrors["pick_up.state"]}</span>
                )}
              </div>

            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">

              <div className="flex flex-col gap-2">
                <label className="text-sm text-textLightColor font-medium">
                  City *
                </label>

                <div className="w-full w-full">
                  {/* <select
            disabled={formData.customer.isAutofilled}
            onChange={handleCityInput}
            className={`border-[1.5px] h-[38px] text-[16px] placeholder:font-medium placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary ${
              bothvalidationErrors["customer.city"] ? "border-red-500" : ""
            }`}
            defaultValue={formData.customer.isAutofilled ? dropFormData.pick_up.city : inputValueCity}
          >
            <option defaultValue="">Select City</option>
            {predictionsCity.map((city) => (
              //@ts-expect-error null
              <option key={city.id} name={city.id} defaultValue={city.name}>
                {
                  //@ts-expect-error null
                  city.name
                }
              </option>
            ))}
          </select> */}

                  <select
                    disabled={formData.customer.isAutofilled}
                    onChange={handleCityInput}
                    className={`border-[1.5px] h-[38px] text-[16px] placeholder:font-medium placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary ${bothvalidationErrors["customer.state"] ? "border-red-500" : ""
                      }`}
                    defaultValue={formData.customer.isAutofilled ?
                      //@ts-expect-error null
                      dropFormData.pick_up.city : ""}
                  >
                    <option defaultValue=""> {
                      //@ts-expect-error null

                      dropFormData.pick_up.city == "" ? "Select City" : dropFormData.pick_up.city}</option>
                    {predictionsCity.map((city, index) => (
                      //@ts-expect-error null
                      <option key={city.id} name={city.id} defaultValue={city.name}>
                        {
                          //@ts-expect-error null
                          city.name
                        }
                      </option>
                    ))}
                  </select>

                </div>


                {bothvalidationErrors["pick_up.city"] && (
                  <span className="error text-[12px] text-red-500 ">❗{bothvalidationErrors["pick_up.city"]}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddressForm;
