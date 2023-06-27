import React from "react";
import SideNav from "../navbar";

interface IProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<IProps> = ({ children }) => {
  return (
    <div className="main-layout">
      <SideNav />
      {children}
    </div>
  );
};

export default MainLayout;
