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
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe('pk_test_51P1hnME80pxaWCvIsuSE6XO7LLLuoWmZKjvuXDRD99v10auWXzuvCKHKtidf7tLUcSczK806Pvbt2PwRjUL6L3Jk00sNLNslNz');
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
          element:
              <Elements
      stripe={stripePromise}
      // options={{
      //   clientSecret:
      //     "pi_3P3WUKE80pxaWCvI0rce7moD_secret_wbNwhXJj7LarsJaYScKpdS5GE",
      //   elements: { cardElement: CardElement },
      // }}
    >
          <Cart/> 
           </Elements> 
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