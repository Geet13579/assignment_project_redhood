import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/navbar/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
  // SheetTitle
} from "@/components/ui/sheet";

export function SheetMenu() {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        <SheetHeader>
          <Button
            className="flex justify-start items-start pb-2 pt-1"
            variant="link"
            asChild
          >
            <Link href="/" className="flex items-left gap-2">
            <img src="./logo.svg"  className=
                "font-bold  transition-[transform,opacity,display] ease-in-out duration-300 h-[41px] w-[131px]"/>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
