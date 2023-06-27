import Image, { ImageProps } from "next/image";
import React from "react";

interface IProps extends ImageProps {}

export const ApImage: React.FC<IProps> = (props: IProps) => {
  return (
    <Image
      layout="responsive"
      objectFit="contain"
      width={props.width || 200}
      height={props.width || 200}
      {...props}
      alt="image"
    />
  );
};
