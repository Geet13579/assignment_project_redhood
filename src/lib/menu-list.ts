import {
  LucideIcon,
  CirclePause,
  ChartNoAxesCombined,
  CarTaxiFront,
  MessageSquareMore,
  Building2,
  LayoutGrid
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
  value?: string;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {

  
  return [
    {
      groupLabel: "",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: []
        },
        {
          href: "/paused",
          label: "Product",
          active: pathname.includes("/product"),
          icon: CirclePause,
          submenus: []
        },
        {
          href: "/cre-report",
          label: "CRE Report",
          active: pathname.includes("/cre-report"),
          icon: ChartNoAxesCombined,
          submenus: []
        },

        {
          href: "/mishaps",
          label: "Mishaps",
          active: pathname.includes("/Mishaps"),
          icon: CarTaxiFront,
          submenus: []
        },


        {
          href: "#/",
          label: "Message",
          active: pathname.includes("/Message"),
          icon: MessageSquareMore,
          submenus: []
        },
        {
          href: "/escalation-matrix",
          label: "Escalation Matrix",
          active: pathname.includes("/escalation-matrix"),
          icon: Building2,
          submenus: []
        },
      ]
    },
  
  ];
}
