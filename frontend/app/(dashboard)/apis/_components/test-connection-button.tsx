import React from "react";
import { Button } from "@/components/ui/button";
import { CheckCheck } from "lucide-react";
import { X } from "lucide-react";

interface ProcessingButtonProps {
  status: string;
  isChecking: boolean;
  onClick: () => void;
}

const ProcessingButton: React.FC<ProcessingButtonProps> = ({
  status,
  isChecking,
  onClick,
}) => {
  if (status === "") {
    return (
      <Button
        variant="secondary"
        type="button"
        disabled={isChecking}
        onClick={onClick}
      >
        Test Connection
      </Button>
    );
  }

  return (
    <div>
      <Button
        variant="secondary"
        type="button"
        disabled={isChecking}
        onClick={onClick}
      >
        {isChecking ? (
          <div className="flex items-center">
            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10z"
              ></path>
            </svg>
            Processing...
          </div>
        ) : (
          <div hidden={isChecking || status === ""}>Test Connection</div>
        )}
      </Button>
      <div className="mt-2">
        {status === "success" ? (
          <div className="flex flex-row text-green-500 text-center align-middle">
            <CheckCheck size={18} />
            <span className="ml-2 text-center align-self-auto ">Success</span>
          </div>
        ) : (
          <div className="flex flex-row text-red-500 text-center align-middle">
            <X size={18} className="mt-1"/>
            <span className="ml-2">Failed</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessingButton;
