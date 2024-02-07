"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { TestCreateForm } from "./test-create-form";

interface Props {
  passChildData: (data: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateTestSheet({
  passChildData,
  isOpen,
  onClose,
}: Props) {
  function handleChildData(data: string) {
    if (data === "") return;
    if (data === "success") {
      onClose();
      passChildData(data);
      return;
    } else {
      onClose();
      passChildData(data);
      return;
    }
  }
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] sm:w-[800px] overflow-y-auto h-screen max-h-full">
        <SheetHeader>
          <SheetTitle>Create a Test</SheetTitle>
          <SheetDescription>
            Create a new test for your LLM API.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-2">
          <TestCreateForm passChildData={handleChildData} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
