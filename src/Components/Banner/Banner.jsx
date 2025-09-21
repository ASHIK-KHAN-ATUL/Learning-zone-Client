import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

import banner1 from "../../assets/Banner/banner1.png";
import banner2 from "../../assets/Banner/banner2.png";

const Banner = () => {
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            src={banner1}
            alt="Banner 1"
            className="w-full max-h-[500px] object-center"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img src={banner2} alt="Banner 2" className="w-full max-h-[500px]" />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Banner;
