import Lottie from "lottie-react";
import React from "react";
import studyAnimation from "../../assets/study.json";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  return (
    <div className=" px-6 py-10 ">
      {location.pathname == "/about" && (
        <Helmet>
          <title>About | LearningZone</title>
          <meta
            name="description"
            content="LearningZone is a trusted education..."
          />
        </Helmet>
      )}
      <div className="max-w-6xl mx-auto text-white">
        {/* ===== Hero Section ===== */}
        <div className="grid md:grid-cols-2 gap-10 items-center space-y-6 md:space-y-0">
          {/* Left Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 mb-6">
              About LearningZone
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-4 text-white/90">
              Welcome to{" "}
              <span className="font-bold text-cyan-300">LearningZone</span> – a
              trusted education coaching center dedicated to guiding students
              towards academic excellence. We believe that the right learning
              environment, experienced teachers, and proper guidance can help
              every student achieve their full potential.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-4 text-white/90">
              At LearningZone, we provide well-structured programs starting from{" "}
              <span className="font-medium text-cyan-200">Class 6</span> all the
              way to{" "}
              <span className="font-medium text-cyan-200">College level</span>.
              Our coaching is designed to build strong foundations and boost
              confidence in every subject.
            </p>
          </div>

          {/* Right Animation */}
          <div className="flex justify-center">
            <Lottie
              animationData={studyAnimation}
              loop
              className="w-72 h-72 md:w-96 md:h-96 mx-auto"
            />
          </div>
        </div>

        {/* ===== Special Programs ===== */}
        <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-center text-cyan-300">
          Our Special Programs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-r from-cyan-400/40 to-blue-400/30 border border-cyan-500 shadow-md rounded-xl hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="font-bold text-cyan-200 text-lg md:text-xl">
              📘 Regular Classes (Class 6 – 10)
            </h3>
            <p className="mt-2 text-sm md:text-base text-white/90">
              Focus on building core skills in Mathematics, Science, English,
              and more.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-purple-400/40 to-indigo-400/30 border border-purple-500 shadow-md rounded-xl hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="font-bold text-purple-200 text-lg md:text-xl">
              🎯 SSC Special Batch
            </h3>
            <p className="mt-2 text-sm md:text-base text-white/90">
              Exclusive guidance and intensive model tests for SSC preparation.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-pink-400/40 to-rose-400/30 border border-pink-500 shadow-md rounded-xl hover:shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="font-bold text-pink-200 text-lg md:text-xl">
              🎓 College Program (Class 11 – 12)
            </h3>
            <p className="mt-2 text-sm md:text-base text-white/90">
              Strong support for board exams and university admission tests.
            </p>
          </div>
        </div>

        {/* ===== Mission Statement ===== */}
        <p className="text-lg md:text-xl leading-relaxed mt-12 italic border-l-4 border-l-cyan-400 pl-4 bg-white/10 backdrop-blur-lg border border-white/20 p-4 rounded shadow-sm text-white/90">
          “Our mission is simple – to inspire, guide, and prepare students for a
          brighter future. With a team of dedicated teachers and a supportive
          learning environment,{" "}
          <span className="font-semibold text-cyan-300">LearningZone</span> is
          more than just a coaching center; it’s a place where success begins.”
        </p>
      </div>
    </div>
  );
};

export default About;
