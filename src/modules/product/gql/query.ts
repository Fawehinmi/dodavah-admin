import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { toastSvc } from "../../../services";

import { ProductFragment } from "./fragment";

const PRODUCT_PAGE = gql`
  query productPage($page: ProductPageInput!) {
    productPage(page: $page) {
      totalRecords
      data {
        ...Product
      }
    }
  }
  ${ProductFragment}
`;

export const useProductPage = (onCompleted: any) => {
  return useLazyQuery(PRODUCT_PAGE, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      if (res?.productPage) {
        onCompleted(res?.productPage);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const CREATE_PRODUCT = gql`
  mutation createProduct($product: CreateProductInput!) {
    createProduct(product: $product) {
      ...Product
    }
  }
  ${ProductFragment}
`;

export const useCreateProduct = (callback: any) => {
  return useMutation(CREATE_PRODUCT, {
    onCompleted: (res) => {
      if (res?.createProduct) {
        callback(res?.createProduct);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};
const UPDATE_PRODUCT = gql`
  mutation updateProduct($id: String!, $product: UpdateProductInput!) {
    updateProduct(id: $id, product: $product) {
      ...Product
    }
  }
  ${ProductFragment}
`;

export const useUpdateProduct = (callback: any) => {
  return useMutation(UPDATE_PRODUCT, {
    onCompleted: (res) => {
      if (res?.updateProduct) {
        callback(res?.updateProduct);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: String!) {
    deleteProduct(id: $id)
  }
`;

export const useDeleteProduct = (callback: any) => {
  return useMutation(DELETE_PRODUCT, {
    onCompleted: (res) => {
      if (res.deleteProduct) {
        callback(res.deleteProduct);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};
