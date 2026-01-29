import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useRoutes } from 'react-router-dom'
import ClientLayout from './layout/ClientLayout'
import RegisterKTX from './page/RegisterKTX'

function App() {
  const router = useRoutes([
    {path:'/',Component:ClientLayout,children:[
      {path:'/student/register',Component:RegisterKTX}
    ]}
  ])
  return router
}

export default App
