import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BreadCrumbs from '../components/BreadCrumbs'

const DashboardLayout = () => {
  return (
    <div className='flex'>
        {/* <BreadCrumbs/> */}
        <Sidebar/>
        <div>
          <BreadCrumbs/>
         <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout