import {
   
  LayoutGrid,
  LucideIcon,
  CalendarDays,
 
  // CirclePause,
  // ChartNoAxesCombined,
  // CarTaxiFront,
  MessageSquareMore,
  History,
  Headset,
  UserPlus,
Star,
Cast,
SquarePlay
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
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

export function getMenuList(pathname: string, Profile:any): Group[] {

  // // console.log('Profile111', Profile)
  if (typeof window === "undefined") return []; // Ensure this only runs in the browser

  const isNPIUser = Profile?.user_type == "NPI";

  // // console.log('Profile?.user_type', Profile?.user_type)
  return [

    {
      groupLabel: "",
      menus: [
        {
          href: "",
          label: Profile?.name || "User",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [
              {
                href: "/posts",
                label: "All Posts"
              },
              {
                href: "/posts/new",
                label: "New Post"
              }
            ]
        },
        {
          href: "",
          label: "Switch to another Branch",
          active: pathname.includes("/Switch to another Branch"),
          icon: CalendarDays,
          submenus: [
            {
              href: "/posts",
              label: "All Posts"
            },
            {
              href: "/posts/new",
              label: "New Post"
            }
          ]
        },

        ...(isNPIUser
          ? [{
              href: "/add-employee",
              label: "Add New User",
              active: pathname.includes("/add-employee"),
              icon: UserPlus,
            }]
          : []),
        
        {
          href: "",
          label: "Training ( Coming Soon )",
          active: pathname.includes("/Training ( Coming Soon )"),
          icon: SquarePlay,
      
        },
      ]
    },

    {
      groupLabel: "Internal",
      menus: [
        {
          href: "/",
          label: "AnyDesk Connect",
          active: pathname.includes("/AnyDesk Connect"),
          icon: Cast,
          submenus: []
        },
        // {
        //   href: "/",
        //   label: "Review",
        //   active: pathname.includes("/Review"),
        //   icon: Star,
        //   submenus: []
        // },

        {
          href: "/",
          label: "Login History NPI (Coming Soon)",
          active: pathname.includes("/Login History NPI"),
          icon: History,
          submenus: []
        },


        {
          href: "/",
          label: "Feedback",
          active: pathname.includes("/Feedback"),
          icon: MessageSquareMore,
          submenus: []
        },
        {
          href: "/",
          label: "Connect to us ( Nexify )",
          active: pathname.includes("/Connect to us ( Nexify )"),
          icon: Headset,
          submenus: []
        },
      ]
    },
   
  ];
}
