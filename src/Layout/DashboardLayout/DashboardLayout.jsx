import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import {
  FaBars,
  FaUsers,
  FaUserGraduate,
  FaClipboardList,
  FaCalendarAlt,
  FaHome,
  FaInfoCircle,
  FaServicestack,
  FaEnvelope,
} from "react-icons/fa";
import useUserRole from "../../Hooks/useUserRole";
import useAuth from "../../Hooks/useAuth";
import { Typewriter } from "react-simple-typewriter";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const { role, roleLoading } = useUserRole();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAccoutProfile = () => {
    navigate("/dashboard/profile");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen text-sm sm:text-lg bg-gray-900">
      {/* Helmet for SEO */}
      <Helmet>
        <title>LearningZone || Dashboard</title>
        <meta
          name="description"
          content="Dashboard - Manage your courses, applications, and settings in LearningZone."
        />
        <link
          rel="canonical"
          href="https://learningzonekst.netlify.app/dashboard"
        />
        <meta property="og:title" content="Dashboard | LearningZone" />
        <meta
          property="og:description"
          content="Manage your courses, applications, and settings in LearningZone."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://learningzonekst.netlify.app/dashboard"
        />
      </Helmet>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform bg-gray-950 w-72 p-2 shadow-lg transition-transform duration-300 z-40 text-md
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Animated Title */}
        <h2 className="text-2xl font-extrabold mb-6 text-center bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
          <Typewriter
            words={["Learning Zone", "Welcome Back!", "Grow with Knowledge!"]}
            loop={0}
            cursor
            cursorStyle="|"
            typeSpeed={80}
            deleteSpeed={60}
            delaySpeed={1500}
          />
        </h2>

        {/* User info section */}
        <div
          onClick={handleAccoutProfile}
          className="mb-5 bg-gray-900 rounded-lg p-4 group"
        >
          <div className="h-20 w-20 rounded-2xl overflow-hidden mb-3 mx-auto">
            <img
              className="w-full h-full group-hover:scale-125 object-cover duration-300"
              src={user?.photoURL}
              alt="Profile pic"
            />
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </p>
            <h2 className="text-base font-semibold mt-1">
              Welcome Back, {user?.displayName || "User"}
            </h2>
          </div>
        </div>

        {/* Nav Links */}
        <div className="flex-1 bg-gray-900 rounded-lg p-4 group overflow-y-auto max-h-[70vh] scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800 pb-20">
          {!roleLoading && role === "admin" && (
            <div className="flex flex-col gap-2">
              <NavLink
                to={"/dashboard/all-teacher-admin"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaUsers /> All Teacher
              </NavLink>
              <NavLink
                to={"/dashboard/all-student-admin"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaUserGraduate /> All Student
              </NavLink>
              <NavLink
                to={"/dashboard/applied-teacher-admin"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaClipboardList /> Applied Teacher
              </NavLink>
              <NavLink
                to={"/dashboard/applied-student-admin"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaClipboardList /> Applied Student
              </NavLink>
              <NavLink
                to={"/dashboard/routineManager-admin"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaCalendarAlt /> Routine Manager
              </NavLink>
              <NavLink
                to={"/dashboard/showRoutine-admin"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaCalendarAlt /> Show Routine
              </NavLink>
            </div>
          )}

          {!roleLoading && role === "teacher" && (
            <div className="flex flex-col gap-2">
              <NavLink
                to={"/dashboard/all-student-teacher"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaUserGraduate /> All Student
              </NavLink>
              <NavLink
                to={"/dashboard/applied-student-teacher"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaClipboardList /> Applied Student
              </NavLink>
              <NavLink
                to={"/dashboard/routineManager-teacher"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaCalendarAlt /> Routine Manager
              </NavLink>
              <NavLink
                to={"/dashboard/showRoutine-teacher"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaCalendarAlt /> Show Routine
              </NavLink>
            </div>
          )}

          {!roleLoading && role === "student" && (
            <div className="flex flex-col gap-2">
              <NavLink
                to={"/dashboard/showRoutine-student"}
                className={({ isActive }) =>
                  `flex items-center gap-2 py-1 ${
                    isActive
                      ? "bg-gray-700 rounded-sm px-3 font-semibold"
                      : "px-3"
                  }`
                }
              >
                <FaCalendarAlt /> My Routine
              </NavLink>
            </div>
          )}

          {/* Common Links */}
          <div className="flex flex-col gap-2 mt-8 border-t border-gray-700 pt-4">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `flex items-center gap-2 py-1 ${
                  isActive
                    ? "bg-gray-700 rounded-sm px-3 font-semibold"
                    : "px-3"
                }`
              }
            >
              <FaHome /> Home
            </NavLink>
            <NavLink
              to={"/about"}
              className={({ isActive }) =>
                `flex items-center gap-2 py-1 ${
                  isActive
                    ? "bg-gray-700 rounded-sm px-3 font-semibold"
                    : "px-3"
                }`
              }
            >
              <FaInfoCircle /> About
            </NavLink>
            <NavLink
              to={"/service"}
              className={({ isActive }) =>
                `flex items-center gap-2 py-1 ${
                  isActive
                    ? "bg-gray-700 rounded-sm px-3 font-semibold"
                    : "px-3"
                }`
              }
            >
              <FaServicestack /> Services
            </NavLink>
            <NavLink
              to={"/contact"}
              className={({ isActive }) =>
                `flex items-center gap-2 py-1 ${
                  isActive
                    ? "bg-gray-700 rounded-sm px-3 font-semibold"
                    : "px-3"
                }`
              }
            >
              <FaEnvelope /> Contact
            </NavLink>
            <span
              onMouseEnter={() => setHover(true)}
              onMouseLeave={() => setHover(false)}
              onClick={() => handleLogout()}
              className="flex flex-row items-center gap-2 px-3  font-semibold text-red-500  rounded-xl cursor-pointer transition-all duration-500"
            >
              <p
                className={`transform transition-all duration-500 ${
                  hover ? "translate-x-20 " : "translate-x-0 opacity-100"
                }`}
              >
                <LuLogOut />
              </p>
              <p
                className={`transform transition-all duration-500 ${
                  hover ? "-translate-x-5" : "translate-x-0"
                }`}
              >
                Logout
              </p>
            </span>
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/70 bg-opacity-40 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="w-full flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between shadow p-4 z-20 ">
          <button
            onClick={() => setOpen(!open)}
            className="hover:rotate-90 duration-500 cursor-pointer text-white"
          >
            <FaBars size={20} />
          </button>
          <h1 className="text-lg font-bold text-white">Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="w-full h-full p-6 bg-gray-950 text-black">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
