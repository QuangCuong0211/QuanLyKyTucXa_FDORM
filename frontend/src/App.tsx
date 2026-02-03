import './App.css'
import { useRoutes } from 'react-router-dom'
import ClientLayout from './layout/ClientLayout'
import RegisterKTX from './page/student/RegisterKTX'
import LayoutAdmin from './layout/admin/LayoutAdmin'
import HomeAdmin from './page/admin/HomeAdmin'

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

export default App
