import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import logo from "../../assets/logo main.png";
import "./Navbar.css";

const Navbar = () => {
  const [isClick, setIsClick] = useState(false);
  const navOption = [
    <li className="nav-link" key="home">
      <a href="/">Home</a>
    </li>,
    <li className="nav-link" key="about">
      <a href="/about">About</a>
    </li>,
    <li className="nav-link" key="services">
      <a href="/services">Services</a>
    </li>,
    <li className="nav-link" key="contact">
      <a href="/contact">Contact</a>
    </li>,
  ];

  return (
    <div className=" px-5 py-1 border-y border-black">
      <div className="flex justify-between items-center">
        <img src={logo} className="w-14 h-14" alt="Learning-zone-logo" />

        <div className="hidden md:block">
          <ul className="flex gap-5  font-semibold">{navOption}</ul>
        </div>

        <div></div>

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
  );
};

export default Navbar;
