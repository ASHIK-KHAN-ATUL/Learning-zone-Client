import React from "react";
import { Helmet } from "react-helmet-async";
import LocationLearningZone from "../../Components/LocationLearningZone/LocationLearningZone";

const Service = () => {
  const services = [
    {
      title: "📘 Regular Classes",
      description:
        "Core subject coaching for Class 6 to 10. Mathematics, Science, English, and more.",
      color: "from-orange-50 to-white",
      textColor: "text-orange-600",
    },
    {
      title: "🎯 SSC Special Batch",
      description: "Intensive guidance and model tests to excel in SSC exams.",
      color: "from-yellow-50 to-white",
      textColor: "text-yellow-600",
    },
    {
      title: "🎓 College Program",
      description:
        "Support for board exams and university admission preparation.",
      color: "from-green-50 to-white",
      textColor: "text-green-600",
    },
    {
      title: "📝 Online Tutoring",
      description: "Live online classes for flexible learning from home.",
      color: "from-blue-50 to-white",
      textColor: "text-blue-600",
    },
    {
      title: "🎉 Workshops & Seminars",
      description:
        "Special workshops to enhance skills and knowledge beyond syllabus.",
      color: "from-pink-50 to-white",
      textColor: "text-pink-600",
    },
    {
      title: "📚 Exam Prep Materials",
      description:
        "Comprehensive study materials and practice papers for exams.",
      color: "from-purple-50 to-white",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen px-6 py-16  text-gray-800">
      <Helmet>
        <title>Services | LearningZone</title>
        <meta
          name="description"
          content="Explore the services offered by LearningZone: regular classes, SSC special batch, college program, online tutoring, workshops, and exam materials."
        />
        <meta property="og:title" content="Services | LearningZone" />
        <meta
          property="og:description"
          content="Discover LearningZone's diverse educational services designed to help students excel academically."
        />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-orange-600 text-center mb-12">
          Our Services
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`p-6 bg-gradient-to-r ${service.color} shadow-md rounded-xl hover:shadow-lg transition-transform duration-300 ease-in-out hover:scale-105`}
            >
              <h3
                className={`font-bold ${service.textColor} text-lg md:text-xl`}
              >
                {service.title}
              </h3>
              <p className="text-gray-600 mt-2 text-sm md:text-base">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <LocationLearningZone></LocationLearningZone>
    </div>
  );
};

export default Service;
