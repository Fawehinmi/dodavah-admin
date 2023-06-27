import React, { useEffect, useState } from "react";
import { toastSvc } from "../../services";
import { useLazyOrderPage, useUpdateOrderStatus } from "./gql/query";
import { IOrder, IOrderFilter, OrderStatusType } from "./model";

interface IOrderState {
  loading: boolean;
  orders: IOrder[];
  totalRecords: number;

  updateStatus: (ord: IOrder, status: OrderStatusType) => void;
  fetchOrders: (page: IOrderFilter) => void;
}

const OrderContext = React.createContext<IOrderState>({
  loading: false,
  orders: [],
  totalRecords: 0,

  updateStatus(ord: IOrder, status: OrderStatusType) {},
  fetchOrders(page) {},
});

const useOrderState = () => {
  const context = React.useContext(OrderContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}

const OrderContextProvider: React.FC<IProps> = ({ children }) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const limit = 20;

  //  Queries and Mutations ---------------

  const [updateOrderStatus] = useUpdateOrderStatus((rs: any) => {
    toastSvc.success("Order Status Updated");
  });

  const fetchOrdersPage = useLazyOrderPage((rs) => {
    setOrders(rs.data);
    setTotalRecords(rs.totalRecords);
  });

  // Hooks ----------------

  const updateStatus = (ord: IOrder, status: OrderStatusType) => {
    updateOrderStatus({
      variables: { orderId: ord._id, status },
    }).then((rs: any) => {
      setOrders(
        orders.map((o) => {
          return o._id === ord._id ? { ...o, status } : o;
        })
      );
    });
  };

  const fetchOrders = (filter: IOrderFilter) => {
    setLoading(true);
    fetchOrdersPage[0]({
      variables: {
        page: {
          skip: filter.skip,
          take: filter.take || limit,
          keyword: filter.keyword,
        },
      },
    }).finally(() => {
      setLoading(false);
    });
  };

  return (
    <OrderContext.Provider
      value={{
        loading,
        orders,
        totalRecords,
        updateStatus,
        fetchOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContextProvider, useOrderState };
