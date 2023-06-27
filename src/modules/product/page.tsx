import { App, Drawer, message, Modal, Popconfirm } from "antd";
import React, { use, useEffect, useState } from "react";
import ApButton from "../../components/button";
import { ApImage } from "../../components/image";
import { ApSelectSearch } from "../../components/input";
import { ApSearchInput } from "../../components/input/search";
import { ApSelectInput } from "../../components/input/SelectInput";
import ApTable from "../../components/table";
import { useCategoryState } from "../category/context";
import { useProductState } from "./context";
import ProductDetail from "./detail";
import { useCreateProduct } from "./gql/query";
import { IProduct, IProductFilter } from "./model";

const limit = 5;

const ProductsPage = () => {
  // States

  const { products, totalRecords, fetchProductPage, loading, deleteProduct } =
    useProductState();
  const { fetchCategoryPage, categories } = useCategoryState();

  const [modal, setModal] = useState<{ open: boolean; data?: any }>({
    open: false,
  });

  const [filter, setFilter] = useState<IProductFilter>({ skip: 0 });

  // Custom Hooks

  useEffect(() => {
    fetchCategoryPage({ skip: 0 });
  }, []);
  useEffect(() => {
    fetchProductPage({ ...filter });
  }, [filter]);

  // Table Header column

  const columns = [
    {
      title: "",
      dataIndex: "image",
      render: (_: any, record: IProduct) => {
        return (
          <div className="w-36 h-28">
            <ApImage
              src={record.images[0]?.uri}
              alt="Product Image"
              className="full-image object-cover"
            />
          </div>
        );
      },
    },
    {
      title: "Name",
      dataIndex: "name",
      width: "200",
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
    },

    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Price Before",
      dataIndex: "priceBefore",
    },

    {
      title: "Actions",
      dataIndex: "actions",
      render: (_: any, record: IProduct) => {
        return (
          <div>
            <div className="flex  gap-2  justify-start ">
              <Popconfirm
                placement="top"
                title={"Delete Product"}
                description={
                  "Are you sure you want to delete Product?. Action cannot be reversed"
                }
                onConfirm={async () => {
                  await deleteProduct(record?._id);
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

  return (
    <App>
      <div className="bg-white m-1">
        <div className="flex justify-end gap-4 px-4 py-6">
          <ApSelectSearch
            options={[
              { value: "", label: "All", disabled: false },
              ...categories.map((c) => {
                return {
                  value: c._id,
                  label: c.name,
                  key: c._id,
                };
              }),
            ]}
            onSelectChange={(val: any) =>
              setFilter({ ...filter, categoryId: val, skip: 0 })
            }
            className="w-60"
          />
          <ApSearchInput
            onSearchChange={(val: any) =>
              setFilter({ ...filter, keyword: val, skip: 0 })
            }
            className="border border-gray-300 hover:border-gray-600 hover:border rounded-lg w-60 px-4"
            placeholder="Search Product"
          />
          <ApButton
            name="New Product"
            className="bg-rose-400 px-3 py-1 rounded-md hover:bg-rose-500 font-semibold hover:border-none text-white"
            onClick={() => setModal({ open: true })}
          />
        </div>
        <ApTable
          columns={columns}
          className="text-center h-[100vh]"
          dataSource={products.map((p) => {
            return { ...p, key: p._id };
          })}
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

      {modal.open && (
        <Drawer
          title={modal.data ? "Update Product" : "Create Product"}
          placement={"right"}
          closable={true}
          onClose={() => setModal({ open: false, data: null })}
          open={modal.open}
          maskClosable={false}
        >
          <ProductDetail
            product={modal.data}
            onUpdate={(message: string) => {
              setModal({ open: false, data: null });
            }}
          />
        </Drawer>
      )}
    </App>
  );
};

export default ProductsPage;
