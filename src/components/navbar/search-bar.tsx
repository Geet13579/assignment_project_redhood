
import { Input } from "@/components/ui/input"
import './navbar.css'
import {useSearchInputStore} from "@/hooks/use-search"



export default function Component() {



  const { setInputSearchText, inputSearchText } = useSearchInputStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputSearchText(e.target.value);
  };
  
  return (
    <div className="mb-5">
     
      <div className="flex ml-auto items-center space-x-4">
        <div className="relative rounded-lg responsiveSearch ">
          <Input type="text" onChange={handleChange} defaultValue={inputSearchText} placeholder="Search name, car number, mobile no. or Queue ID"  className="rounded-[6px] shadow-none border-[1.5px] border-[#EADADA] w-full appearance-none   pl-8 text-[16px] placeholder:text-[#CCBEBE]" />
          <SearchIcon className="absolute left-2.5 top-2.5 w-4 h-4 text-black " />
        </div>
      </div>
    </div>
  )
}

function SearchIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}