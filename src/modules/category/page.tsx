import { Drawer, Modal, message, Popconfirm, App } from "antd";
import React, { use, useEffect, useState } from "react";
import ApButton from "../../components/button";
import { ApImage } from "../../components/image";
import { ApSearchInput } from "../../components/input";
import ApTable from "../../components/table";
import { useCategoryState } from "./context";
import CategoryDetail from "./detail";
import { useCreateCategory } from "./gql/query";
import { ICategory, ICategoryFilter } from "./model";

const limit = 5;

const CategoryPage = () => {
  // States

  const {
    categories,
    totalRecords,
    fetchCategoryPage,
    loading,
    deleteCategory,
  } = useCategoryState();

  const [modal, setModal] = useState<{ open: boolean; data?: any }>({
    open: false,
  });

  const [filter, setFilter] = useState<ICategoryFilter>({ skip: 0 });

  useEffect(() => {
    fetchCategoryPage({ ...filter });
  }, [filter]);

  // Table Header column

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (_: any, record: ICategory) => {
        return (
          <div className="w-36 h-28">
            <ApImage
              src={record.image?.uri}
              alt="Category Image"
              className="full-image object-cover"
            />
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: ICategory) => {
        return (
          <div>
            <div className="flex  gap-2  justify-start ">
              <Popconfirm
                placement="top"
                title={"Delete Category"}
                description={
                  "Are you sure you want to delete Category?. Action cannot be reversed"
                }
                onConfirm={async () => {
                  const rs = await deleteCategory(record?._id);
                  if (rs === true) success("Product deleted");
                }}
                okText="Yes"
                cancelText="No"
                okButtonProps={{ className: "bg-red-500 hover:bg-red-600" }}
              >
                <ApButton
                  name="Delete"
                  className=" text-red-500 cursor-pointer"
                />
              </Popconfirm>

              <ApButton
                className="text-cyan-500 "
                name="Edit"
                onClick={() => {
                  setModal({ open: true, data: record });
                }}
              />
            </div>
          </div>
        );
      },
    },
  ];

  const [messageApi, contextHolder] = message.useMessage();

  const success = (message: string) => {
    messageApi.open({
      type: "success",
      content: message,
      duration: 3,
    });
  };
  return (
    <App>
      {contextHolder}

      <div className="bg-white m-1 ">
        <div className="flex justify-end gap-4 px-4 py-6">
          <ApSearchInput
            onSearchChange={(val: any) =>
              setFilter({ ...filter, keyword: val })
            }
            className="border border-gray-300 hover:border-gray-600 hover:border rounded-lg w-60 px-4"
            placeholder="Search Category"
          />
          <ApButton
            name="New Category"
            className="bg-rose-400 px-3 py-1 rounded-md hover:bg-rose-500 font-semibold hover:border-none text-white"
            onClick={() => setModal({ open: true })}
          />
        </div>
        <ApTable
          columns={columns}
          dataSource={categories}
          pagination={{
            total: totalRecords,
            pageSize: 5,
            onChange: (page: any, pageSize: any) => {
              setFilter({ ...filter, skip: (page - 1) * limit });
            },
          }}
          scroll={{ y: 400 }}
          loading={loading}
        />
      </div>
      {modal?.open && (
        <Drawer
          title={modal.data ? "Update Category" : "Create Category"}
          placement={"right"}
          closable={true}
          onClose={() => setModal({ open: false })}
          open={modal.open}
          maskClosable={false}
        >
          <CategoryDetail
            category={modal.data}
            onUpdate={(message: string) => {
              setModal({ open: false, data: null });
            }}
          />
        </Drawer>
      )}
    </App>
  );
};

export default CategoryPage;
