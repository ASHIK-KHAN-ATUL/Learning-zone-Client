import Lottie from "lottie-react";
import React from "react";
import studyAnimation from "../../assets/study.json";
import { Helmet } from "react-helmet-async";

const About = () => {
  return (
    <div className="min-h-screen px-6 py-16  text-gray-800">
      <Helmet>
        <title>About | LearningZone</title>
        <meta
          name="description"
          content="LearningZone is a trusted education coaching center from Class 6 to College level. Special programs for SSC & HSC students."
        />
        <meta property="og:title" content="About LearningZone" />
        <meta
          property="og:description"
          content="Learn more about LearningZone Academy and our mission to guide students towards academic success."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        {/* ===== Hero Section ===== */}
        <div className="grid md:grid-cols-2 gap-10 items-center space-y-6 md:space-y-0">
          {/* Left Text */}
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 mb-6">
              About LearningZone
            </h1>
            <p className="text-lg md:text-xl leading-relaxed mb-4">
              Welcome to{" "}
              <span className="font-bold text-orange-500">LearningZone</span> –
              a trusted education coaching center dedicated to guiding students
              towards academic excellence. We believe that the right learning
              environment, experienced teachers, and proper guidance can help
              every student achieve their full potential.
            </p>
            <p className="text-lg md:text-xl leading-relaxed mb-4">
              At LearningZone, we provide well-structured programs starting from{" "}
              <span className="font-medium">Class 6</span> all the way to{" "}
              <span className="font-medium">College level</span>. Our coaching
              is designed to build strong foundations and boost confidence in
              every subject.
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
        <h2 className="text-2xl md:text-3xl font-semibold mt-12 mb-6 text-center text-orange-500">
          Our Special Programs
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 bg-gradient-to-r from-orange-50 to-white shadow-md rounded-xl hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
            <h3 className="font-bold text-orange-600 text-lg md:text-xl">
              📘 Regular Classes (Class 6 – 10)
            </h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Focus on building core skills in Mathematics, Science, English,
              and more.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-yellow-50 to-white shadow-md rounded-xl hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
            <h3 className="font-bold text-yellow-600 text-lg md:text-xl">
              🎯 SSC Special Batch
            </h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Exclusive guidance and intensive model tests for SSC preparation.
            </p>
          </div>

          <div className="p-6 bg-gradient-to-r from-green-50 to-white shadow-md rounded-xl hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
            <h3 className="font-bold text-green-600 text-lg md:text-xl">
              🎓 College Program (Class 11 – 12)
            </h3>
            <p className="text-gray-600 mt-2 text-sm md:text-base">
              Strong support for board exams and university admission tests.
            </p>
          </div>
        </div>

        {/* ===== Mission Statement ===== */}
        <p className="text-lg md:text-xl leading-relaxed mt-12 italic border-l-4 border-orange-400 pl-4 bg-white p-4 rounded shadow-sm">
          “Our mission is simple – to inspire, guide, and prepare students for a
          brighter future. With a team of dedicated teachers and a supportive
          learning environment,{" "}
          <span className="font-semibold text-orange-600">LearningZone</span> is
          more than just a coaching center; it’s a place where success begins.”
        </p>
      </div>
    </div>
  );
};

export default About;
