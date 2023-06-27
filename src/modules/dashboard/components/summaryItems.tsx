import React from "react";

interface IProps {
  name: string;
  className: string;
  value: string;
  isIncrease?: boolean;
  percentage?: string;
  children: React.ReactNode;
}

const DashBoardSummaryItem: React.FC<IProps> = ({
  name,
  className,
  value,
  children,
  percentage,
  isIncrease,
}) => {
  return (
    <div className={className}>
      <div
        className={`flex justify-${
          percentage ? "between" : "end"
        } items-center`}
      >
        {children}
        {percentage && (
          <p
            className={`text-${
              isIncrease === true ? "green" : "red"
            } font-semibold`}
          >
            {`${isIncrease === true ? "+" : "-"}${percentage}%`}
          </p>
        )}
      </div>

      <p className="text-textBlue font-bold mt-2 tracking-wide">{value}</p>
      <p className="mt-2 text-textBlue font-bold  opacity-40">{name}</p>
    </div>
  );
};

export default DashBoardSummaryItem;
