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
import AllTeacher from "../Pages/DashboardPages/AdminDashPage/AllTeacher/AllTeacher";
import Forbidden from "../Shared/Forbidden/Forbidden";
import AdminRoutes from "../Routes/AdminRoutes";
import AllStudent from "../Pages/DashboardPages/AdminDashPage/AllStudent/AllStudent";
import TeacherRoutes from "../Routes/TeacherRoutes";
import RoutineManager from "../Pages/DashboardPages/Shared/Routine/RoutineManager";
import ShowRoutine from "../Pages/DashboardPages/Shared/Routine/ShowRoutine";
import StudentRoutes from "../Routes/StudentRoutes";
import StudentRoutine from "../Pages/DashboardPages/Shared/Routine/StudentRoutine";
import SeeMessage from "../Pages/DashboardPages/Shared/SeeMessage/SeeMessage";

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
        path: "/forbidden",
        element: <Forbidden></Forbidden>,
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
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "all-teacher-admin",
        element: (
          <AdminRoutes>
            <AllTeacher></AllTeacher>
          </AdminRoutes>
        ),
      },
      {
        path: "all-student-admin",
        element: (
          <AdminRoutes>
            <AllStudent></AllStudent>
          </AdminRoutes>
        ),
      },

      {
        path: "applied-teacher-admin",
        element: (
          <AdminRoutes>
            <AppliedTeacher></AppliedTeacher>
          </AdminRoutes>
        ),
      },
      {
        path: "applied-student-admin",
        element: (
          <AdminRoutes>
            <AppliedStudent></AppliedStudent>
          </AdminRoutes>
        ),
      },
      {
        path: "routineManager-admin",
        element: (
          <AdminRoutes>
            <RoutineManager></RoutineManager>
          </AdminRoutes>
        ),
      },
      {
        path: "showRoutine-admin",
        element: (
          <AdminRoutes>
            <ShowRoutine></ShowRoutine>
          </AdminRoutes>
        ),
      },
      {
        path: "seeMessage-admin",
        element: (
          <AdminRoutes>
            <SeeMessage></SeeMessage>
          </AdminRoutes>
        ),
      },

      // for teacher

      {
        path: "all-student-teacher",
        element: (
          <TeacherRoutes>
            <AllStudent></AllStudent>
          </TeacherRoutes>
        ),
      },
      {
        path: "applied-student-teacher",
        element: (
          <TeacherRoutes>
            <AppliedStudent></AppliedStudent>
          </TeacherRoutes>
        ),
      },
      {
        path: "routineManager-teacher",
        element: (
          <TeacherRoutes>
            <RoutineManager></RoutineManager>
          </TeacherRoutes>
        ),
      },
      {
        path: "showRoutine-teacher",
        element: (
          <TeacherRoutes>
            <ShowRoutine></ShowRoutine>
          </TeacherRoutes>
        ),
      },

      // for student
      {
        path: "showRoutine-student",
        element: (
          <StudentRoutes>
            <StudentRoutine></StudentRoutine>
          </StudentRoutes>
        ),
      },
    ],
  },
]);

export default router;
