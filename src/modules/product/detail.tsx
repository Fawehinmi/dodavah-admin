import { Form, Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import ApButton from "../../components/button";
import { ApFileInput } from "../../components/file/File";
import { ApSelectInput } from "../../components/input/SelectInput";
import ApTextInput from "../../components/input/TextInput";
import { useCategoryState } from "../category/context";
import { useProductState } from "./context";
import { ProductImg } from "./img";
import { IProduct, IProductFiles } from "./model";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Product Name Required"),
  categoryId: Yup.string().required("Category Required"),
  quantity: Yup.string().required("Quantity Required"),
  price: Yup.number().required("Price Required"),
  detail: Yup.string().required("Detail Required"),
  priceBefore: Yup.number()
    .required("Price Before is Required")
    .moreThan(
      Yup.ref("price"),
      "Price before should be more than current price"
    ),
});
interface IProps {
  product: IProduct;
  onUpdate: (message: string) => void;
}

const ProductDetail: React.FC<IProps> = ({ product, onUpdate }) => {
  const [files, setFiles] = useState<IProductFiles[]>([]);

  const { saveProduct, loading } = useProductState();

  const { categories } = useCategoryState();

  const handleSubmit = async (values: any, actions: any) => {
    const payload = {
      ...values,
      price: +values.price,
      priceBefore: +values.priceBefore,
      quantity: +values.quantity,
      files,
    };

    let rs = null;

    if (product?._id) {
      rs = await saveProduct(payload, product?._id);
    } else {
      rs = await saveProduct(payload);
    }

    console.log(rs);

    if (rs && onUpdate) {
      onUpdate(`Product ${product?._id ? "Updated" : "Created"}`);
    }
  };

  const handleProductImage = (res: any) => {
    setFiles([
      ...files,
      {
        filename: res[0].file.name,
        base64Str: res[0].uri,
        filetype: res[0].file.type,
      },
    ]);
  };

  const handleDeleteImg = (index: number) => {
    setFiles(files.filter((f, i) => i != index));
  };

  useEffect(() => {
    if (product?.images && !!product.images.length) {
      setFiles(
        product.images.map((i: any, index: number) => ({
          base64Str: i.uri,
          filename: i.name,
          filetype: i.type,
        }))
      );
    }
  }, [product]);
  return (
    <>
      <Formik
        initialValues={{
          name: product?.name || "",
          detail: product?.detail || "",
          price: product?.price || "",
          priceBefore: product?.priceBefore || "",
          quantity: product?.quantity || "",
          categoryId: product?.categoryId || "",
        }}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form className=" pb-2 ">
            <div className="input-container">
              <ApTextInput
                label="Product Name"
                name="name"
                type="text"
                className=""
              />
            </div>
            <div className="input-container">
              <ApTextInput
                label="Detail"
                name="detail"
                type="textarea"
                className=""
              />
            </div>

            <div className="input-container">
              <ApSelectInput
                label="Category"
                name="categoryId"
                className="w-full mt-2"
                containerClassName="w-full"
                options={[
                  { value: "", label: "", disabled: true },
                  ...categories.map((c) => {
                    return {
                      value: c._id,
                      label: c.name,
                    };
                  }),
                ]}
              />
            </div>

            <div className="input-container">
              <ApTextInput
                label="Quantity"
                name="quantity"
                type="text"
                className=""
              />
            </div>

            <div className="input-container">
              <ApTextInput
                label="Price"
                name="price"
                type="text"
                className=""
              />
            </div>
            <div className="input-container">
              <ApTextInput
                label="Price Before"
                name="priceBefore"
                type="text"
                className=""
                // disabled
              />
            </div>

            <div className="pb-2">
              <h1 className=" pb-2 font-semibold text-lg">Photos</h1>
              <div className="w-full border border-gray-400 border-dashed p-4">
                <div
                  className={` min-h-40 m-auto gap-4 items-center justify-center ${
                    files.length ? "grid grid-cols-2 " : "flex"
                  }`}
                >
                  {files.length ? (
                    files?.map((img, i) => (
                      <ProductImg
                        img={img}
                        key={i}
                        deleteImage={() => handleDeleteImg(i)}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 text-center">
                      Click button below to upload Image
                    </p>
                  )}
                </div>
              </div>
              <ApFileInput
                accept={"image/*"}
                className="text-cyan-500"
                onSelected={(res: any) => {
                  if (res) {
                    handleProductImage(res);
                  }
                }}
              />
            </div>

            <div className="flex items-center pt-5">
              <ApButton
                htmlType="submit"
                className="bg-rose-400 px-3 py-1 rounded-md hover:bg-rose-500 font-semibold hover:border-none text-white"
                name="Submit"
                loading={loading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ProductDetail;
