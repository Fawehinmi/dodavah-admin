import { Form, Formik, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";

import ApButton from "../../components/button";
import { ApFileInput } from "../../components/file/File";
import { ApSelectInput } from "../../components/input/SelectInput";
import ApTextInput from "../../components/input/TextInput";
import { useCategoryState } from "./context";
import { CategoryImg } from "./img";
import { ICategory, ICategoryFile } from "./model";

const FormSchema = Yup.object().shape({
  name: Yup.string().required("Category Name Required"),
});
interface IProps {
  category: ICategory;
  onUpdate: (message: string) => void;
}

const CategoryDetail: React.FC<IProps> = ({ category, onUpdate }) => {
  const [showDiscount, setShowDiscount] = useState<boolean>(false);
  const [file, setFile] = useState<ICategoryFile>({} as any);

  const { saveCategory, saveLoading } = useCategoryState();

  const handleSubmit = async (values: any, actions: any) => {
    const payload = { ...values, file };

    let rs = null;

    if (category?._id) {
      rs = await saveCategory(payload, category?._id);
    } else {
      rs = await saveCategory(payload);
    }

    if (rs && onUpdate) {
      onUpdate(`Category ${category?._id ? "Updated" : "Created"}`);
    }
  };
  const handleCategoryImage = (res: any) => {
    setFile({
      filename: res[0].file.name,
      base64Str: res[0].uri,
      filetype: res[0].file.type,
    });
  };
  const handleDeleteImg = () => {
    setFile({} as any);
  };

  useEffect(() => {
    if (category?.image && !!category.image?.uri) {
      setFile({
        base64Str: category.image.uri,
        filename: category?.image?.name,
        filetype: category?.image?.type,
      });
    }
  }, [category]);
  return (
    <>
      <Formik
        initialValues={{
          name: category?.name || "",
        }}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {(props: FormikProps<any>) => (
          <Form className=" py-2 ">
            <div className="input-container">
              <ApTextInput
                label="Category Name"
                name="name"
                type="text"
                className=""
              />
            </div>
            <div className="pb-2">
              <h1 className=" pb-2 font-semibold text-lg">Photos</h1>
              <div className="w-full border min-h-70 border-gray-400 border-dashed p-4">
                <div
                  className={` min-h-40 m-auto gap-4 items-center justify-center flex"
                  }`}
                >
                  {file.base64Str ? (
                    <>
                      <CategoryImg
                        img={file}
                        deleteImage={() => handleDeleteImg()}
                      />
                    </>
                  ) : (
                    <p className="text-gray-400 text-center">
                      Click button below to upload Image
                    </p>
                  )}
                </div>
              </div>
              <ApFileInput
                accept={"image/*"}
                title="Upload Image"
                className="text-cyan-500"
                onSelected={(res: any) => {
                  if (res) {
                    handleCategoryImage(res);
                  }
                }}
              />
            </div>

            <div className="flex items-center pt-5">
              <ApButton
                htmlType="submit"
                className="bg-rose-400 px-3 py-1 rounded-md hover:bg-rose-500 font-semibold hover:border-none text-white"
                name="Submit"
                loading={saveLoading}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CategoryDetail;
