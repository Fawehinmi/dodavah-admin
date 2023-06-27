import gql from "graphql-tag";

export const CategoryFragment = gql`
  fragment Category on ProductCategory {
    _id
    name
    image {
      uri
    }
  }
`;
