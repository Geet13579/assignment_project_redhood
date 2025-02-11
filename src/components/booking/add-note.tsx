
import {useBookingStore} from '@/hooks/use-add-booking'

function AddressForm() {

  const {formData } = useBookingStore()

  const handleInputChange =(e: React.ChangeEvent<HTMLInputElement>) => {

    formData.note_to_driver = e.target.value;

  }


  return (
    <div className='mt-4'>
      <div className='flex justify-between items-center px-[16px] mb-4 text-textLightColor'>
        <div>
          <p className='text-[14px] text-[#211C1C] leading-[16px]'>Add Note ( Optional )</p>
        </div>
      </div>
      <div className=''>
        <div className='bg-white border-[1.5px] p-[16px] border-borderColor rounded-[6px]'>
          <div className='grid gap-3'>
            <div className='grid grid-cols-1 gap-6'>
              
                <div  className='flex flex-col gap-2'>
                  <label className='text-[14px] text-textLightColor font-medium'>Note to Driver</label>
                  <input
                   autoComplete="new-item"
                    className="border-[1.5px] h-[83px] text-[16px] placeholder:text-[#CCBEBE] font-medium border-borderColor rounded-[6px] px-3 py-2 transition duration-300 ease focus:outline-none focus:border-primary hover:border-primary"
                    placeholder="Write a note"
                    onChange={handleInputChange}
                  />
                </div>
          
                {/* <WordEditor onContentChange={(value:any) =>  formData.note_to_driver = value}/> */}

            </div>
            
            </div>
          </div>
        </div>
      </div>

  )
}

export default AddressForm