import React from 'react'

const formData = [
  {
    label: "House / Flat / Floor",
    placeholder: 'House No. 42/k'
  },
  {
    label: "Street",
    placeholder: 'Circular Market'
  },
  {
    label: "Area",
    placeholder: 'Camp 2'
  },
  {
    label: "Land Mark",
    placeholder: 'Near AAN Hospital'
  },
  {
    label: "Pincode",
    placeholder: '490001'
  },
  {
    label: "City",
    placeholder: 'Durg'
  },
  {
    label: "District",
    placeholder: 'Durg'
  },
  {
    label: "State",
    placeholder: 'Chhattisgarh'
  },
]



function AddressForm() {
  return (
    <div className='mt-4'>
      <div className='flex justify-between items-center px-[16px] mb-4 text-textLightColor'>
        <div>
          <p className='text-[14px] text-[#211C1C] leading-[16px]'>Customer Address</p>
        </div>
      </div>
      <div className=''>
        <div className='bg-white border-[1.5px] p-[16px] border-borderColor rounded-[6px]'>
          <div className='grid gap-3'>
            <div className='grid grid-cols-3 gap-6'>
              {formData.slice(0, 6)?.map((data, index) => (
                <div key={index} className='flex flex-col gap-2'>
                  <label className='text-[14px] text-textLightColor font-medium'>{data.label}</label>
                  <input
                    className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                    placeholder={data.placeholder}
                  />
                </div>
              ))}
            </div>
            <div className='grid grid-cols-2 gap-6'>
              {formData.slice(6).map((data, index) => (
                <div key={index + 6} className='flex flex-col gap-2'>
                  <label className='text-[14px] text-textLightColor font-medium'>{data.label}</label>
                  <input
                    className="border-[1.5px] h-[38px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                    placeholder={data.placeholder}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddressForm