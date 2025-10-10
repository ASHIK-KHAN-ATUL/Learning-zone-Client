import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import logo from "../../assets/logo main.png";

const socialIcons = [
  {
    icon: FaFacebookF,
    link: "https://facebook.com",
    color: "text-blue-500 hover:text-blue-400",
  },
  {
    icon: FaInstagram,
    link: "https://instagram.com",
    color: "text-pink-500 hover:text-pink-400",
  },
  {
    icon: FaLinkedinIn,
    link: "https://linkedin.com",
    color: "text-blue-700 hover:text-blue-600",
  },
  {
    icon: FaTwitter,
    link: "https://twitter.com",
    color: "text-blue-400 hover:text-blue-300",
  },
];

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo & Description */}
        <div className="flex flex-col items-start">
          <img src={logo} alt="Learning Zone Logo" className="w-36 mb-4" />
          <p className="text-sm text-gray-400">
            Learning Zone is your ultimate platform for online education. Join
            as a student or teacher and start learning today!
          </p>
          <div className="flex mt-4 gap-3">
            {socialIcons.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${item.color} transition transform hover:scale-110`}
              >
                <item.icon />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", link: "/" },
              { name: "About", link: "/about" },
              { name: "Services", link: "/service" },
              { name: "Contact", link: "/contact" },
              { name: "Join as Student", link: "/become-student" },
              { name: "Join as Teacher", link: "/become-teacher" },
            ].map((item, idx) => (
              <li key={idx}>
                <a
                  href={item.link}
                  className="hover:text-yellow-400 transition"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Resources</h3>
          <ul className="space-y-2 text-sm">
            {["Blog", "FAQs", "Support", "Privacy Policy"].map((item, idx) => (
              <li key={idx}>
                <a href="#" className="hover:text-yellow-400 transition">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold mb-4 text-white">Contact</h3>
          <p className="text-sm text-gray-400">
            123 Learning Street, Dhaka, Bangladesh
          </p>
          <p className="text-sm text-gray-400 mt-1">
            Email: info@learningzone.com
          </p>
          <p className="text-sm text-gray-400 mt-1">Phone: +880 1306 068794</p>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="bg-gray-800 text-gray-400 text-center text-xs py-4 mt-6">
        © 2025 Learning Zone. Developed by{" "}
        <a
          href="https://ashikkhanatul.netlify.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-yellow-400 hover:underline"
        >
          Ashik Khan Atul
        </a>
      </div>
    </footer>
  );
};

export default Footer;
