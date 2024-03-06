import { createBrowserRouter} from "react-router-dom";
import App from "../App";
import Shop from "../shop/Shop";
import Home from "../home/Home";
import About from "../components/About";
import Blog from "../components/Blog";
// import SingleBookHome from "../shop/SingleBookHome";
  
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
        // {
        //   path: "/book/:id",
        //   element: <SingleBookHome/>
         
        // }
      ]
    },
  ]);

  export default router;