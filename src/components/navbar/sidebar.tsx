import Link from "next/link";
// import { PanelsTopLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/navbar/menu";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);
  
  if(!sidebar) return null;

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-white",
        sidebar?.isOpen === false ? "w-[90px]" : "w-72"
      )}
    >
      <div className="relative h-full flex flex-col justify-start px-3 py-6 overflow-y-auto shadow-md ">
        <Button
          className={cn(
            "transition-transform ease-in-out duration-300 mb-1 justify-start",
            sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
          )}
          variant="link"
          asChild
        >
          <Link href="/" className="flex ">
           
            <img src="/logo.svg"  alt="Logo" className={cn(
                "font-bold  transition-[transform,opacity,display] ease-in-out duration-300 h-[41px] w-[131px]",
                sidebar?.isOpen === false
                  ? "-translate-x-96 opacity-0 hidden"
                  : "translate-x-0 opacity-100"
              )}/>
         
          </Link>
        </Button>
        <Menu isOpen={sidebar?.isOpen} />
      </div>
    </aside>
  );
}
