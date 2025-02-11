"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import CustomerDetails from "./customer-details";
import CustomerDropAddress from "./customer_dropoff_addr";
import CustomerPickupAddress from "./customer_pickup_addr";
import RadioButton from "./radioButtons";
import SelectDate from "./select-date";
import VehicleDetails from "./vehicle-details";

import DropAddress from "./BOTH/customer_dropoff_addr";

import PickupAddress from "./BOTH/customer_pickup_addr";

import { useBookingStore } from "@/hooks/use-add-booking";
import { useDropBookingStore } from "@/hooks/use-for-both-pikup-dropoff";
import { Car, MapPin } from "lucide-react";
import Addnote from "./add-note";
import ServiceInvoice from "./service-invoice";

import { useCenterStore } from "@/hooks/get-center-profile";
import { useLicenseStore } from "@/hooks/use-empoyee-list";
import { useProfileDetails } from "@/hooks/wallet-payments/use-profile-store";

import { useToast } from "@/hooks/use-toast";
import SuccessPopup from "@/lib/popup-mgs";
import WarningPopup from "@/lib/warning-popup";
import {UseProfileStore} from '@/hooks/get-profile-data'
import { useTabStore } from "@/hooks/use-tabs";
import { useParams } from "next/navigation";

export default function Home() {
  const { toast } = useToast();
  const params = useParams();

  const {
    formData,
    clearData,
    submitData,
    isLoading,
    validateForm,
    validationErrors,
    setCustomerDetails
  } = useBookingStore();

  const { dropFormData, submitBothData, setDropoffDetails, setPickupDetails, BothvalidateForm } = useDropBookingStore();
  const { licenses, fetchLicenses } = useLicenseStore();
  const { employeeDetails, fetchCenterDetails } = useCenterStore();
  const { activeTab } = useTabStore();

  const { fetchProfileData, profileData } = useProfileDetails();

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [userProfile, setprofileData] = useState("");


  const [showWarningPopup, setShowWarningPopup] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");

  // Fetch data only once when component mounts
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await Promise.all([
  //       fetchLicenses("ACTIVE"),
  //       fetchCenterDetails(),
  //       fetchProfileData(),
  //     ]);
  //   };
  //   fetchData();
  // }, []); // Remove dependencies since these functions should be stable

  // console.log('profileData', profileData)
  // // console.log('employeeDetails', employeeDetails)
  // Memoize filtered employee lists
  const { CRE, serviceAdviser } = useMemo(
    () => ({
      CRE: licenses.filter(
        (employee) => employee.designation === "Customer Relation Executive"
      ),
      serviceAdviser: licenses.filter(
        (employee) => employee.designation === "Service Advicer"
      ),
    }),
    [licenses]
  );

  // Memoize employee role checks
  const { isServiceAdviser, isCRE } = useMemo(
    () => ({
      isServiceAdviser:
        employeeDetails != null &&
        serviceAdviser.some(
          (data) =>
            data.employee_uid === employeeDetails.employee_uid &&
            data.designation === employeeDetails.designation
        ),
      isCRE:
        employeeDetails != null &&
        CRE.some(
          (data) =>
            data.employee_uid === employeeDetails.employee_uid &&
            data.designation === employeeDetails.designation
        ),
    }),
    [employeeDetails, serviceAdviser, CRE]
  );

  // Update form data based on employee role
  useEffect(() => {
    const { slug } = params
formData.category = slug as string
    if (isServiceAdviser && employeeDetails) {
      formData.service_advicer_id = employeeDetails.id;
    }
    if (isCRE && employeeDetails) {
      formData.cre_id = employeeDetails.id;
    }
  }, [isServiceAdviser, isCRE, employeeDetails, formData]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([
          fetchLicenses("ACTIVE"),
          fetchCenterDetails(),
          fetchProfileData(),
        ]);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };
    fetchInitialData();
  }, []); // This effect runs once on mount

  // Separate effect for profile-specific data
  useEffect(() => {
    const fetchProfile = async () => {
      // Only fetch if we don't already have profile data
      if (!userProfile) {
        try {
          const token = localStorage.getItem("authToken");
          const parsedToken = token ? JSON.parse(token) : null;
    
          if (!parsedToken?.token) {
            throw new Error("No auth token found");
          }
    
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/get-profile`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${parsedToken.token}`,
              },
            }
          );
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          if (data.message === "Unauthorized.") {
            // console.log("first");
            window.location.href = "/";
          }
          if (data?.data) {
            

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
    
              if (state.id === data.data.state_id) {
                console.log('state.id', state)
                setCustomerDetails({ state: state.name })
              }})
              
            formData.customer.state_id = data.data.state_id;
            setCustomerDetails({ state_id: data.data.state_id });
            setDropoffDetails({ state_id: data.data.state_id });
            setPickupDetails({ state_id: data.data.state_id });
            setprofileData(data.data);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        }
      }
    };
  
    fetchProfile();
  }, []);

  // Memoize dropdown configuration
  const dropdown = useMemo(
    () => [
      {
        label: isServiceAdviser
          ? employeeDetails?.name || ""
          : "Select Service Advicer*",
        icon: MapPin,
        option: serviceAdviser,
        inputType: "select",
        active: true,
        value: "",
        designation: "Service Advicer",
      },
      {
        label: isCRE ? employeeDetails?.name || "" : "Select CRE*",
        icon: MapPin,
        option: isCRE ? [] : CRE,
        inputType: "select",
        active: true,
        value: "",
        designation: "Customer Relation Executive",
      },
    ],
    [isServiceAdviser, isCRE, employeeDetails, serviceAdviser, CRE]
  );

  // Memoize radio buttons configuration
  const radioButtons = useMemo(
    () => [
      {
        label: "Pick-up",
        icon: Car,
        inputType: "radio",
        active: true,
        value: "PICKUP",
        option: [],
        designation: "Pick-up",
      },
      {
        label: "Drop-off",
        icon: Car,
        inputType: "radio",
        active: false,
        value: "DROPOFF",
        option: [],
        designation: "Pick-up",
      },
      {
        label: "Pick-up & Dropoff",
        icon: Car,
        inputType: "radio",
        active: false,
        value: "BOTH",
        option: [],
        designation: "BOTH",
      },
    ],
    []
  );

  const ChauffeurradioButtons = useMemo(
    () => [
      // {
      //   label: "Pick-up",
      //   icon: Car,
      //   inputType: "radio",
      //   active: true,
      //   value: "PICKUP",
      //   option: [],
      //   designation: "Pick-up",
      // },
      // {
      //   label: "Drop-off",
      //   icon: Car,
      //   inputType: "radio",
      //   active: false,
      //   value: "DROPOFF",
      //   option: [],
      //   designation: "Pick-up",
      // },
      {
        label: "Pick-up & Dropoff",
        icon: Car,
        inputType: "radio",
        active: true,
        value: "BOTH",
        option: [],
        designation: "BOTH",
      },
    ],
    []
  );

  const handleSubmit = async (e: any) => {
    e.preventDefault();


    try {
      const requestData = { ...formData };

      console.log('requestData', requestData)
      const isValid = validateForm(); // Run validation
      BothvalidateForm()
      if (requestData.type === "BOTH") {

        dropFormData.category = requestData.category
        dropFormData.cre_id = requestData.cre_id
        dropFormData.service_advicer_id = requestData.service_advicer_id
        dropFormData.vehicle = {...formData.vehicle }
        //@ts-expect-error null
        dropFormData.pick_up.appointment_date_time = requestData.appointment_date_time || null
        dropFormData.vehicle.brand_name = requestData.vehicle.brand_name
        dropFormData.vehicle.model_name = requestData.vehicle.model_name
        dropFormData.vehicle.variant = requestData.vehicle.variant
        dropFormData.vehicle.car_number = requestData.vehicle.car_number
        dropFormData.vehicle.car_type = requestData.vehicle.car_type
        dropFormData.pick_up.alt_mobile_number = requestData.customer.alt_mobile_number
        dropFormData.pick_up.mobile_number = requestData.customer.mobile_number
        dropFormData.pick_up.id = requestData.customer.id
        dropFormData.pick_up.email = requestData.customer.email
        dropFormData.pick_up.customer_name = requestData.customer.customer_name
        dropFormData.pick_up.alt_mobile_number = requestData.customer.alt_mobile_number
        dropFormData.drop_off.mobile_number = requestData.customer.mobile_number
        dropFormData.drop_off.id = requestData.customer.id
        dropFormData.drop_off.email = requestData.customer.email
        dropFormData.drop_off.customer_name = requestData.customer.customer_name

        dropFormData.customer.mobile_number = requestData.customer.mobile_number
        dropFormData.customer.id = requestData.customer.id
        dropFormData.customer.email = requestData.customer.email
        dropFormData.customer.customer_name = requestData.customer.customer_name

        
        // if (isValid) {
       const response =  await submitBothData(dropFormData);
       if (response.status === true) {
        setSuccessMessage(response.message);
        setShowSuccessPopup(true);
      } else {
        console.log('response.message', response.message)
        toast({
          variant: "destructive",
          description: response.message,
          status: false,
        });
      }
    // }
    //   else{
    //     toast({
    //       variant: "destructive",
    //       description: "Some fields are required.",
    //       status: false,
    //     });
    //   }
  
        // Change type for pickup
        requestData.type = "PICKUP";
      }
      else{

        console.log('requestData', requestData)
        if (isValid) {
      
        const response = await submitData(requestData);
        if (response.status === true) {
          setSuccessMessage(response.message);
          setShowSuccessPopup(true);
        } else {
          toast({
            variant: "destructive",
            description: response.message,
            status: false,
          });
        }}
        else{
          toast({
            variant: "destructive",
            description: "Some fields are required.",
            status: false,
          });
        }
      }
    
    } catch (error) {
      console.error("Submit error:", error);
      toast({
        variant: "destructive",
        description: "An unexpected error occurred",
        status: false,
      });
    }
  };

  const handlePopupClose = useCallback(() => {
    setShowSuccessPopup(false);

    // clearFormData()
    window.location.reload();
  }, []);

  const clearFormData = useCallback(() => {
    clearData();
  }, [clearData]);

  const handlePopupWarningClose = useCallback(() => {
    setShowWarningPopup(false);
  }, []);



  // Memoize form content based on type
  const FormContent = useMemo(() => {
    switch (formData.type) {
      case "BOTH":
        return (
          <>
            <CustomerDetails />
            <VehicleDetails />
            <PickupAddress userProfile={userProfile}/>
            <DropAddress />
            <Addnote />
          </>
        );
      case "PICKUP":
        return (
          <>
            <CustomerDetails />
            <VehicleDetails />
            <CustomerPickupAddress />
            <Addnote />
          </>
        );
      default:
        return (
          <>
            <CustomerDetails />
            <VehicleDetails />
            <CustomerDropAddress />
            <ServiceInvoice />
            <Addnote />
          </>
        );
    }
  }, [formData.type]);

  return (
    <>
      {" "}
      <form
        onSubmit={handleSubmit}
         autoComplete="off"
      >
        {activeTab === "SERVICE" ? (
          <RadioButton radioButtons={radioButtons} dropdown={dropdown} />
        ) : (
          <RadioButton
            radioButtons={ChauffeurradioButtons}
            dropdown={dropdown}
          />
        )}
        <SelectDate />
        {FormContent}
        <div className="flex w-full justify-center gap-8 py-6">
          <button
            type="button"
            onClick={clearFormData}
            className="border-[1.5px] rounded-[6px] border-borderColor w-[173px] h-[43px]"
          >
            Clear
          </button>

          <button
            type="submit"
            disabled={isLoading}
            className="border-[1.5px] bg-primary rounded-[6px] border-borderColor w-[173px] h-[43px] text-white disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                <span>Submitting...</span>
              </>
            ) : (
              "Confirm Details"
            )}
          </button>
        </div>
      </form>
      {showSuccessPopup && (
        <SuccessPopup message={successMessage} onClose={handlePopupClose} />
      )}
      {showWarningPopup && (
        <WarningPopup
          message={warningMessage}
          onClose={handlePopupWarningClose}
        />
      )}
    </>
  );
}
