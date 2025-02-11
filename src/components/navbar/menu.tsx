"use client";
// import {useEffect} from 'react';
import Link from "next/link";
import { Ellipsis } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { getMenuList } from "@/lib/menu-list";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CollapseMenuButton } from "@/components/navbar/collapse-menu-button";
import { Separator } from "@/components/ui/separator";

// import CountPage from './count-length-list';

import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "@/components/ui/tooltip";
// import path from "path";

interface MenuProps {
  isOpen: boolean | undefined;
}

export function Menu({ isOpen }: MenuProps) {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);
  // const router = useRouter();

  const handleLogout = () => {
    const logout = confirm("Are you sure you want to log out?");

    if (logout) {
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }
  };

  return (
    <ScrollArea className="[&>div>div[style]]:!block">
      <nav className="mt-1 h-full w-full">
        <ul className="flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-4">
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
                <p className="text-[14px]  font-medium text-[#827979] px-0 py-4 max-w-[248px] truncate">
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
                                pathname === href
                                  ? "bg-[#FFF0E6] text-textDrak"
                                  : "text-textlight"
                              }`}
                              asChild
                              onClick={
                                label === "Log out" ? handleLogout : undefined
                              }
                            >
                              <Link href={href}>
                                <span
                                  className={cn(isOpen === false ? "" : "mr-4")}
                                >
                                  <Icon size={18} />
                                </span>
                                <p
                                  className={cn(
                                    `max-w-[200px] truncate text-[14px] font-medium `,
                                    isOpen === false
                                      ? "-translate-x-96 opacity-0"
                                      : "translate-x-0 opacity-100"
                                  )}
                                >
                                  {label}

                                  {/* {label==="Active Tasks" ?  : } */}
                                </p>
                                {/* <CountPage label={label}/> */}
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
                        index={2}
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
      </nav>
    </ScrollArea>
  );
}
