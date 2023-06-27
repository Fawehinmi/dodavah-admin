import { useSession } from "next-auth/react";
import { resolve } from "node:path/win32";
import React, { createContext, useState } from "react";
import { toastSvc } from "../../services";
import {
  useCreateProduct,
  useDeleteProduct,
  useProductPage,
  useUpdateProduct,
} from "./gql/query";
import { IProduct, IProductFilter } from "./model";

interface IProductState {
  loading: boolean;
  products: IProduct[];
  totalRecords: number;
  fetchProductPage: (page: IProductFilter) => void;
  deleteProduct: (prodId?: string) => Promise<boolean>;
  saveProduct: (values: any, id?: string) => Promise<IProduct>;
}

const ProductContext = createContext<IProductState>({
  loading: false,
  products: [],
  totalRecords: 0,
  fetchProductPage(page) {},
  deleteProduct(prodId) {
    return null as any;
  },
  saveProduct(values, id) {
    return null as any;
  },
});

export const useProductState = () => {
  const context = React.useContext(ProductContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}

const limit = 5;

export const ProductContextProvider: React.FC<IProps> = ({ children }) => {
  // const [product, setProduct] = useState<IProduct>() as any;
  const [products, setProducts] = useState<IProduct[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);

  const [fetchPageQuery, {}] = useProductPage((res: any) => {
    setProducts(res.data);
    setTotalRecords(res.totalRecords);
  });

  const deleteQuery = useDeleteProduct((res: any) => {
    toastSvc.success("Product deleted");
  });

  const updateQuery = useUpdateProduct((res: any) => {
    toastSvc.success("Product Updated");
  });

  const createQuery = useCreateProduct((res: any) => {
    toastSvc.success("Product Created");
  });

  const fetchProductPage = (page: IProductFilter) => {
    setLoading(true);

    fetchPageQuery({
      variables: {
        page: {
          ...page,
          take: limit,
        },
      },
    }).finally(() => {
      setLoading(false)
    });
  };

  const createProduct = async (product: IProduct) => {
    const res = await createQuery[0]({
      variables: {
        product,
      },
    });
    const prod = res?.data?.createProduct;
    if (prod) {
      setProducts([prod, ...products]);
      setTotalRecords(totalRecords + 1);
      return prod;
    }
  };

  const updateProduct = (id: string, product: IProduct) => {
    setLoading(true);
    return updateQuery[0]({
      variables: {
        id,
        product,
      },
    }).then((res) => {
      const prod = res.data?.updateProduct;
      if (prod) {
        setProducts(
          products.map((product) => (product._id == prod._id ? prod : product))
        );
        setLoading(false);
        return prod;
      }
      setLoading(false);
    });
  };

  const saveProduct = (values: IProduct, id?: string): Promise<IProduct> => {
    if (id) {
      return new Promise((resolve, reject) => {
        let req = updateProduct(id, values);
        resolve(req);
      });
    } else {
      return new Promise((resolve, reject) => {
        let req = createProduct(values);

        resolve(req);
      });
    }
  };

  const deleteProduct = (prodId?: string): Promise<boolean> => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      deleteQuery[0]({ variables: { id: prodId } })
        .then((rs) => {
          if (rs.data.deleteProduct) {
            setProducts(products.filter((item) => item._id !== prodId));
            setTotalRecords(totalRecords - 1);
            resolve(rs.data.deleteProduct);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <ProductContext.Provider
      value={{
        loading,
        products,
        fetchProductPage,
        totalRecords,
        deleteProduct,
        saveProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
