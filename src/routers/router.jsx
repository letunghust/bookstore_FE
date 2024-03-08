import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Shop from "../shop/Shop";
import Home from "../home/Home";
import About from "../components/About";
import Blog from "../components/Blog";
import SingleBookHome from "../shop/SingleBookHome";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";  
import EditBooks from "../dashboard/EditBooks"

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/shop",
            element: <Shop/>
        },
        {
          path: "/about",
          element: <About/>
        },
        {
          path: "/blog",
          element: <Blog/>
        },
        {
          path: "/book/:id",
          element: <SingleBookHome/>   
        },
        {
          path: "/admin/dashboard",
          element: <DashboardLayout/>,
          children: [
            {
              path: "/admin/dashboard",
              element: <Dashboard/>
            },
            {
              path: "/admin/dashboard/upload",
              element: <UploadBook/>
            },
            {
              path: "/admin/dashboard/manage",
              element: <ManageBooks/>
            },
            {
              path: "/admin/dashboard/edit-books/:id",
              element: <EditBooks/>
            }
          ]
        }
      ]
    },
  ]);

  export default router;