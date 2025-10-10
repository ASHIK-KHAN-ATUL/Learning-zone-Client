import React from "react";
import { Helmet } from "react-helmet-async";
import LocationLearningZone from "../../Components/LocationLearningZone/LocationLearningZone";

const Service = () => {
  const services = [
    {
      title: "📘 Regular Classes",
      description:
        "Core subject coaching for Class 6 to 10. Mathematics, Science, English, and more.",
      color: "from-cyan-400/30 to-blue-400/20",
      textColor: "text-cyan-200",
    },
    {
      title: "🎯 SSC Special Batch",
      description: "Intensive guidance and model tests to excel in SSC exams.",
      color: "from-purple-400/30 to-indigo-400/20",
      textColor: "text-purple-200",
    },
    {
      title: "🎓 College Program",
      description:
        "Support for board exams and university admission preparation.",
      color: "from-pink-400/30 to-rose-400/20",
      textColor: "text-pink-200",
    },
    {
      title: "📝 Online Tutoring",
      description: "Live online classes for flexible learning from home.",
      color: "from-green-400/30 to-cyan-400/20",
      textColor: "text-green-200",
    },
    {
      title: "🎉 Workshops & Seminars",
      description:
        "Special workshops to enhance skills and knowledge beyond syllabus.",
      color: "from-yellow-400/30 to-orange-400/20",
      textColor: "text-yellow-200",
    },
    {
      title: "📚 Exam Prep Materials",
      description:
        "Comprehensive study materials and practice papers for exams.",
      color: "from-blue-400/30 to-cyan-400/20",
      textColor: "text-blue-200",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-16 text-white ">
      <Helmet>
        <title>Services | LearningZone</title>
        <meta
          name="description"
          content="Explore the services offered by LearningZone: regular classes, SSC special batch, college program, online tutoring, workshops, and exam materials."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-cyan-400 text-center mb-12">
          Our Services
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 bg-gradient-to-r ${service.color} shadow-xl rounded-2xl hover:shadow-2xl transition-transform duration-300 ease-in-out hover:scale-105`}
            >
              <h3
                className={`font-bold ${service.textColor} text-lg md:text-xl`}
              >
                {service.title}
              </h3>
              <p className="text-gray-300 mt-2 text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <LocationLearningZone />
    </div>
  );
};

export default Service;
