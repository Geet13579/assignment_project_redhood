"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, LucideIcon } from "lucide-react";
// import {getTabList} from '@/lib/tabs'

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useParams } from 'next/navigation'
import { useBookingStore } from '@/hooks/use-add-booking'
import { useTabStore } from '@/hooks/use-tabs'
// import CountPage from './count-length-list';


type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  value: string;
};

interface CollapseMenuButtonProps {
  icon: LucideIcon;
  label: string;
  active: boolean;
  index: number;
  submenus: Submenu[];
  isOpen: boolean | undefined;
}

export function CollapseMenuButton({
  icon: Icon,
  label,
  active,
  submenus,
  index,
  isOpen,

}: CollapseMenuButtonProps) {
  const pathname = usePathname();
  const isSubmenuActive = submenus.some((submenu) =>
    submenu.active == undefined ? submenu.href === pathname : submenu.active
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);
  const { formData} = useBookingStore()
  const {setActiveTab, activeTab} = useTabStore()


  // const cardData = getTabList("");
  // const router = useParams()

  const handleTabs = (label:string)=>{
  
    // console.log('label', label)
    formData.type = "PICKUP"
    if(label == "Add Booking"){
    
      setActiveTab("SERVICE")

    }
    else if(label == "Chauffeur"){

      setActiveTab("CHAUFFEUR");

    }else if(label == "RSA"){
      setActiveTab("RSA");

    }else{
    setActiveTab(label)

    }

  }

  const parsedToken =  localStorage.getItem("authToken");

  console.log('parsedToken', parsedToken)

  return isOpen ? (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className="w-full"
    >
      <CollapsibleTrigger
        className="[&[data-state=open]>div>div>svg]:rotate-180 mb-1"
        asChild
      >
        <Button
          variant={active ? "secondary" : "ghost"}
          className={cn("w-full justify-start h-12 hover:bg-[#FFF0E6] rounded-[6px] hover:text-textDark", label === 'Dashboard' ? 'text-textDark' : "text-textlight")}
        >
          <div className={cn("w-full items-center flex justify-between ",

            index === 1 ? 'border-2 border-[#EADADA] py-1 px-2 rounded-common' : '',
          )}>
            <div className="flex items-center" >
              <span className="mr-4">

                {index == 0 ?
                  <Avatar className="h-8 w-8 ">
                    <AvatarImage src="#" alt="Avatar" />
                    <AvatarFallback className="bg-transparent"><img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg" className="h-full" /></AvatarFallback>
                  </Avatar>
                  :

                  index === 1 ?

                    "" :
                    <Icon size={18} />

                }
              </span>
              <p
                className={cn(
                  "max-w-[150px] truncate",
                  index == 0 ? 'font-bold  text-[16px] text-black ' : '',
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0"
                )}
              >
                {label}
                {/* <p className="font-regular  text-[12px] text-left text-[#827979]">{index == 0 ? parsedToken.user_type || 'User' : ""}</p> */}

                {/* <p className="font-regular  text-[12px] text-left text-[#827979]">{index == 0 ? parsedToken?.user_type==="NPI" ?"Manager" : parsedToken?.user_type : "User" }</p> */}



              </p>
            </div>
            <div
              className={cn(
                "whitespace-nowrap",
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-96 opacity-0"
              )}
            >
              <ChevronDown
                size={18}
                className="transition-transform duration-200 "
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        {submenus?.map(({ href, label, active,value }, index) => (
          <Button
            key={index}
            variant={
              ( label === activeTab) || active
                ? "secondary"
                : "ghost"
            }
            className={cn("w-full justify-start h-10 mb-1 hover:bg-[#FFF0E6] hover:text-textDark",
           
              value ===  activeTab &&  href === pathname? "bg-[#FFF0E6] text-textDrak":" text-textlight"

            )}
            asChild
          >
            <Link href={href} onClick={()=>{handleTabs(value)}}>
            
              <p
                className={cn(
                  "max-w-[170px] truncate pl-8",
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-96 opacity-0"
                )}
              >
                 {label}

              </p>
              {/* <CountPage label={label}/> */}

            </Link>
          </Button>
        ))}
      </CollapsibleContent>
    </Collapsible>
  ) : (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Button
                variant={active ? "secondary" : "ghost"}
                className="w-full justify-start h-10 mb-1 hover:bg-[#FFF0E6]"
              >
                <div className="w-full items-center flex justify-between ">
                  <div className="flex items-center">
                    <span className={cn(isOpen === false ? "" : "mr-4")}>
                      <Icon size={18} />
                    </span>
                    <p
                      className={cn(
                        "max-w-[200px] truncate",
                        isOpen === false ? "opacity-0" : "opacity-100"
                      )}
                    >
                      {label}
                    </p>
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent side="right" align="start" alignOffset={2}>
            {label}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent side="right" sideOffset={25} align="start">
        <DropdownMenuLabel className="max-w-[190px] truncate">
          {label}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {submenus?.map(({ href, label, active }, index) => (
          <DropdownMenuItem key={index} asChild>
            <Link
              className={`cursor-pointer hover:bg-[#FFF0E6] ${((active === undefined && pathname === href) || active) &&
                "bg-secondary"
                }`}
              href={href}
            >
              <p className="max-w-[180px] truncate">{label}</p>
            </Link>
          </DropdownMenuItem>
        ))}
        <DropdownMenuArrow className="fill-border" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}