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
import LoginForm from "../pages/LoginForm";
import SignUpForm from "../pages/SignUpForm";
import Cart from "../pages/Cart";

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
          path: "/login",
          element: <LoginForm/>
        },
        {
          path: "/signup",
          element: <SignUpForm/>
        },
        {
          path: "/cart",
          element: <Cart/>
        },
        {
          path: "/admin",
          element: <DashboardLayout/>,
          children: [
            {
              path: "/admin",
              element: <Dashboard/>
            },
            {
              path: "/admin/upload",
              element: <UploadBook/>
            },
            {
              path: "/admin/manage",
              element: <ManageBooks/>
            },
            {
              path: "/admin/edit-books/:id",
              element: <EditBooks/>
            }
          ]
        }
      ]
    },
  ]);

  export default router;