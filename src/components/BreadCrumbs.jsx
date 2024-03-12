import { Breadcrumbs, Typography } from "@material-tailwind/react";
import React from "react";
import { Link, Link as RouterLink,  useLocation } from "react-router-dom";

const BreadCrumbs = () => {
    const location = useLocation();

    return (
      <Breadcrumbs aria-label="breadcrumb">
        <Link component={RouterLink} to="/admin">
          Admin
        </Link>
        {location.pathname === '/admin/upload' && (
          <Link component={RouterLink} to="/admin/upload">
            Upload
          </Link>
        )}
        {location.pathname === '/admin/manage' && (
          <Link component={RouterLink} to="/admin/manage">
            Manage
          </Link>
        )}
        {/* <Typography color="text.primary">Breadcrumbs</Typography> */}
      </Breadcrumbs>
    );
};

export default BreadCrumbs;
