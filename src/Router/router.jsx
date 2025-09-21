import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "../Layout/HomeLayout/HomeLayout";
import Home from "../Pages/Home/Home";
import Register from "../Components/Register/Register";
import Login from "../Components/Login/Login";

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
    ],
  },
]);

export default router;
