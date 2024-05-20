import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Shop from "../shop/Shop";
import Home from "../home/Home";
import Recommend from "../pages/Recommend";
import Blog from "../components/Blog";
import SingleBookHome from "../shop/SingleBookHome";
import DashboardLayout from "../dashboard/DashboardLayout";
import Dashboard from "../dashboard/Dashboard";
import UploadBook from "../dashboard/UploadBook";
import ManageBooks from "../dashboard/ManageBooks";
import EditBooks from "../dashboard/EditBooks";
import LoginForm from "../pages/LoginForm";
import SignUpForm from "../pages/SignUpForm";
import Cart from "../pages/Cart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import UpdateProfile from "../pages/UpdateProfile";
import ForgotPasswordForm from "../pages/ForgotPasswordForm";
import ResetPasswordForm from "../pages/ResetPasswordForm";
// import {MainLayOut} from "../layout/MainLayOut";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/recommend",
        element: <Recommend />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/book/:id",
        element: <SingleBookHome />,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/signup",
        element: <SignUpForm />,
      },
      {
        path: "/forgotpassword",
        element: <ForgotPasswordForm />,
      },
      {
        path: "/resetpassword/:token",
        element: <ResetPasswordForm />,
      },
      {
        path: "/cart",
        element: (
          <Elements stripe={stripePromise}>
            <Cart />
          </Elements>
        ),
      },
      {
        path: "/profile",
        element: <UpdateProfile />,
      },
      {
        path: "/admin",
        element: <DashboardLayout />,
        children: [
          {
            path: "/admin",
            element: <Dashboard />,
          },
          {
            path: "/admin/upload",
            element: <UploadBook />,
          },
          {
            path: "/admin/manage",
            element: <ManageBooks />,
          },
          {
            path: "/admin/edit-books/:id",
            element: <EditBooks />,
          },
        ],
      },
    ],
  },
]);

export default router;
