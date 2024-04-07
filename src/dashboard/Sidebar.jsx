import { Card, Typography, List, ListItem, ListItemPrefix, ListItemSuffix, Chip, } from "@material-tailwind/react";
import { PresentationChartBarIcon, ShoppingBagIcon, UserCircleIcon, Cog6ToothIcon, InboxIcon, PowerIcon, } from "@heroicons/react/24/solid";
import {  useLocation, Link } from "react-router-dom";
import { IoIosCloudUpload } from "react-icons/io";
// import { FaBahtSign } from "react-icons/fa6";

const SidebarItem = ({ to, icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to.toString();

  return (
    <Link to={to}>
      <ListItem className={isActive ? 'bg-gray-300' : ''}>
        <ListItemPrefix>{icon}</ListItemPrefix>
        {label}
      </ListItem>
    </Link>
  );
};

const Sidebar = () => {
  // const listItem = [{key: "dashboard" , path: "/admin/dashboard"}]
    return (
      <Card className="h-[calc(100vh-2rem)] w-64 p-4 shadow-xl shadow-blue-gray-900/5">
      <List> 
        <SidebarItem to="/admin" icon={<PresentationChartBarIcon className="h-5 w-5" />} label="Dashboard" />
        <SidebarItem to="/admin/upload" icon={<IoIosCloudUpload  className="h-5 w-5" />} label="Upload Book" />
        <SidebarItem to="/admin/manage" icon={<InboxIcon className="h-5 w-5" />} label="Manage Books" />
        {/* <SidebarItem to="/admin/dashboard/profile" icon={<UserCircleIcon className="h-5 w-5" />} label="Profile" />
        <SidebarItem to="/admin/dashboard/settings" icon={<Cog6ToothIcon className="h-5 w-5" />} label="Settings" />
        <SidebarItem to="/admin/dashboard/logout" icon={<PowerIcon className="h-5 w-5" />} label="Log Out" /> */}
      </List>
    </Card>
      );
}

export default Sidebar