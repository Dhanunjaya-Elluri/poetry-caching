import React from "react";
import Image from "next/image";

interface CardButtonProps {
  onClick: () => void;
  logos: string[];
  header: string;
  subHeader: string;
  description?: string;
}

const CardButton: React.FC<CardButtonProps> = ({
  onClick,
  logos,
  header,
  subHeader,
  description,
}) => {
  return (
    <div
      className="flex flex-col items-center justify-center w-full h-full p-4 bg-white rounded-lg shadow-md cursor-pointer hover:shadow-xl active:shadow-blue-500"
      onClick={onClick}
    >
      <div className="flex flex-row items-center justify-center w-full h-24">
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex flex-row items-center justify-center w-12 h-12 mr-2"
          >
            <Image src={logo} alt="logo" width={40} height={40} />
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center justify-center w-full h-24">
        <div className="text-2xl font-bold text-center text-gray-800">
          {header}
        </div>
        <div className="text-sm font-medium text-center text-gray-500">
          {subHeader}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-24">
        <div className="text-sm font-medium text-center text-gray-500">
          {description}
        </div>
      </div>
    </div>
  );
};

export default CardButton;
