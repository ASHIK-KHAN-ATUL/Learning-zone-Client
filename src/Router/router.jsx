import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";
import About from "../Pages/About/About";
import PrivetRoutes from "../Routes/PrivetRoutes";
import Service from "../Pages/Service/Service";
import Contact from "../Pages/Contact/Contact";
import BecomeStudent from "../Components/BecomeStudent/BecomeStudent";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/register",
        element: <Register></Register>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/service",
        element: <Service></Service>,
      },
      {
        path: "/contact",
        element: <Contact></Contact>,
      },
      {
        path: "/become-student",
        element: <BecomeStudent></BecomeStudent>,
      },
    ],
  },
]);

export default router;
