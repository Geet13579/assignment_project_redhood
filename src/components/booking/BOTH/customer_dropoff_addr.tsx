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

function AddressForm() {
  const {formData, setCustomerDetails } = useBookingStore();
  const { dropFormData, bothvalidationErrors, setDropoffDetails,setPickupDetails } = useDropBookingStore();

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
        
        setDropoffDetails({state:filteredData[0].name})
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

  

    if (!dropFormData.drop_off.autofilled) {
      setDropoffDetails({
        full_address: "",
        city_id: "",
        state_id: "",
        area: "",
        pincode: "",
        landmark: "",
        street: "",
        location: { lat: 0, lng: 0 },
        flat: "",
        state: "",
        city: "",
      })
    }

  }, [setDropoffDetails])



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

    dropFormData.drop_off.full_address = value

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

      dropFormData.drop_off.full_address = prediction.text.text;

      dropFormData.drop_off.location.lat = data.location.latitude;
      dropFormData.drop_off.location.lng = data.location.longitude;
    } catch (error) {
      console.error("Error fetching predictions:", error);
    }
  };

  const handleBlur = () => {
    setTimeout(() => setShowDropdown(false), 200);
  };

  // for state



  const handleStateInput = async (event: any
  ) => {

    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const stateId = selectedOption.getAttribute('name');
    const stateName = event.target.value;
    setInputValueState((prevState) => stateName);
    setInputValueCity("");
    dropFormData.drop_off.city_id = ""

    dropFormData.drop_off.state_id = stateId;
    bothvalidationErrors["pick_up.state"] = "";
    debouncedSearchCities(stateId);
  }



  const handleCityInput = (event: any) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedOption = event.target.options[selectedIndex];
    const cityId = selectedOption.getAttribute('name');
    const stateName = event.target.value;
    setInputValueCity((prevState) => stateName);
    dropFormData.drop_off.city_id = cityId;
    bothvalidationErrors["pick_up.city"] = "";

  }

  const handleAddressCheckbox = async (e: any) => {

    setAddressChecked(e.target.checked);
    setDropoffDetails({autofilled:e.target.checked})

    if (e.target.checked == false) {
      setDropoffDetails({
        full_address: "",
        city_id: "",
        state_id: "",
        area: "",
        pincode: "",
        landmark: "",
        street: "",
        flat: "",
        city: "",
        state: "",

      })
      setErrors("")
    }
    else {
      // if (formData.pick_up.id == null) {
      //   setAddressChecked(false)

      //   setErrors("NO have existing customer please Enter Manually")

      // }
      

          setDropoffDetails({

            full_address: dropFormData.pick_up.full_address,
            city_id:dropFormData.pick_up.city_id,
            state_id:dropFormData.pick_up.state_id,
            area:dropFormData.pick_up.area,
            pincode:dropFormData.pick_up.pincode,
            landmark:dropFormData.pick_up.landmark,
            street:dropFormData.pick_up.street,
            flat:dropFormData.pick_up.flat,
            //@ts-expect-error null
            city:dropFormData.pick_up.city,
            state:dropFormData.pick_up.state,
            location:{lat:dropFormData.pick_up.location.lat, lng:dropFormData.pick_up.location.lng}
            // state_id: data.state_id, // This should be fetched from the API call and stored in the customer state. For now, we are using a mock state.

          })



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
            if (state.id === dropFormData.pick_up.state_id) {
              console.log('state.id', state)
              setDropoffDetails({ state: state.name })

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


              cityData.data.map(async (city: any) => {
                
                if (city.id === dropFormData.pick_up.city_id) {
                  console.log('city.id', city)
                  setDropoffDetails({ city: city.name })

                }
              })

            }
          })
        // }

      
    }

  }


  return (
    <div className="mt-4">
      <div className="flex justify-between items-center px-4 mb-4 text-textLightColor">
        <div className="flex gap-5 items-center">
          <p className="text-sm text-[#211C1C] leading-4">Drop-off Address</p>
          <div className="flex gap-2">
            <input
             autoComplete="new-item"
              type="checkbox"
              checked={dropFormData.drop_off.autofilled}
              onChange={handleAddressCheckbox}
            />
            <p>
            Same As Pick-up Address

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

                  value={dropFormData.drop_off.autofilled ? dropFormData.drop_off.full_address : inputValue}
                  onChange={handleSearchLocation}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={handleBlur}
                  name="Enter Location"
                  className={`border-[1.5px] h-[38px]  text-[16px] placeholder:font-medium placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary
              ${bothvalidationErrors["pick_up.full_address"] ? "border-red-500" : ""}`}
                  readOnly={dropFormData.drop_off.autofilled ? true : false}

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
                  defaultValue={dropFormData.drop_off.autofilled ? dropFormData.drop_off.flat : ""}
                  onChange={(e) => {
                    bothvalidationErrors["pick_up.flat"] = "";

                    dropFormData.drop_off.flat = e.target.value;
                  }}

                  readOnly={dropFormData.drop_off.autofilled ? true : false}

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
                  defaultValue={dropFormData.drop_off.autofilled ? dropFormData.drop_off.street : ""}
                  onChange={(e) => {
                    bothvalidationErrors["pick_up.street"] = "";

                    dropFormData.drop_off.street = e.target.value;
                  }}

                  readOnly={dropFormData.drop_off.autofilled ? true : false}

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
                  defaultValue={dropFormData.drop_off.autofilled ? dropFormData.drop_off.area : ""}
                  onChange={(e) => {
                    bothvalidationErrors["pick_up.area"] = "";

                    dropFormData.drop_off.area = e.target.value;
                  }}

                  readOnly={dropFormData.drop_off.autofilled ? true : false}

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
                  defaultValue={dropFormData.drop_off.autofilled ? dropFormData.drop_off.landmark : ""}
                  onChange={(e) => {
                    bothvalidationErrors["pick_up.landmark"] = "";

                    dropFormData.drop_off.landmark = e.target.value;
                  }
                  }
                  readOnly={dropFormData.drop_off.autofilled ? true : false}

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
                  defaultValue={dropFormData.drop_off.autofilled ? dropFormData.drop_off.pincode : ""}
                  onChange={(e) => {
                    bothvalidationErrors["pick_up.pincode"] = "";

                    dropFormData.drop_off.pincode = e.target.value;
                  }
                  }
                  readOnly={dropFormData.drop_off.autofilled ? true : false}


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
                  value={
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
                  <select
                    disabled={dropFormData.drop_off.autofilled}
                    onChange={handleCityInput}
                    className={`border-[1.5px] h-[38px] text-[16px] placeholder:font-medium placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 w-full focus:outline-none focus:border-primary hover:border-primary ${bothvalidationErrors["pick_up.state"] ? "border-red-500" : ""
                      }`}
                    value={dropFormData.drop_off.autofilled ?
                      //@ts-expect-error null
                      dropFormData.drop_off.city : inputValueCity}
                  >
                    <option value=""> {
                      //@ts-expect-error null

                      dropFormData.drop_off.city == "" ? "Select City" : dropFormData.drop_off.city}</option>
                    {predictionsCity.map((city, index) => (
                      //@ts-expect-error null
                      <option key={city.id} name={city.id} value={city.name}>
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
