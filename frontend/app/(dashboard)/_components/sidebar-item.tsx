"use client";

import { LucideIcon, MoreHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive =
    (pathname === "/" && href === "/") ||
    pathname === href ||
    pathname?.startsWith(`${href}/`);

  const onClick = () => {
    router.push(href);
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "flex items-center gap-x-2 text-slate-200 text-sm font-[500] pl-6 transition-all hover:text-slate-200 hover:bg-slate-300/20",
        isActive &&
          "text-validaitorBlue bg-sky-200/20 hover:bg-sky-200/20 hover:text-validaitorBlue"
      )}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={22}
          className={cn("text-slate-200", isActive && "text-validaitorBlue")}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-validaitorBlue h-full transition-all",
          isActive && "opacity-100"
        )}
      />
    </button>
  );
};
