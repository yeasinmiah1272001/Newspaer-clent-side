import { Outlet } from "react-router-dom";
import { Sidebar } from "../pages/dashboard/shared/Sidebar";

const DashboardLayout = () => {
  return (
    <div className="flex  ">
      <nav className="basis-1/5">
        <Sidebar></Sidebar>
      </nav>
      <main className="bg-gray-100 flex-1 p-6 overflow-y-auto h-screen">
        <Outlet></Outlet>
      </main>
    </div>
  );
};

export default DashboardLayout;
