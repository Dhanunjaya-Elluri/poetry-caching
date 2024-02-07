"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ProjectCreateForm } from "./project-create-form";

interface Props {
  passChildData: (data: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateProjectSheet({ passChildData, isOpen, onClose }: Props) {
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
          <SheetTitle>Create a Project</SheetTitle>
          <SheetDescription>Create a new project.</SheetDescription>
        </SheetHeader>
        <div className="mt-2">
          <ProjectCreateForm passChildData={handleChildData} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
