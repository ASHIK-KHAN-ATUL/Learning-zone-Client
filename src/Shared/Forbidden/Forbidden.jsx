import React from "react";
import { Link } from "react-router-dom";
import { FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-yellow-100 to-white">
      <div className="text-center p-8 bg-white shadow-lg rounded-2xl max-w-md">
        <div className="flex justify-center mb-4">
          <div className="p-6 bg-red-100 rounded-full">
            <FaLock className="text-red-500 text-5xl" />
          </div>
        </div>
        <h1 className="text-6xl font-extrabold text-red-500">403</h1>
        <h2 className="mt-4 text-2xl font-semibold text-gray-800">
          Access Forbidden
        </h2>
        <p className="mt-2 text-gray-600">
          Sorry, you don’t have permission to access this page. <br />
          Please contact the administrator if you believe this is a mistake.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-2 bg-yellow-500 text-white rounded-lg shadow-md hover:bg-yellow-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Forbidden;
