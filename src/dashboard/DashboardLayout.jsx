import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import BreadCrumbs from '../components/BreadCrumbs'

const DashboardLayout = () => {
  return (
    <div className='flex'>
        {/* <BreadCrumbs/> */}
        <Sidebar/>
        <div className="flex-1 overflow-x-scroll">
          <BreadCrumbs/>
         <Outlet/>
        </div>
    </div>
  )
}

export default DashboardLayout