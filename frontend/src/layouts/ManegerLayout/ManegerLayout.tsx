import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const ManegerLayout = () => {
    return (
        <div className="flex-grow-1 d-flex flex-column">
            <Header />
            <div className="d-flex" style={{ minHeight: "100vh" }}>
                <Sidebar />
                <main className="flex-grow-1 p-4 bg-light">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </div>

    );
};

export default ManegerLayout;
