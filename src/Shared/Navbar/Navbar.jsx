import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo main.png";
import "./Navbar.css";
import { NavLink, useLocation } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout()
      .then(() => {})
      .catch((error) => console.error(error));
  };

  const navOption = (
    <>
      <li className="nav-link" key="home">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : ""
          }
        >
          Home
        </NavLink>
      </li>

      <li className="nav-link" key="about">
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : ""
          }
        >
          About
        </NavLink>
      </li>

      <li className="nav-link" key="services">
        <NavLink
          to="/service"
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : ""
          }
        >
          Services
        </NavLink>
      </li>

      <li className="nav-link" key="contact">
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "text-red-500 font-bold" : ""
          }
        >
          Contact
        </NavLink>
      </li>

      {user?.email ? (
        <li className="nav-link" key="logout">
          <NavLink onClick={handleLogout}>Logout</NavLink>
        </li>
      ) : location.pathname.includes("/login") ? (
        <li className="nav-link" key="register">
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-bold" : ""
            }
          >
            Register
          </NavLink>
        </li>
      ) : (
        <li className="nav-link" key="login">
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? "text-red-500 font-bold" : ""
            }
          >
            Login
          </NavLink>
        </li>
      )}
    </>
  );
  return (
    <div className=" px-5 py-1 border-b border-black">
      <div className="flex justify-between items-center">
        {/*  */}
        <img src={logo} className="w-14 h-14" alt="Learning-zone-logo" />

        <div className="hidden md:block">
          <ul className="flex gap-5  font-semibold">{navOption}</ul>
        </div>

        {/* end */}
        <div className="flex gap-5 items-center">
          {/* profile image */}
          {user?.email && (
            <div className="h-12 w-12 hover:animate-pulse cursor-pointer overflow-hidden rounded-full">
              <img
                className="h-full w-full  object-cover hover:scale-125 duration-300"
                src={user.photoURL}
                alt="profile image"
              />
            </div>
          )}

          {/* 3line Btn */}
          <div className="md:hidden">
            <span
              onClick={() => setIsClick(!isClick)}
              className=" relative btn w-10 h-8  bg-transparent z-10 border"
            >
              {isClick ? (
                <span className="transition-all duration-300 ease-in-out transform rotate-180 scale-110 text-sky-400 bg-transparent">
                  <RxCross2 />
                </span>
              ) : (
                <span className="transition-all duration-300 ease-in-out transform rotate-0 scale-110 text-sky-400">
                  <FaBars />
                </span>
              )}
              <div
                className={` ${
                  isClick ? "block" : "hidden"
                } absolute top-8 -right-0 w-60   p-5 rounded-lg overflow-hidden bg-green-100 border border-black`}
              >
                <ul className=" flex flex-col  w-[60vh] text-start ">
                  {navOption}
                </ul>
              </div>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
