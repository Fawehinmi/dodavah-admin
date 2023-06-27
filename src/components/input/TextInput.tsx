// import { TextField } from "@mui/material";
import { Input } from "antd";
import { ErrorMessage, Field, useField } from "formik";
import React, { useEffect } from "react";

interface IProps {
  label?: string;
  name: string;
  type: string;
  className?: string;
  disabled?: boolean;
  labelClassName?: string;
  props?: {
    [x: string]: any;
  };
}

const ApTextInput: React.FC<IProps> = ({
  label,
  name,
  type,
  className,
  labelClassName,
  disabled,
  ...props
}) => {
  const [field, meta, helpers] = useField(name);

  return (
    <>
      <div className={labelClassName || "input-label"}>
        <label htmlFor={name}>{label}</label>
      </div>

      <Input
        className={className}
        id={name}
        {...field}
        {...props}
        type={type}
        status={meta.touched && meta.error ? "error" : undefined}
        disabled={disabled}
      />

      {meta.touched && meta.error ? (
        <div className="input-error">{meta.error}</div>
      ) : null}
    </>
  );
};

export default ApTextInput;
