import { Outlet } from "react-router-dom";
import Header from "../../../../QuanLyKyTucXa_FDORM/frontend/src/components/Header";
import Footer from "../../../../QuanLyKyTucXa_FDORM/frontend/src/components/Footer";
import Sidebar from "../../../../QuanLyKyTucXa_FDORM/frontend/src/components/Sidebar";
const MainLayout = () => {
  return (
    <>
      <Header />

      <div className="d-flex border-top border-secondary">
        <Sidebar />

        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>

      <Footer />
    </>
  );
};

export default MainLayout;
