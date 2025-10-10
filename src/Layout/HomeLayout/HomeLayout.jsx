import React from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import IfYouAreBlocked from "../../Components/IfYouAreBlocked/IfYouAreBlocked";
import "./Homelayout.css";
import useAuth from "../../Hooks/useAuth";

const HomeLayout = () => {
  const { user } = useAuth();
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-gray-100">
      {/* 🔹 Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto font-medium">
        <Navbar />
        {user?.email && <IfYouAreBlocked />}
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default HomeLayout;
