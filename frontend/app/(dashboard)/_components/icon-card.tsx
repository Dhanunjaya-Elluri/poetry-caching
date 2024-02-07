import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React, { ReactNode } from "react";

interface IconCardProps {
  title: string;
  children?: ReactNode;
  icon?: ReactNode;
}

const IconCard: React.FC<IconCardProps> = ({ icon, title, children }) => {
  if (!title) {
    return null; // Return null if title is empty
  }

  return (
    <div className="flex w-full rounded-l space-y-2">
      <Card className="grow w-full">
        <CardHeader className="p-4">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">{title}</span>
            <div className="flex-shrink-0">{icon}</div>
          </div>
        </CardHeader>
        <CardContent className="justify-between">
          <div>{children}</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IconCard;
