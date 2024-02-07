"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { InvitationCreateForm } from "./invitation-create-form";
import { UserOrganization } from "@/types/organization";

interface Props {
  passChildData: (data: string) => void;
  isOpen: boolean;
  onClose: () => void;
  user_id: number;
  organization_id: number;
  organizationmembers: UserOrganization[];

}

export default function CreateInvitationSheet({ passChildData, isOpen, onClose, user_id, organization_id, organizationmembers }: Props) {
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
          <SheetTitle>Create an Invitation</SheetTitle>
          <SheetDescription>
            Send an invitation mail
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2">
          <InvitationCreateForm passChildData={handleChildData} user_id={user_id} organization_id={organization_id} organizationmembers={organizationmembers}/>
        </div>
      </SheetContent>
    </Sheet>
  );
}
