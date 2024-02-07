"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { UpdateMemberForm } from "./update-member-form";
import { UserOrganization } from "@/types/organization";

interface Props {
  passChildData: (data: string) => void;
  isOpen: boolean;
  onClose: () => void;
  user_organization: UserOrganization | null;
  refetchUserGroups:any;
}

export default function UpdateMemberGroups({ passChildData, isOpen, onClose, user_organization, refetchUserGroups}: Props) {
    function handleChildData(data: string) {
        if (data === "") return;
        if (data === "success") {
            onClose();
            passChildData(data);
            refetchUserGroups();
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
          <SheetTitle>Update User Group</SheetTitle>
          <SheetDescription>
            Update a member groups organization
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2">
          <UpdateMemberForm passChildData={handleChildData} user_organization={user_organization} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
