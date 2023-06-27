import { Select } from "antd";
import { ErrorMessage, useField } from "formik";
import React from "react";

interface IProps {
  label?: string;
  name: string;
  className: string;
  containerClassName: string;
  options: Array<{ value: string; label: string }> | any;
}

export const ApSelectInput: React.FC<IProps> = ({
  containerClassName,
  ...props
}) => {
  const { label, options, name, className } = props;
  const [field, meta, { setValue }] = useField(name);

  return (
    <div className={containerClassName}>
      <label className="" htmlFor="email">
        {label}
      </label>

      <Select
        defaultValue={options[0]?.value}
        //   options={options
        {...field}
        {...props}
        onChange={(val: any) => {
          setValue(val);
        }}
        className={className}
      />

      {meta.error && <div className="input-error">{meta.error}</div>}
    </div>
  );
};
