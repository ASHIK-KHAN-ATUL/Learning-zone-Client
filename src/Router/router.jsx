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
import BecomeTeacher from "../Components/BecomeTeacher/BecomeTeacher";
import DashboardLayout from "../Layout/DashboardLayout/DashboardLayout";
import AppliedTeacher from "../Pages/DashboardPages/AdminDashPage/AppliedTeacher/AppliedTeacher";
import Profile from "../Pages/DashboardPages/Profile/Profile";
import AppliedStudent from "../Pages/DashboardPages/AdminDashPage/AppliedStudent/AppliedStudent";

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
        element: (
          <PrivetRoutes>
            <BecomeStudent></BecomeStudent>
          </PrivetRoutes>
        ),
      },
      {
        path: "/become-teacher",
        element: (
          <PrivetRoutes>
            <BecomeTeacher></BecomeTeacher>
          </PrivetRoutes>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivetRoutes>
        <DashboardLayout></DashboardLayout>
      </PrivetRoutes>
    ),
    children: [
      {
        path: "", // default when /dashboard hit hoy
        element: <Profile></Profile>,
      },

      {
        path: "applied-teacher-admin",
        element: <AppliedTeacher></AppliedTeacher>,
      },
      {
        path: "applied-student-admin",
        element: <AppliedStudent></AppliedStudent>,
      },
    ],
  },
]);

export default router;
