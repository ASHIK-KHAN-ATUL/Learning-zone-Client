import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Outlet, Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen text-black bg-gradient-to-b from-yellow-100 to-white text-sm sm:text-lg">
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
      </Helmet>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform bg-gradient-to-b from-yellow-200 to-yellow-50 w-64 p-6 shadow-lg transition-transform duration-300 z-40
          ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Dashboard</h2>
        <nav className="flex flex-col gap-3">
          <Link to="/dashboard/applied-teacher-admin">Applied Teacher</Link>
          {/* Add more links here */}
        </nav>
      </aside>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="w-full flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between shadow p-4  z-20">
          <button
            onClick={() => setOpen(!open)}
            className="hover:rotate-90 duration-500 cursor-pointer text-gray-700"
          >
            <FaBars size={20} />
          </button>
          <h1 className="text-lg font-bold">Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="w-full p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
