import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { ApImage } from "../../components/image";
import { IProductFiles } from "./model";

interface Image {
  img: IProductFiles;
  deleteImage: () => void;
}

export const ProductImg: React.FC<Image> = ({ img, deleteImage }) => {
  return (
    <div className="w-full h-32 group relative">
      <ApImage src={img.base64Str} alt="" className="full-image object-cover" />
      <div className="absolute flex items-center justify-center top-0 left-0 opacity-0 duration-500 h-0 w-0 bg-gray-800 group-hover:opacity-50 group-hover:h-full group-hover:w-full ">
        <button
          onClick={deleteImage}
          className="bg-white px-2 rounded-md py-1 text-black"
        >
          Delete
        </button>
      </div>
    </div>
  );
};
