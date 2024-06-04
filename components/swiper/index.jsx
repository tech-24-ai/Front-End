import React, { Fragment, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, FreeMode } from "swiper";

function CustomSwiper({ nodes, ...props }) {
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const swiperRef = useRef(null);

  return (
    <div className="customSwiper">
      {/* <div
        ref={navigationPrevRef}
        onClick={() => swiperRef.current?.slidePrev()}
        className="swiper-button-prev"
      /> */}
      <Swiper
        spaceBetween={20}
        slidesPerView={"auto"}
        freeMode={true}
        navigation
        // navigation={{
        //   prevEl: navigationPrevRef.current,
        //   nextEl: navigationNextRef.current,
        // }}
        onBeforeInit={(swiper) => {
          // swiper.params.navigation.prevEl = navigationPrevRef.current;
          // swiper.params.navigation.nextEl = navigationNextRef.current;
          // swiperRef.current = swiper;
          // swiper.navigation.init();
          // swiper.navigation.update();
        }}
        // onBeforeInit={(swiper) => {
        //   swiperRef.current = swiper;
        // }}
        modules={[Navigation, FreeMode, Pagination, Scrollbar, A11y]}
        onSlideChange={() => {}}
        onSwiper={(swiper) => {}}
        className="mySwiper"
        {...props}
        style={{ transform: "translate3d(0px, 0px, 0px)" }}
      >
        {nodes &&
          nodes.map((node, index) => (
            <SwiperSlide key={index}>{node}</SwiperSlide>
          ))}
      </Swiper>
      {/* <div
        ref={navigationNextRef}
        onClick={() => swiperRef.current?.slideNext()}
        className="swiper-button-next"
      /> */}
    </div>
  );
}

export default CustomSwiper;
