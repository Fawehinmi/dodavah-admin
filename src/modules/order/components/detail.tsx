import React from "react";
import { IOrder } from "../model";
import { useOrderState } from "../context";
import helper from "../../../helper";

interface IProps {
  order: IOrder;
}

const OrderDetail: React.FC<IProps> = ({ order }) => {
  const { handleUpdateOrderStatus, handleCancelOrder } = useOrderState();
  const UpdateOrderStatus = (e: any) => {
    if (e.toLocaleUpperCase() == "CANCELLED") {
      handleCancelOrder(order);
    } else {
      handleUpdateOrderStatus(order, e.toLocaleUpperCase());
    }
  };
  return (
    <div className="w-full">
      <div className="flex gap-4">
        <div className="">
          <p>ITEMS</p>
          {order?.items?.map((i) => (
            <div className="flex gap-1">
              <p>{i.name}:</p>
              <p>{helper.toCurrency(i?.price)}</p>
            </div>
          ))}
        </div>
        <div className="flex gap-4 items-center">
          <p className="font-bold">Status: </p>
          <select
            onChange={(e) => UpdateOrderStatus(e.target.value)}
            value={order?.status?.toLocaleUpperCase()}
            className=" text-black text-sm px-2 py-2 w-64 rounded-sm  border "
            placeholder="Select"
          >
            <option value="NEW">New</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PACKED">Packed</option>
            <option value="SENDOUT">Sent Out</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Canceled</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex gap-4">
          <p>Sub Total:</p>
          <p>{helper.toCurrency(order.subTotal)}</p>
        </div>
        <div className="flex gap-4">
          <p>Tax:</p>
          <p>{helper.toCurrency(order.tax)}</p>
        </div>
        <div className="flex gap-4">
          <p>Total Price:</p>
          <p>{helper.toCurrency(order.totalAmount)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
