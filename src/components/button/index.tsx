import React from "react";

interface IProps {
  name: string;
  className: string;
  loading?: boolean;
  htmlType?: "submit" | "button";
  variant?: "contained" | "text" | "outlined";
  onClick?: () => void;
  // props?: {
  //   [x: string]: any;
  // };
}
const ApButton: React.FC<IProps> = ({
  name,
  className,
  loading = false,
  htmlType,
  onClick,
  ...props
}) => {
  return (
    <button
      // loading={loading}
      disabled={loading}
      type={htmlType}
      onClick={onClick}
      className={className}
      {...props}
    >
      <span>{loading? "Loading..." : name}</span>
    </button>
  );
};

export default ApButton;
