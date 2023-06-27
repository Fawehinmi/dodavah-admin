import { IProductImages, IProduct } from "../product/model";

export enum OrderStatusType {
  NEW = "NEW",
  CONFIRMED = "CONFIRMED",
  PACKED = "PACKED",
  SENDOUT = "SENDOUT",
  COMPLETED = "COMPLETED",
  CANCEL = "CANCELLED",
}

export interface IOrderFilter {
  skip: number;
  take?: number;
  keyword?: string;
}

export interface IOrderItem {
  _id: string;
  product: IProduct;
  quantity: string;
  price: number;
  totalAmount: number;
}

export interface IOrder {
  _id: string;
  ref: string;
  createdAt: string;
  userId: string;
  status: OrderStatusType;
  items: IOrderItem[];
  tax: number;
  subTotal: number;
  totalPrice: number;
  contactName: string;
  contactPhone: string;
  address: string;
}
