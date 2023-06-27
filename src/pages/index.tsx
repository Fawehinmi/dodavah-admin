import { getSession } from "next-auth/react";
import React from "react";
import MainLayout from "../components/layout";
import DashboardPage from "../modules/dashboard/page";

export default function Home() {
  return (
    <MainLayout>
      <DashboardPage />
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
