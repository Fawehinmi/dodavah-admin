import { getSession } from "next-auth/react";
import React from "react";
import MainLayout from "../../components/layout";
import CategoryPage from "../../modules/category/page";

export default function Product() {
  return (
    <MainLayout>
      <CategoryPage />
    </MainLayout>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permenant: false,
      },
    };
  }

  return {
    props: {},
  };
}
