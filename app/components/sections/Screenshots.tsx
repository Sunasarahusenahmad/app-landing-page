"use client";

import {
  AppSS1,
  AppSS2,
  AppSS3,
  AppSS4,
  AppSS5,
  MobileFrame,
} from "@/app/assets/images";
import Image from "next/image";
import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

const Screenshots = () => {
  return (
    <section id="screens" className="relative z-20 pt-[110px]">
      <div className="container">
        <div
          className="wow fadeInUp mx-auto mb-10 max-w-[690px] text-center"
          data-wow-delay=".2s"
        >
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            App Screenshots
          </h2>
          <p className="text-base text-body">
            Explore the clean UI of our Gadiyo app with these preview screens.
          </p>
        </div>
      </div>

      <div className="container">
        <div
          className="wow fadeInUp mx-auto max-w-[1000px]"
          data-wow-delay=".2s"
        >
          {/* Swiper */}
          <div className="swiper mySwiper relative z-20">
            <div className="absolute top-0 left-0 right-0 z-50 mx-auto w-full md:w-1/3">
              <Image
                src={MobileFrame}
                alt="mobile-frame"
                className="mx-auto max-w-full"
              />
            </div>

            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
              spaceBetween={30}
              centeredSlides
              loop
              breakpoints={{
                0: { slidesPerView: 1 },
                768: { slidesPerView: 3 },
              }}
              className="swiper-wrapper py-2"
            >
              {[AppSS1, AppSS2, AppSS3, AppSS4, AppSS5].map((img, i) => (
                <SwiperSlide key={i}>
                  <div className="mx-auto w-full max-w-[252px] xs:max-w-[265px]">
                    <Image
                      src={img}
                      alt="screenshot"
                      className="mx-auto w-full rounded-2xl"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="flex items-center justify-center space-x-4 pt-20">
              <button className="swiper-button-prev">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_46_342)">
                    <path
                      d="M6.52334 10.8334L10.9933 15.3034L9.81501 16.4817L3.33334 10L9.815 3.51836L10.9933 4.69669L6.52334 9.16669L16.6667 9.16669L16.6667 10.8334L6.52334 10.8334Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_46_342">
                      <rect
                        width="20"
                        height="20"
                        fill="white"
                        transform="translate(20 20) rotate(180)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </button>
              <button className="swiper-button-next">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_46_337)">
                    <path
                      d="M13.4767 9.16664L9.00667 4.69664L10.185 3.51831L16.6667 9.99998L10.185 16.4816L9.00667 15.3033L13.4767 10.8333H3.33334V9.16664H13.4767Z"
                      fill="currentColor"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_46_337">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Graphics */}
      <div className="absolute left-0 top-0 -z-10">
        <svg
          width="95"
          height="190"
          viewBox="0 0 95 190"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cy="95"
            r="77"
            stroke="url(#paint0_linear_47_26)"
            strokeWidth="36"
          />
          <defs>
            <linearGradient
              id="paint0_linear_47_26"
              x1="-117.84"
              y1="190"
              x2="117.828"
              y2="25.9199"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#EDD8BA" />
              <stop offset="0.541667" stopColor="#F0E0C8" />
              <stop offset="1" stopColor="#D3B699" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Screenshots;
