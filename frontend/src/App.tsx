import { Routes, Route, Navigate, useRoutes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AreaPage from "./pages/AreaPage";
import RoomPage from "./pages/RoomPage";
import StudentPage from "./pages/StudentPage";
import LayoutAdmin from "./layouts/admin/LayoutAdmin";
import ClientLayout from "./layouts/ClientLayout";
import HomeAdmin from "./pages/admin/HomeAdmin";
import RegisterKTX from "./pages/student/RegisterKTX";

function App() {
  const router = useRoutes([
    {path:'/',Component:ClientLayout,children:[
      {path:'/student/register',Component:RegisterKTX},
      {path:'/student/home',Component:HomeAdmin},


    ]},
    {path:'/admin',Component:LayoutAdmin,children:[
      {path:'',Component:HomeAdmin}
    ]}
  ])
  return router
}

export default App;
