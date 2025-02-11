import React, { ChangeEvent, useState } from 'react'
import { useBookingStore } from '@/hooks/use-add-booking'
import { storage } from "@/utils/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

function Select() {
    const { formData, validationErrors,setValidationErrors } = useBookingStore()

    // const [file, setFile] = useState("")
    // const [uploadStatus, setUploadStatus] = useState<string>('')

    const [file, setFile] = useState("")
    const [uploadStatus, setUploadStatus] = useState<string>('')
    const [fileName, setFileName] = useState<string>('')  // Add this state for file name

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        // // console.log('File input change triggered')

        const file = e.target.files?.[0]
        if (!file) {
            // // console.log('No file selected')
            return
        }

        // // console.log('Selected file:', file.name)
        setUploadStatus('Uploaded')
        setFileName(file.name)  // Save the file name

        const storageRef = ref(storage, `npi/invoices/${file.name}`);

        try {
            await uploadBytes(storageRef, file);
            const url = await getDownloadURL(storageRef);
            setFile(url)
            // // console.log('url', url)

            setValidationErrors((prevErrors) => {
                const newErrors = { ...prevErrors };
                delete newErrors['invoice_attachment']; // Remove the error
                return newErrors;
              });

            //@ts-expect-error null

            formData.invoice_attachment = url
            // // console.log("File Uploaded Successfully");
        } catch (error) {
            console.error('Error uploading the file', error);
            setUploadStatus('Upload failed')
            setFileName('')  // Clear filename on error
        }
    }


    return (
        <div className='mt-4'>
            <div className='flex justify-between items-center px-[16px] mb-4 text-textLightColor'>
                <div>
                    <p className='text-[14px] text-[#211C1C] leading-[16px]'>Add Service Invoices</p>
                </div>
            </div>
            <div className=''>
                <div className='bg-white border-[1.5px] p-[16px] border-borderColor rounded-[6px]'>
                    <div className='grid 2xl:grid-cols-4 items-center md:grid-cols-2 grid-cols-1 gap-6 h-auto relative'>
                        {/* Previous input fields remain the same */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-[14px] text-textLightColor font-medium'>Enter Invoice Number *</label>
                            <input
                                name='service_invoice_no'
                                onChange={(e) => {
                                    setValidationErrors((prevErrors) => {
                                        const newErrors = { ...prevErrors };
                                        delete newErrors['service_invoice_no']; // Remove the error
                                        return newErrors;
                                      });
                                    //@ts-expect-error null

                                    formData.service_invoice_no = e.target.value
                                }}
                                className={`border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary
                            ${validationErrors["service_invoice_no"] ? "border-red-500" : ""}
                            `}
                                placeholder="#RFGT548"
                            />
                            {validationErrors["service_invoice_no"] && (
                                <span className="error text-[12px] text-red-500">❗{validationErrors["service_invoice_no"]}</span>
                            )
                            }
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-[14px] text-textLightColor font-medium'>Date of invoice *</label>
                            <input
                                name='date_of_invoice'
                                onChange={(e) => {
                                    setValidationErrors((prevErrors) => {
                                        const newErrors = { ...prevErrors };
                                        delete newErrors['date_of_invoice']; // Remove the error
                                        return newErrors;
                                      });

                                    //@ts-expect-error null

                                    formData.date_of_invoice = `${e.target.value} 00:00:00`
                                }}
                                type='date'
                                className={`border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary
                            ${validationErrors["date_of_invoice"] ? "border-red-500" : ""}
                            `}
                                placeholder="26 Sep 2024"
                            />
                            {validationErrors["date_of_invoice"] && (
                                <span className="error text-[12px] text-red-500">❗{validationErrors["date_of_invoice"]}</span>
                            )
                            }
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='text-[14px] text-textLightColor font-medium'>Enter Invoice Amount</label>
                            <input
                                name='invoice_amount'
                                type='number'
                                onChange={(e) => {
                                    setValidationErrors((prevErrors) => {
                                        const newErrors = { ...prevErrors };
                                        delete newErrors['invoice_amount']; // Remove the error
                                        return newErrors;
                                      });

                                    //@ts-expect-error null

                                    formData.invoice_amount = e.target.value;
                                }}
                                className={`border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary
                            ${validationErrors["invoice_amount"] ? "border-red-500" : ""}
                            `}
                                placeholder="₹ 2,500.00"
                            />
                            {validationErrors["invoice_amount"] && (
                                <span className="error text-[12px] text-red-500">❗{validationErrors["invoice_amount"]}</span>
                            )}
                        </div>

                        {/* Modified file upload section */}
                        <div className='flex flex-col gap-2'>
                            <label className='text-[14px] text-textLightColor font-medium'>Upload Invoice Attachment (PDF only)</label>
                            <div className='relative border-[1.5px] border-dashed border-[#686868] rounded-[8px] hover:border-primary transition-colors duration-300'>
                                <input
                                    type="file"
                                    id="doc"
                                    name="image"
                                    accept=".pdf"
                                    onChange={handleFileChange}
                                    className="w-full h-full opacity-0 cursor-pointer absolute inset-0 z-10"
                                />
                                <div className="space-y-2 py-6 px-4 text-center">
                                    {fileName ? (
                                        <div className="flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-[14px] font-medium text-primary">{fileName}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <h4 className="text-[14px] font-medium">Drag and drop or click to upload</h4>
                                            <p className="text-[12px] text-[#686868]">PDF files only (Max size: 5MB)</p>
                                        </>
                                    )}
                                </div>
                            </div>
                            {validationErrors["invoice_attachment"] && (
                                <span className="error text-[12px] text-red-500">❗{validationErrors["invoice_attachment"]}</span>
                            )}
                            {file && (
                                <div className="mt-2">
                                    <a
                                        href={file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-primary hover:underline text-sm flex items-center gap-1"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                        View uploaded invoice
                                    </a>
                                </div>
                            )}
                        </div>



                        <p className='text-[12px] text-[#686868] font-medium absolute md:bottom-[0px] bottom-[-16px] 2xl:left-[50%] left-0'>If no invoice generated then put “0” to continue</p>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Select