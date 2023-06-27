export interface IProduct {
  _id: string;
  name: string;
  detail: string;
  quantity: number;
  price: number;
  priceBefore: number;
  category: string;
  categoryId: string;
  images: IProductImages[];
}

export interface IProductFilter {
  skip: number;
  keyword?: string;
  categoryId?: string;
}

export interface IProductFiles {
  base64Str: string;
  filename: string;
  filetype: string;
}

export interface IProductImages {
  uri: string;
  name: string;
  type: string;
  base64Str: string;
}
