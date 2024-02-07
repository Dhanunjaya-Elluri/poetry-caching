import React from 'react';

interface StatsCardValueProps {
  title: string;
  value: number | string;
  valueColor: string;
}

const StatsCardValue: React.FC<StatsCardValueProps> = ({ title, value, valueColor }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <span className={`text-4xl ${valueColor}`}>{value}</span>
      <span className="text-sm text-gray-500">{title}</span>
    </div>
  );
};

export default StatsCardValue;
