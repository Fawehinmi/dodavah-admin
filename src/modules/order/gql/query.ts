import { useMutation, useLazyQuery } from "@apollo/client";
import gql from "graphql-tag";
import { toastSvc } from "../../../services";
import { OrderFragment } from "./fragment";

const UPDATE_ORDER_STATUS = gql`
  mutation updateOrderStatus($orderId: String!, $status: String!) {
    updateOrderStatus(orderId: $orderId, status: $status)
  }
`;

export const useUpdateOrderStatus = (onCompleted: any) => {
  return useMutation(UPDATE_ORDER_STATUS, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      if (res.updateOrderStatus) {
        onCompleted(res.updateOrderStatus);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const ORDER_PAGE = gql`
  query orderPage($page: OrderPageInput!) {
    orderPage(page: $page) {
      totalRecords
      data {
        ...Order
      }
    }
  }
  ${OrderFragment}
`;

export const useLazyOrderPage = (callback: (data: any) => void) => {
  return useLazyQuery(ORDER_PAGE, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      if (res?.orderPage) {
        callback(res?.orderPage);
      }
    },
    onError: (err) => {},
  });
};

// const FIND_ORDER = gql`
//   query findOrder($order: OrderQueryInput!) {
//     findOrder(order: $order) {
//       ...Order
//     }
//   }
//   ${OrderFragment}
// `;

// export const findOrderAsync = async (ref: string, token?: string) => {
//   return (await graphClient(token))
//     .request(FIND_ORDER, { order: { ref } })
//     .then((res) => {
//       return res.findOrder;
//     });
// };
