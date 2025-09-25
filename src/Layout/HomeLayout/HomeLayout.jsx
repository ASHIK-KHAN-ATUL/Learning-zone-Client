import React from "react";
import { Helmet } from "react-helmet-async";
import { Outlet } from "react-router-dom";
import Navbar from "../../Shared/Navbar/Navbar";
import Home from "../../Pages/Home/Home";

const HomeLayout = () => {
  return (
    <div className="bg-gradient-to-b from-yellow-100 to-white text-sm sm:text-lg text-black">
      <Helmet>
        <title>LearningZone || Learn, Explore, and Grow</title>
        <meta
          name="description"
          content="LearningZone is your platform to access tutorials, courses, and resources to enhance your skills and knowledge."
        />
        <link rel="canonical" href="https://learningzone.netlify.app/" />
      </Helmet>
      <div className="font-medium min-h-screen max-w-7xl mx-auto ">
        <Navbar></Navbar>
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default HomeLayout;
