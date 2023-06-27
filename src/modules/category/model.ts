export interface ICategoryFile {
  base64Str: string;
  filename: string;
  filetype: string;
}

export interface ICategoryImage {
  uri: string;
  name: string;
  type: string;
}

export interface ICategory {
  _id: string;
  name: string;
  image: ICategoryImage;
}

export interface ICategoryPageResp {
  totalRecords: number;
  data: Array<ICategory>;
}

export interface ICategoryFilter {
  skip: number;
  take?: number;
  keyword?: string;
}
