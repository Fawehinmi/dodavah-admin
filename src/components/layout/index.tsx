import React from "react";
import SideNav from "../navbar";
import Navbar from "../navbar/navbar";

interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <SideNav />
      <div>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
