import Sidebar from "../Sidebar";
import Navbar from "../Navbar";
import "./main.scss";
import { Outlet } from "react-router";

const MainLayout = ({count}) => {
  return (
    <div className="mainWrapper">
      <Sidebar />
      <div className="content">
        <Navbar count={count} />
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
