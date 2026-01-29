import { Route, Routes, useRoutes } from "react-router-dom"
import ClientLayout from "./layouts/client/ClientLayout"
import KtxRegister from "./pages/KtxRegister"

function App() {
  const router = useRoutes([
    {path:'/',Component:ClientLayout,children:[
      {path:'',Component:KtxRegister},
      
    ]}
  ]) 
  return router
}

export default App
