"use client";

import {
  Building2,
  FolderKanban,
  LayoutDashboard,
  ShieldCheck,
  Bot,
  CloudCog,
} from "lucide-react";

import { SidebarItem } from "./sidebar-item";

const guestRoutes = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: Building2,
    label: "Organizations",
    href: "/organizations",
  },
  {
    icon: FolderKanban,
    label: "Projects",
    href: "/projects",
  },
  {
    icon: ShieldCheck,
    label: "Tests",
    href: "/tests",
  },
  {
    icon: Bot,
    label: "APIs",
    href: "/apis",
    children: [
      {
        icon: Bot,
        label: "APIs",
        href: "/apis",
      },
      {
        icon: CloudCog,
        label: "API Providers",
        href: "/apis/providers",
      },
    ],
  },
];

export const SidebarRoutes = () => {
  return (
    <div className="flex flex-col w-full">
      {guestRoutes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        >
          {route.children?.map((child) => (
            <SidebarItem
              key={child.href}
              icon={child.icon}
              label={child.label}
              href={child.href}
            />
          ))}
        </SidebarItem>
      ))}
    </div>
  );
};
