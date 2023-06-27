import gql from "graphql-tag";

export const OrderFragment = gql`
  fragment Order on Order {
    _id
    ref
    createdAt
    subTotal
    tax
    totalPrice
    status
    contactPhone
    contactName
    items {
      _id
      quantity
      price
      totalAmount
      product {
        images {
          uri
          name
        }
        name
        _id
        detail
      }
    }
  }
`;
