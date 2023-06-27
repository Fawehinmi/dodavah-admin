import { getSession } from "next-auth/react";
import React, { useState } from "react";
import { FaMoneyBill } from "react-icons/fa";
import { HiShoppingCart } from "react-icons/hi";
import { GrLineChart } from "react-icons/gr";
import MainLayout from "../../components/layout";
import SideNav from "../../components/navbar";
import DashBoardSummaryItem from "./components/summaryItems";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

const DashboardPage = () => {
  const [sideInfoOpen, setSideInfoOpen] = useState<boolean>(true);

  return (
    <div className="flex dashboard ">
      <div
        className={`dashboard-main-${
          sideInfoOpen === true ? "opened b-right" : "closed"
        }`}
      >
        <div className="flex justify-between items-center">
          <h1 className="section-title">Overview</h1>

          <div
            onClick={() => setSideInfoOpen(!sideInfoOpen)}
            className="nav-button flex items-center justify-center cursor-pointer"
          >
            {sideInfoOpen == true ? <BsArrowRight /> : <BsArrowLeft />}
          </div>
        </div>
        <div className="dashboard-summary-container">
          <DashBoardSummaryItem
            isIncrease={true}
            name="Total Sales"
            percentage="30"
            value="₦300,000"
            className="dashboard-summary-item-container"
          >
            <GrLineChart className="text-sky-500" />
          </DashBoardSummaryItem>
          <DashBoardSummaryItem
            className="dashboard-summary-item-container"
            isIncrease={false}
            name="Total Orders"
            percentage="30"
            value="30"
          >
            <HiShoppingCart />
          </DashBoardSummaryItem>
          <DashBoardSummaryItem
            className="dashboard-summary-item-container"
            isIncrease={true}
            name="Total Products"
            percentage="30"
            value="100"
          >
            <FaMoneyBill />
          </DashBoardSummaryItem>
          <DashBoardSummaryItem
            className="dashboard-summary-item-container"
            isIncrease={false}
            name="Total Categories"
            percentage="30"
            value="10000"
          >
            <GrLineChart className="" />
          </DashBoardSummaryItem>
        </div>
      </div>

      {sideInfoOpen && (
        <div className="dashboard-sidenav ">
          <h1 className="mt-40 text-center">Coming Soon....</h1>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
