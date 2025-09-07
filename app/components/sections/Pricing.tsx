"use client";

import React, { useState } from "react";

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  const togglePlan = () => {
    setIsYearly(!isYearly);
  };

  return (
    <>
      {/* <!-- ======= Pricing Start ======= --> */}
      <section id="pricing" className="relative z-10 pt-[110px]">
        <div className="container">
          <div
            className="wow fadeInUp mx-auto mb-10 max-w-[690px] text-center"
            data-wow-delay=".2s"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
              Choose Your Gadiyo Plan
            </h2>
            <p className="text-base text-gray-600 dark:text-gray-300">
              Book rides with local agencies easily. Choose the plan that fits
              your travel needs in your city.
            </p>
          </div>
        </div>
        <div className="container max-w-[1120px] overflow-hidden">
          <div
            className="wow fadeInUp mb-[60px] flex items-center justify-center"
            data-wow-delay=".25s"
          >
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                name="togglePlan"
                id="togglePlan"
                className="sr-only"
                checked={isYearly}
                onChange={togglePlan}
              />
              <span
                className={`monthly text-sm font-medium ${
                  !isYearly ? "text-blue-600" : "text-gray-500"
                } dark:text-white`}
              >
                Monthly
              </span>
              <span className="mx-5 flex h-[34px] w-[60px] cursor-pointer items-center rounded-full bg-primary p-[3px]">
                {" "}
                <span className="dot block h-7 w-7 rounded-full bg-white duration-300"></span>{" "}
              </span>
              <span
                className={`yearly text-sm font-medium ${
                  isYearly ? "text-blue-600" : "text-gray-500"
                } dark:text-white`}
              >
                Yearly
              </span>
            </label>
          </div>

          <div className="-mx-6 flex flex-wrap justify-center">
            {/* Free Trial Card */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div
                className="wow h-full fadeInUp mb-10 flex flex-col rounded-xl bg-white py-10 px-9 shadow-card dark:bg-dark dark:shadow-card-dark lg:mb-4 lg:px-7 xl:px-9"
                data-wow-delay=".2s"
              >
                <h3 className="mb-2 text-[22px] font-semibold leading-tight text-black dark:text-white">
                  Free Trial
                </h3>
                <p className="mb-7 text-base text-body">
                  Try Gadiyo for one month completely free.
                </p>

                <p className="border-b border-stroke pb-5 text-black dark:border-stroke-dark dark:text-white">
                  <span className="text-[40px] font-bold leading-none">
                    <sup className="text-[22px] font-medium"> ₹ </sup>0
                  </span>
                  <span className="text-base text-body"> /month </span>
                </p>

                <div className="space-y-4 pt-[30px] pb-10 flex-1">
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    5 free rides
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Local agency access
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Basic support
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    No credit card required
                  </p>
                </div>

                <a
                  href="javascript:void(0)"
                  className="mt-auto block w-full rounded-md bg-black py-[10px] px-8 text-center text-base font-medium text-white hover:bg-primary dark:bg-[#2A2E44] dark:hover:bg-primary"
                >
                  Start Free Trial
                </a>
              </div>
            </div>

            {/* Main Plan - Monthly/Yearly */}
            <div className="w-full px-6 md:w-1/2 lg:w-1/3">
              <div
                className="wow h-full relative fadeInUp mb-10 flex flex-col rounded-xl bg-white py-10 px-9 lg:mb-4 lg:px-7 xl:px-9 overflow-hidden border-2"
                data-wow-delay=".3s"
              >
                <span
                  className="absolute rotate-45 bg-primary text-sm font-bold text-white shadow"
                  style={{ top: "15px", right: "-30px", padding: "5px 30px" }}
                >
                  Popular
                </span>

                <h3 className="mb-2 text-[22px] font-semibold leading-tight text-black dark:text-white">
                  {isYearly ? "Premium Yearly" : "Premium Monthly"}
                </h3>
                <p className="mb-7 text-base text-body">
                  {isYearly
                    ? "Best value for regular riders"
                    : "Perfect for flexible travel"}
                </p>

                <p className="border-b border-stroke pb-5 text-black dark:border-stroke-dark dark:text-white">
                  <span className="text-[40px] font-bold leading-none">
                    <sup className="text-[22px] font-medium"> ₹ </sup>
                    {isYearly ? "999" : "99"}
                  </span>
                  <span className="text-base text-body">
                    {" "}
                    {isYearly ? "/year" : "/month"}{" "}
                  </span>
                </p>

                <div className="space-y-4 pt-[30px] pb-10 flex-1">
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    {isYearly ? "Unlimited rides" : "Up to 50 rides"}
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    Priority booking
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    24/7 Support
                  </p>
                  <p className="flex text-base text-black dark:text-body">
                    <span className="mr-[10px] mt-1">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_44_7)">
                          <path
                            d="M6.66674 10.1147L12.7947 3.98599L13.7381 4.92866L6.66674 12L2.42407 7.75733L3.36674 6.81466L6.66674 10.1147Z"
                            fill="#00BE6C"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_44_7">
                            <rect width="16" height="16" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    {isYearly
                      ? "Premium vehicle options"
                      : "Standard vehicle options"}
                  </p>
                </div>

                <a
                  href="javascript:void(0)"
                  className="block mt-auto w-full rounded-md bg-primary py-[10px] px-8 text-center text-base font-medium text-white hover:bg-opacity-90"
                >
                  Choose Plan
                </a>
              </div>
            </div>

            {/* Feature Card - Gadiyo Benefits */}
            <div className="w-full px-4 md:w-1/2 lg:w-1/3">
              <div
                className="wow h-full relative fadeInUp mb-10 flex flex-col rounded-xl bg-white py-10 px-9 shadow-card dark:bg-dark dark:shadow-card-dark lg:mb-4 lg:px-7 xl:px-9"
                data-wow-delay=".3s"
              >
                <h3 className="mb-2 text-[22px] font-semibold leading-tight text-black dark:text-white">
                  Why Choose Gadiyo?
                </h3>
                <p className="mb-7 text-base text-gray-600 dark:text-gray-300">
                  Connect with trusted local agencies
                </p>

                <div className="space-y-4 pt-[10px] pb-10 flex-1">
                  <div className="flex items-start text-base text-black dark:text-gray-300">
                    <span className="mr-3 mt-1 bg-blue-100 rounded-full p-1">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 0l2.4 4.8L16 5.6l-4 3.9.9 5.5L8 12.4 3.1 15l.9-5.5-4-3.9 5.6-.8L8 0z"
                          fill="#fab12f"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium">Local Agency Network</p>
                      <p className="text-sm text-gray-500">
                        Connect with verified local agencies in your city
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start text-base text-black dark:text-gray-300">
                    <span className="mr-3 mt-1 bg-green-100 rounded-full p-1">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.5 8a5.5 5.5 0 11-11 0 5.5 5.5 0 0111 0z"
                          fill="#10B981"
                        />
                        <path
                          d="M8 4v4l3 2"
                          stroke="white"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium">Quick Booking</p>
                      <p className="text-sm text-gray-500">
                        Book rides instantly with real-time availability
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start text-base text-black dark:text-gray-300">
                    <span className="mr-3 mt-1 bg-purple-100 rounded-full p-1">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M8 2v6l4 2"
                          stroke="#8B5CF6"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="8"
                          cy="8"
                          r="6"
                          stroke="#8B5CF6"
                          strokeWidth="2"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium">Agency Promotion</p>
                      <p className="text-sm text-gray-500">
                        Local agencies can showcase their fleet directly
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start text-base text-black dark:text-gray-300">
                    <span className="mr-3 mt-1 bg-yellow-100 rounded-full p-1">
                      <svg
                        width="16"
                        height="16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9 12l2 2 4-4"
                          stroke="#F59E0B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 12v1a2 2 0 002 2h6.5"
                          stroke="#F59E0B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 6V5a2 2 0 012-2h10a2 2 0 012 2v6a2 2 0 01-2 2H9"
                          stroke="#F59E0B"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-medium">Trusted & Safe</p>
                      <p className="text-sm text-gray-500">
                        All agencies verified with transparent pricing
                      </p>
                    </div>
                  </div>
                </div>

                <a
                  href="javascript:void(0)"
                  className="mt-auto block w-full rounded-md bg-black py-[10px] px-8 text-center text-base font-medium text-white hover:bg-primary dark:bg-[#2A2E44] dark:hover:bg-primary"
                >
                  Download Gadiyo
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ======= Pricing End ======= --> */}
    </>
  );
};

export default Pricing;
