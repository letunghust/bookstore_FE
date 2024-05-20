import { Card, List, ListItem, ListItemPrefix,  } from "@material-tailwind/react";
import { PresentationChartBarIcon,  InboxIcon,  } from "@heroicons/react/24/solid";
import {  useLocation, Link } from "react-router-dom";
import { IoIosCloudUpload } from "react-icons/io";
import { IoMdPeople } from "react-icons/io";

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
    return (
      <Card className="h-[calc(100vh-2rem)] w-64 p-4 shadow-xl shadow-blue-gray-900/5">
      <List> 
        <SidebarItem to="/admin" icon={<PresentationChartBarIcon className="h-5 w-5" />} label="Dashboard" />
        <SidebarItem to="/admin/upload" icon={<IoIosCloudUpload  className="h-5 w-5" />} label="Upload Book" />
        <SidebarItem to="/admin/managebook" icon={<InboxIcon className="h-5 w-5" />} label="Manage Books" />
        <SidebarItem to="/admin/manageuser" icon={<IoMdPeople className="h-5 w-5" />} label="Manage Users" />
      </List>
    </Card>
      );
}

export default Sidebar