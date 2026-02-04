import { useRoutes } from "react-router-dom";


// import ClientLayout from "./layouts/ClientLayout";

import HomeAdmin from "./pages/admin/HomeAdmin";
// import RegisterKTX from "./pages/student/RegisterKTX";

import ApproveRegistration from "./layouts/admin/ApproveRegistration";
import DashBoard from "./pages/manager/DashboardManager";
import MainLayout from "./layouts/MainLayout";
import Phong from "./pages/manager/Phong";

function App() {
  const router = useRoutes([

    // CLIENT
    // {
    //   path: "/student",
    //   element: <ClientLayout />,
    //   children: [
    //     {
    //       index: true,
    //       element: <div>Trang chủ Client</div> 
    //     },
    //     {
    //       path: "register",
    //       element: <RegisterKTX />
    //     },
    //     {
    //       path: "home",
    //       element: <div>Student Home</div>
    //     }
    //   ]
    // },

    // ADMIN 
    {
      path: "/admin",
      element: <MainLayout />,
      children: [
        { index: true, element: <HomeAdmin /> },
        // {
        //   path: "duyet",
        //   element: <ApproveRegistration />
        // },
      ]
    },
    {
      path: "/manager",
      element: <MainLayout />,
      children: [
        { index: true, element: <DashBoard /> },
        {
          path: "duyet-don",
          element: <ApproveRegistration />
        },
        {
          path: "phong",
          element: <Phong />
        },
      ]
    },

    // 404
    {
      path: "*",
      element: <div>404 Not Found</div>
    }

  ]);

  return router;
}

export default App;
