import { Select } from "antd";
import React, { useEffect, useState } from "react";

interface IProps {
  className: string;
  options: Array<{ value: string; label: string }> | any;
  onSelectChange: (value: string | undefined) => void;
}

export const ApSelectSearch: React.FC<IProps> = ({ ...props }) => {
  const { className, onSelectChange, options } = props;
  const [val, setval] = useState<string>();
  useEffect(() => {
    let timeout = setTimeout(() => {
      if (val !== null) onSelectChange(val?.toLowerCase());
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [val]);
  return (
    <Select
      defaultValue={options[0]?.value}
      {...props}
      onChange={(e: any) => {
        setval(e);
      }}
      className={className}
    />
  );
};
