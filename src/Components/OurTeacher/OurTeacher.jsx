import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { FaFacebook, FaLinkedin, FaGlobe } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import userAxiosPublic from "../../Hooks/userAxiosPublic";

const OurTeacher = () => {
  const axiosPublic = userAxiosPublic();
  const { data: teachers = [] } = useQuery({
    queryKey: ["allTeacher"],
    queryFn: async () => {
      const res = await axiosPublic.get("/all-teacher-home");
      return res.data;
    },
  });

  return (
    <div className="py-8 ">
      <h2 className="text-2xl font-bold mb-6 text-center">Our Teachers</h2>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={3}
        loop={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {teachers.map((teacher) => (
          <SwiperSlide key={teacher._id}>
            <div className="bg-gradient-to-br from-indigo-500/30 via-sky-500/20 to-purple-500/20 border border-sky-500 shadow-lg rounded-xl p-4 flex flex-col items-center  transition-transform h-[320px]">
              <img
                src={teacher.photo || "/default-profile.png"}
                alt={teacher.fullName}
                className="w-24 h-24 rounded-full mb-2 object-cover"
              />
              <h3 className="font-semibold text-lg">{teacher.fullName}</h3>
              <p className="text-sm text-gray-500">{teacher.qualification}</p>

              <div className="mt-2 w-full">
                <p className="font-semibold text-sm mb-1">Subjects:</p>
                <div className="flex flex-wrap gap-1">
                  {teacher.subjects?.map((subj, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {subj}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-2 w-full">
                <p className="font-semibold text-sm mb-1">Classes:</p>
                <div className="flex flex-wrap gap-1">
                  {teacher.preferredClasses?.map((cls, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full"
                    >
                      {cls}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 justify-center mt-3 text-xl">
                {teacher.facebook && (
                  <a
                    href={teacher.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <FaFacebook />
                  </a>
                )}
                {teacher.linkedin && (
                  <a
                    href={teacher.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sky-700 hover:text-sky-900"
                  >
                    <FaLinkedin />
                  </a>
                )}
                {teacher.website && (
                  <a
                    href={teacher.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-rose-600 hover:text-rose-800"
                  >
                    <FaGlobe />
                  </a>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default OurTeacher;
