import { gql, useLazyQuery, useMutation } from "@apollo/client";
import { toastSvc } from "../../../services";

import { CategoryFragment } from "./fragment";

const CATEGORY_PAGE = gql`
  query productCategoryPage($page: ProductCategoryPageInput!) {
    productCategoryPage(page: $page) {
      totalRecords
      data {
        ...Category
      }
    }
  }
  ${CategoryFragment}
`;

export const useCategoryPage = (onCompleted: any) => {
  return useLazyQuery(CATEGORY_PAGE, {
    fetchPolicy: "no-cache",
    onCompleted: (res) => {
      if (res?.productCategoryPage) {
        onCompleted(res?.productCategoryPage);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const CREATE_CATEGORY = gql`
  mutation createProductCategory($category: CreateProductCategoryInput!) {
    createProductCategory(category: $category) {
      ...Category
    }
  }
  ${CategoryFragment}
`;

export const useCreateCategory = (callback: any) => {
  return useMutation(CREATE_CATEGORY, {
    onCompleted: (res) => {
      if (res?.createProductCategory) {
        callback(res?.createProductCategory);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};
const UPDATE_CATEGORY = gql`
  mutation updateProductCategory(
    $id: String!
    $category: UpdateProductCategoryInput!
  ) {
    updateProductCategory(id: $id, category: $category) {
      ...Category
    }
  }
  ${CategoryFragment}
`;

export const useUpdateCategory = (callback: any) => {
  return useMutation(UPDATE_CATEGORY, {
    onCompleted: (res) => {
      if (res?.updateProductCategory) {
        callback(res?.updateProductCategory);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};

const DELETE_CATEGORY = gql`
  mutation deleteProductCategory($id: String!) {
    deleteProductCategory(id: $id)
  }
`;

export const useDeleteProductCategory = (callback: any) => {
  return useMutation(DELETE_CATEGORY, {
    onCompleted: (res) => {
      if (res.deleteProductCategory) {
        callback(res.deleteProductCategory);
      }
    },
    onError: (err) => {
      toastSvc.graphQlError(err);
    },
  });
};
