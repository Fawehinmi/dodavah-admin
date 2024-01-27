import { useSession } from "next-auth/react";
import React, { createContext, useState } from "react";
import { toastSvc } from "../../services";
import {
  useCreateCategory,
  useDeleteProductCategory,
  useCategoryPage,
  useUpdateCategory,
} from "./gql/query";
import { ICategory, ICategoryFilter } from "./model";

interface ICategoryState {
  loading: boolean;
  saveLoading: boolean;
  categories: ICategory[];
  totalRecords: number;
  fetchCategoryPage: (page: ICategoryFilter) => void;
  deleteCategory: (catId?: string) => Promise<boolean>;
  saveCategory: (values: any, id?: string) => Promise<ICategory>;
}

const CategoryContext = createContext<ICategoryState>({
  loading: false,
  saveLoading: false,
  categories: [],
  totalRecords: 0,
  fetchCategoryPage(page) {},
  deleteCategory(catId) {
    return null as any;
  },
  saveCategory(values, id) {
    return null as any;
  },
});

export const useCategoryState = () => {
  const context = React.useContext(CategoryContext);
  if (context === undefined) {
    throw new Error("app dispatch must be used within app global provider");
  }

  return context;
};

interface IProps {
  children: React.ReactNode;
}

const limit = 10;

export const CategoryContextProvider: React.FC<IProps> = ({ children }) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const [fetchPageQuery, {}] = useCategoryPage((res: any) => {
    setCategories(res.data);
    setTotalRecords(res.totalRecords);
  });

  const deleteQuery = useDeleteProductCategory((res: any) => {
    toastSvc.success("Category deleted");
  });

  const updateQuery = useUpdateCategory((res: any) => {
    toastSvc.success("Category Updated");
  });

  const createQuery = useCreateCategory((res: any) => {});

  const fetchCategoryPage = (page: ICategoryFilter) => {
    setLoading(true);
    fetchPageQuery({
      variables: {
        page: {
          ...page,
          take: page?.take || limit,
        },
      },
    }).finally(() => setLoading(false));
  };

  const createCategory = async (category: ICategory) => {
    const res = await createQuery[0]({
      variables: {
        category,
      },
    });
    const prod = res?.data?.createProductCategory;
    if (prod) {
      setCategories([prod, ...categories]);
      setTotalRecords(totalRecords + 1);
      setSaveLoading(false);

      return prod;
    }
    setSaveLoading(false);
  };

  const updateCategory = async (id: string, category: ICategory) => {
    const res = await updateQuery[0]({
      variables: {
        id,
        category,
      },
    });
    const prod = res.data?.updateProductCategory;
    if (prod) {
      setCategories(
        categories.map((category_1) =>
          category_1._id == prod._id ? prod : category_1
        )
      );

      setSaveLoading(false);

      return prod;
    }
    setSaveLoading(false);
  };

  const saveCategory = (values: ICategory, id?: string): Promise<ICategory> => {
    setSaveLoading(true);
    if (id) {
      return new Promise((resolve, reject) => {
        let req = updateCategory(id, values);
        resolve(req);
      });
    } else {
      return new Promise((resolve, reject) => {
        let req = createCategory(values);

        resolve(req);
      });
    }
  };

  const deleteCategory = (catId?: string): Promise<boolean> => {
    setLoading(true);

    return new Promise((resolve, reject) => {
      deleteQuery[0]({ variables: { id: catId } })
        .then((rs) => {
          if (rs.data.deleteProductCategory) {
            setCategories(categories.filter((item) => item._id !== catId));
            setTotalRecords(totalRecords - 1);
            resolve(rs.data.deleteProductCategory);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return (
    <CategoryContext.Provider
      value={{
        loading,
        saveLoading,
        categories,
        fetchCategoryPage,
        totalRecords,
        deleteCategory,
        saveCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};
