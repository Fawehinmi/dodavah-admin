import { Drawer, Modal, message, Popconfirm, App } from "antd";
import React, { use, useEffect, useState } from "react";
import ApButton from "../../components/button";
import { ApImage } from "../../components/image";
import { ApSearchInput } from "../../components/input";
import ApTable from "../../components/table";
import { useOrderState } from "./context";
import { IOrder, IOrderFilter } from "./model";
import moment from "moment";

const limit = 5;

const OrderPage = () => {
  // States

  const { loading, orders, totalRecords, fetchOrders, updateStatus } =
    useOrderState();
    

    const [modal, setModal] = useState<{open: boolean, data?: any}>({open: false})

  const [filter, setFilter] = useState<IOrderFilter>({ skip: 0 });

  useEffect(() => {
    fetchOrders({ ...filter });
  }, [filter]);

  // Table Header column

  const columns = [
    {
      title: "Ref",
      dataIndex: "ref",
    },

    {
      title: "Contact Name",
      dataIndex: "contactName",
    },
    {
      title: "Contact Phone",
      dataIndex: "contactPhone",
    },

    {
      title: "Total Amount",
      dataIndex: "totalPrice",
      render: (_: any, record: IOrder) => {
        return <p>₦ {record.totalPrice}</p>;
      },
    },
    {
      title: "Date",
      dataIndex: "totalPrice",
      render: (_: any, record: IOrder) => {
        return <p>{moment(+record.createdAt).format("MMMM, D, YYYY")}</p>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "",
      dataIndex: "",
      render: (_: any, record: IOrder) => {
        return (
          <div>
            <ApButton
              className="hover:text-cyan-500 text-gray-400 border px-4 py-1 hover:border-cyan-500 border-gray-400 rounded-full"
              name="View Detail"
              onClick={() => {
                setModal({ open: true, data: record });
              }}
            />
          </div>
        );
      },
    },
  ];

  return (
    <App>
      <div className="bg-white m-1 ">
        <div className="flex justify-end gap-4 px-4 py-6">
          <ApSearchInput
            onSearchChange={(val: any) =>
              setFilter({ ...filter, keyword: val })
            }
            className="border hover:border-blue-400 focus:border-blue-400 focus:outline-none  border-gray-300 rounded-full w-80 px-4 py-1 "
            placeholder="Search Order"
          />
        </div>
        <ApTable
          columns={columns}
          dataSource={orders}
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
  <Modal
          title={"Order Detail"}
          closable={true}
          okButtonProps={{ hidden: true}}
          // onClose={() => setModal({ open: false })}
          open={modal.open}
          onCancel={() => setModal({open: false})}
          maskClosable={false}
        >
         <div><p>Coming sooon.....</p></div>
        </Modal>
      </div>
    </App>
  );
};

export default OrderPage;
