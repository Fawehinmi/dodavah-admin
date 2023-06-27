import gql from "graphql-tag";

export const ProductFragment = gql`
  fragment Product on Product {
    _id
    name
    quantity
    price
    priceBefore
    categoryId
    category
    detail
    images {
      _id
      uri
      name
      type
    }
  }
`;
