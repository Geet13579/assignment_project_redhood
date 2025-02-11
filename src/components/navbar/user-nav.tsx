"use client";

import Link from "next/link";
// import { LayoutGrid, LogOut, User } from "lucide-react";
import { CollapseMenuButton } from "@/components/navbar/collapse-menu-navBar";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  // DropdownMenuGroup,
  // DropdownMenuItem,
  // DropdownMenuLabel,
  // DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Ellipsis } from "lucide-react";
import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/user-nav-list";

interface MenuProps {
  isOpen: boolean | undefined;
}
//@ts-expect-error null
export function UserNav({ isOpen, Profile }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname, Profile);


  // console.log('Profile', Profile)
  return (
    <DropdownMenu>
      <TooltipProvider disableHoverableContent>
        <Tooltip delayDuration={100}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              {/* <Button
                variant="outline"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent"><img src="https://cdn.pixabay.com/photo/2014/02/27/16/10/flowers-276014_1280.jpg" className="h-full" /></AvatarFallback>
                </Avatar>
              </Button> */}

              <Button
                variant="outline"
                className="relative h-10 w-10 rounded-full border-[2px] border-primary bg-[#fff0e6]"
              >
                <Avatar className="h-10 w-10 flex justify-center items-center">
                  <AvatarImage src="#" alt="Avatar" />
                  <AvatarFallback className="bg-transparent">
                    <div className="text-center text-primary font-bold ">
                      {Profile?.name?.split(" ")
                        .map((word: any) => word.charAt(0).toUpperCase()) // Get the first character of each word and capitalize it
                        .join("")}
                    </div>
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>

      <DropdownMenuContent
        className="w-[300px] border-none mt-2 rounded-l-[12px] rounded-br-[12px]"
        align="end"
        forceMount
      >
        <ul className="flex flex-col bg-white items-start space-y-1   ">
          {menuList.map(({ groupLabel, menus }, index) => (
            <li
              className={cn(
                "w-full ",
                groupLabel ? "pt-0" : "",
                index === 2 ? "pt-40" : ""
              )}
              key={index}
            >
              {(isOpen && groupLabel) || isOpen === undefined ? (
                <p className="text-[14px]  font-medium text-[#827979] px-4 py-4 max-w-[248px] truncate ">
                  {groupLabel}

                  <Separator
                    className={`my-2 h-[1px] bg-[#EADADA] ${
                      index == 1 ? "block" : "hidden"
                    } `}
                  />
                </p>
              ) : !isOpen && isOpen !== undefined && groupLabel ? (
                <TooltipProvider>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger className="w-full ">
                      <div className="w-full flex justify-center items-center">
                        <Ellipsis className="h-5 w-5" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{groupLabel}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <p className="pb-2"></p>
              )}
              {menus.map(
                ({ href, label, icon: Icon, active, submenus }, index) =>
                  !submenus || submenus.length === 0 ? (
                    <div className="w-full" key={index}>
                      <TooltipProvider disableHoverableContent>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <Button
                              className={`w-full justify-start bg-white rounded-[6px] shadow-none h-10 mb-1 hover:bg-[#FFF0E6] hover:text-textDark  ${
                                label === "Add New User"
                                  ? "bg-[#FFF0E6] text-textDrak"
                                  : "text-textlight"
                              }
                              
                              ${
                                index === 4
                                  ? "justify-evenly   flex-row-reverse "
                                  : ""
                              }`}
                              asChild
                            >
                              <Link
                                href={href}
                                className={cn(
                                  index === 4
                                    ? " border-2 border-[#FF6702] "
                                    : ""
                                )}
                              >
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    `max-w-[200px] truncate  text-[14px] font-medium `,
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  
                                  {label}
                                </p>
                              </Link>
                            </Button>
                          </TooltipTrigger>
                          {isOpen === false && (
                            <TooltipContent side="right">
                              {label}
                            </TooltipContent>
                          )}
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ) : (
                    <div className="w-full" key={index}>
                      <CollapseMenuButton
                        icon={Icon}
                        label={label}
                        active={active}
                        index={index}
                     
                        Profile={Profile}
                        //@ts-expect-error null
                        submenus={submenus}
                        isOpen={isOpen}
                      />
                    </div>
                  )
              )}
            </li>
          ))}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
