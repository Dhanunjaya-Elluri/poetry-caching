"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { OrganizationCreateForm } from "./organization-create-form";

interface Props {
  passChildData: (data: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateOrganizationSheet({ passChildData, isOpen, onClose }: Props) {
    function handleChildData(data: string) {
        if (data === "") return;
        if (data === "success") {
            onClose();
            passChildData(data);
            return;
        }
        else {
            onClose();
            passChildData(data);
            return;
        }
        }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] sm:w-[800px]">
        <SheetHeader>
          <SheetTitle>Create a Organization</SheetTitle>
          <SheetDescription>Create a new Organization.</SheetDescription>
        </SheetHeader>
        <div className="mt-2">
          <OrganizationCreateForm passChildData={handleChildData} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
