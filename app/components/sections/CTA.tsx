"use client";

import { CTAMockup } from "@/app/assets/images";
import Image from "next/image";

export default function CTA() {
  return (
    <>
      {/* <!-- ======= CTA Start ======= --> */}
      <section id="cta" className="relative z-10 pt-[110px]">
        <div className="container max-w-[1390px]">
          <div className="rounded-2xl bg-white px-10 pt-14 shadow-card dark:bg-dark dark:shadow-card-dark sm:px-20 lg:px-12 lg:pt-20 xl:px-20">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full self-center px-4 lg:w-1/2">
                <div
                  className="wow fadeInUp mx-auto max-w-[530px] text-center lg:ml-0 lg:text-left"
                  data-wow-delay=".2s"
                >
                  <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[38px] md:leading-tight">
                    Download Gadiyo Now & Start Managing Your Rides
                    Effortlessly!
                  </h2>
                  <p className="mb-10 text-base text-body">
                    Book taxis, plan trips, and track your rides all in one
                    place. Download Gadiyo today and enjoy a seamless travel
                    experience - completely free!
                  </p>

                  <div className="-mx-[10px] flex flex-wrap items-center justify-center lg:justify-start">
                    <div className="inline-block px-[10px]">
                      <a
                        href="javascript:void(0)"
                        className="mb-5 inline-flex items-center rounded-md bg-primary py-[10px] pl-4 pr-5 text-white hover:bg-opacity-90"
                      >
                        <span className="mr-[10px]">
                          <svg
                            width="34"
                            height="34"
                            viewBox="0 0 34 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M4 28.9958V4.9125C4 4.07667 4.48167 3.34 5.19 3L19.1442 16.9542L5.19 30.9083C4.48167 30.5542 4 29.8317 4 28.9958ZM23.5642 21.3742L8.32083 30.1858L20.3483 18.1583L23.5642 21.3742ZM28.31 15.2683C28.7917 15.6508 29.1458 16.2458 29.1458 16.9542C29.1458 17.6625 28.8342 18.2292 28.3383 18.6258L25.0942 20.4958L21.5525 16.9542L25.0942 13.4125L28.31 15.2683ZM8.32083 3.7225L23.5642 12.5342L20.3483 15.75L8.32083 3.7225Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <span className="text-left">
                          <span className="block text-xs opacity-70">
                            Get it on
                          </span>
                          <span className="block text-sm font-medium">
                            Google Play
                          </span>
                        </span>
                      </a>
                    </div>

                    <div className="inline-block px-[10px]">
                      <a
                        href="javascript:void(0)"
                        className="mb-5 inline-flex items-center rounded-md bg-black py-[10px] pl-4 pr-5 text-white hover:bg-opacity-90 dark:bg-white dark:text-black dark:hover:bg-opacity-90"
                      >
                        <span className="mr-[10px]">
                          <svg
                            width="34"
                            height="34"
                            viewBox="0 0 34 34"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M26.5058 27.625C25.33 29.3817 24.0833 31.0959 22.185 31.1242C20.2867 31.1667 19.6775 30.005 17.5242 30.005C15.3567 30.005 14.6908 31.0959 12.8917 31.1667C11.0358 31.2375 9.63333 29.2967 8.44333 27.5825C6.02083 24.0834 4.165 17.6375 6.65833 13.3025C7.89083 11.1492 10.1008 9.78921 12.495 9.74671C14.3083 9.71837 16.0367 10.9792 17.1558 10.9792C18.2608 10.9792 20.3575 9.46337 22.5533 9.69004C23.4742 9.73254 26.0525 10.0584 27.71 12.495C27.5825 12.58 24.6358 14.3084 24.6642 17.8925C24.7067 22.1709 28.4183 23.6017 28.4608 23.6159C28.4183 23.715 27.8658 25.6559 26.5058 27.625ZM18.4167 4.95837C19.4508 3.78254 21.165 2.89004 22.5817 2.83337C22.7658 4.49087 22.1 6.16254 21.1083 7.35254C20.1308 8.55671 18.5158 9.49171 16.9292 9.36421C16.7167 7.73504 17.51 6.03504 18.4167 4.95837Z"
                              fill="currentColor"
                            />
                          </svg>
                        </span>
                        <span className="text-left">
                          <span className="block text-xs opacity-70">
                            Download from
                          </span>
                          <span className="block text-sm font-medium">
                            App Store
                          </span>
                        </span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full px-4 lg:w-1/2">
                <div
                  className="wow fadeInUp relative z-10 mx-auto mt-20 max-w-[435px] lg:mt-0"
                  data-wow-delay=".3s"
                >
                  <Image
                    src={CTAMockup}
                    alt="CTA Image"
                    className="mx-auto max-w-full"
                  />

                  <div className="absolute -top-5 left-0 right-0 -z-10 aspect-square w-full rounded-full bg-gradient-2"></div>
                  <div className="absolute top-0 right-0 -z-10">
                    <svg
                      width="60"
                      height="43"
                      viewBox="0 0 60 43"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g clipPath="url(#clip0_47_16)">
                        <path
                          d="M18.3392 1.12402C18.342 1.06386 18.3451 1.00425 18.3484 0.94519C18.3456 1.00499 18.3425 1.06459 18.3392 1.12402C18.0601 7.2551 21.0899 18.9962 35.5087 18.295C29.6192 18.7078 17.9481 22.8922 18.347 36.3249C18.164 30.4662 14.3716 18.8894 0.685511 18.8251C0.56152 18.827 0.43993 18.8273 0.320892 18.8261C0.443205 18.8249 0.564743 18.8245 0.685511 18.8251C6.49532 18.7353 17.5757 15.1217 18.3392 1.12402Z"
                          fill="#fab12f"
                        />
                        <path
                          d="M48.8789 21.0097C48.8805 20.9735 48.8824 20.9378 48.8844 20.9023C48.8827 20.9382 48.8808 20.974 48.8789 21.0097C48.7114 24.6883 50.5293 31.733 59.1806 31.3122C55.6469 31.5599 48.6442 34.0705 48.8836 42.1302C48.7737 38.615 46.4983 31.6689 38.2867 31.6303C38.2123 31.6315 38.1393 31.6316 38.0679 31.6309C38.1413 31.6301 38.2142 31.6299 38.2867 31.6303C41.7725 31.5764 48.4208 29.4082 48.8789 21.0097Z"
                          fill="#4E342E"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_47_16">
                          <rect
                            width="58.8596"
                            height="41.2017"
                            fill="white"
                            transform="translate(0.320892 0.94519)"
                          />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Graphics --> */}
        <div className="absolute right-0 -top-[250px] -z-10">
          <svg
            width="610"
            height="1183"
            viewBox="0 0 610 1183"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g opacity="0.2" filter="url(#filter0_f_47_19)">
              <circle
                cx="591.5"
                cy="591.5"
                r="341.5"
                fill="url(#paint0_linear_47_19)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_47_19"
                x="0"
                y="0"
                width="1183"
                height="1183"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="125"
                  result="effect1_foregroundBlur_47_19"
                />
              </filter>
              <linearGradient
                id="paint0_linear_47_19"
                x1="250"
                y1="250"
                x2="1057.46"
                y2="718.481"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FF8FE8" />
                <stop offset="1" stopColor="#FFC960" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className="absolute left-0 top-10 -z-10 hidden sm:block">
          <svg
            width="706"
            height="1405"
            viewBox="0 0 706 1405"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[400px] md:w-[700px]"
          >
            <g opacity="0.25" filter="url(#filter0_f_47_21)">
              <circle
                cx="3.5"
                cy="702.5"
                r="442.5"
                fill="url(#paint0_linear_47_21)"
              />
            </g>
            <defs>
              <filter
                id="filter0_f_47_21"
                x="-699"
                y="0"
                width="1405"
                height="1405"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="130"
                  result="effect1_foregroundBlur_47_21"
                />
              </filter>
              <linearGradient
                id="paint0_linear_47_21"
                x1="-545.385"
                y1="1145"
                x2="552.329"
                y2="380.732"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#8EA5FE" />
                <stop offset="0.541667" stopColor="#BEB3FD" />
                <stop offset="1" stopColor="#90D1FF" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </section>
      {/* <!-- ======= CTA End ======= --> */}
    </>
  );
}
