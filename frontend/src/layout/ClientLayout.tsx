import React from 'react'
import { Outlet } from 'react-router-dom'

const ClientLayout = () => {
  return (
    <div>
        {/* component header */}
        <Outlet/>
        {/* component footer */}
    </div>
  )
}

export default ClientLayout