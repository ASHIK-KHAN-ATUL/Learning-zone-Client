import Lottie from "lottie-react";
import React from "react";
import { Helmet } from "react-helmet-async";
import contactAnimation from "../../assets/Support.json";
import ceoPic from "../../assets/pic of team/antu.jpg";
import coFounderPic from "../../assets/pic of team/badhon.jpg";

const Contact = () => {
  return (
    <div className="min-h-screen text-white px-6 py-16 ">
      <Helmet>
        <title>Contact | LearningZone</title>
        <meta
          name="description"
          content="Get in touch with LearningZone for queries, admissions, or support. Contact our team via form, phone, email, or social media."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* ===== Hero Section ===== */}
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-4">
              Get in Touch with LearningZone
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-gray-300">
              We’d love to hear from you. Reach out for queries, admissions, or
              general support.
            </p>
          </div>
          <div className="flex justify-center">
            <Lottie
              animationData={contactAnimation}
              loop
              className="w-80 h-80 mx-auto"
            />
          </div>
        </div>

        {/* ===== Contact Info + Form ===== */}
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          {/* Left Column - Contact Info */}
          <div className="bg-gray-800/60 p-8 rounded-xl shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">
              Contact Information
            </h2>
            <p className="mb-3">
              <span className="font-semibold">Address:</span> M.M.C Road,
              Millpara,Kushtia, Bangladesh
            </p>
            <p className="mb-3">
              <span className="font-semibold">Phone:</span> +880 1798 680 543
            </p>
            <p className="mb-3">
              <span className="font-semibold">Email:</span>{" "}
              learningzoneacademykst@gmail.com
            </p>
            <div className="mt-4 flex gap-4">
              <a href="#" className="text-cyan-400 hover:text-cyan-300">
                Facebook
              </a>
              <a href="#" className="text-cyan-400 hover:text-cyan-300">
                Twitter
              </a>
              <a href="#" className="text-cyan-400 hover:text-cyan-300">
                Instagram
              </a>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="bg-gray-800/60 p-8 rounded-xl shadow-xl border border-gray-700">
            <h2 className="text-2xl font-bold text-cyan-400 mb-6">
              Send a Message
            </h2>
            <form className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="p-3 rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="p-3 rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="text"
                placeholder="Subject"
                className="p-3 rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <textarea
                placeholder="Message"
                rows="5"
                className="p-3 rounded border border-gray-700 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400"
              ></textarea>
              <button
                type="submit"
                className="bg-gradient-to-r from-cyan-400 to-blue-400 text-white font-semibold py-3 rounded-lg hover:from-blue-400 hover:to-cyan-400 shadow-lg transition-all"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* ===== Leadership / Team Section ===== */}
        <div className="mt-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-cyan-400 text-center mb-10">
            Our Leadership
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* CEO / Founder */}
            <div className="flex flex-col items-center p-6 bg-gray-800/60 rounded-xl shadow-xl hover:shadow-2xl transition-transform duration-300 ease-in-out group">
              <div className="w-32 h-32 overflow-hidden rounded-full">
                <img
                  src={ceoPic}
                  alt="Istiak Ahmed Antu - Founder of LearningZone"
                  className="w-32 h-32 rounded-full object-cover mb-4 group-hover:scale-125 duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-cyan-400 group-hover:-translate-x-16 duration-500">
                Istiak Ahmed Antu
              </h3>
              <p className="text-gray-300 group-hover:-translate-x-16 duration-500">
                CEO / Founder
              </p>
              <p className="text-gray-400 text-center mt-2">
                “Passionate about guiding students toward academic excellence.”
              </p>
            </div>

            {/* Co-Founder */}
            <div className="flex flex-col items-center p-6 bg-gray-800/60 rounded-xl shadow-xl hover:shadow-2xl transition-transform duration-300 ease-in-out group">
              <div className="w-32 h-32 overflow-hidden rounded-full">
                <img
                  src={coFounderPic}
                  alt=" Badhon Sheikh Rijoy Co-Founder"
                  className="w-32 h-32 rounded-full object-cover mb-4 group-hover:scale-125 duration-500"
                />
              </div>
              <h3 className="text-xl font-bold text-cyan-400 group-hover:-translate-x-16 duration-500">
                Badhon Sheikh Rijoy
              </h3>
              <p className="text-gray-300 group-hover:-translate-x-16 duration-500">
                Co-Founder
              </p>
              <p className="text-gray-400 text-center mt-2">
                “Dedicated to creating a supportive learning environment for all
                students.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
