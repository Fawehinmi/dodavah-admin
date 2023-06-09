import React, { useState } from "react";
import { fileSvc } from "../../services/file";
interface IProps {
  inputId?: string;
  className?: string;
  accept?: string;
  multiple?: boolean;
  title?: string;
  onSelected: (files: Array<any>) => void;
}

export const ApFileInput: React.FC<IProps> = (props: IProps) => {
  const {
    onSelected,
    multiple,
    className,
    accept,
    inputId = "file-upload",
  } = props;
  const handleOnChange = async (e: any) => {
    const fls = e.target.files;

    if (fls && fls.length > 0) {
      let files = [];
      for await (const f of fls) {
        files.push({
          uri: await fileSvc.fileToBase64(f),
          file: f,
        });
      }
      onSelected(files);
    }
  };

  return (
    <div className="">
      <label className={`${className}`} htmlFor={inputId}>
        {props.title || "Upload Images"}
        <input
          id={inputId}
          type="file"
          name="file"
          multiple={multiple}
          accept={accept}
          className="hide hidden"
          onChange={handleOnChange}
        />
      </label>
    </div>
  );
};
