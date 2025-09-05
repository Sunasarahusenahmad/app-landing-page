import React from "react";

const HowItWorks = () => {
  return (
    <>
      {/* <!-- ======= Work Process Start ======= --> */}
      <section id="work-process" className="relative z-10 pt-[110px]">
        <div className="container">
          <div
            className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
            data-wow-delay=".2s"
          >
            <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
              How Gadiyo Works
            </h2>
            <p className="text-base text-body">
              Gadiyo makes booking rides and managing trips effortless. Follow
              these simple steps to start your journey.
            </p>
          </div>
        </div>

        <div className="container max-w-[1390px]">
          <div className="rounded-2xl bg-white px-5 pt-14 pb-14 shadow-card dark:bg-dark dark:shadow-card-dark md:pb-1 lg:pt-20 lg:pb-5 xl:px-10">
            <div className="-mx-4 flex flex-wrap justify-center">
              {/* Step 1 */}
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".2s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    {/* Icon for Install App */}
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M21.6667 16.6667H30L20 26.6667L10 16.6667H18.3333V5H21.6667V16.6667ZM6.66668 31.6667H33.3333V20H36.6667V33.3333C36.6667 33.7754 36.4911 34.1993 36.1785 34.5118C35.866 34.8244 35.442 35 35 35H5.00001C4.55798 35 4.13406 34.8244 3.8215 34.5118C3.50894 34.1993 3.33334 33.7754 3.33334 33.3333V20H6.66668V31.6667Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    Install the Gadiyo App
                  </h3>
                  <p className="text-base text-body">
                    Download Gadiyo from the App Store or Google Play to start
                    booking rides instantly.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".3s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    {/* Icon for Profile Setup */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="40"
                      height="40"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M4 21v-2a4 4 0 0 1 3-3.87" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    Create Your Profile
                  </h3>
                  <p className="text-base text-body">
                    Set up your account, add your details, and get ready to book
                    rides quickly.
                  </p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="w-full px-4 md:w-1/2 lg:w-1/3">
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay=".4s"
                >
                  <div className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:bg-primary group-hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary">
                    {/* Icon for Ride Booking */}
                    <svg
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.26834 7.44836C7.20178 5.51458 9.79501 4.38351 12.5277 4.28211C15.2603 4.18072 17.9302 5.11651 20.0017 6.9017C22.0713 5.11948 24.7377 4.18475 27.467 4.28463C30.1964 4.38452 32.7873 5.51165 34.7211 7.44037C36.6549 9.3691 37.7888 11.9571 37.8959 14.6862C38.0029 17.4153 37.0751 20.0841 35.2983 22.1584L22.3567 35.1417C21.7621 35.7365 20.9646 36.0845 20.1242 36.1161C19.2838 36.1476 18.4625 35.8603 17.825 35.3117L17.6417 35.1434L4.70168 22.1584C2.92583 20.0859 1.99764 17.4195 2.1027 14.6923C2.20776 11.9651 3.33832 9.37805 5.26834 7.44836Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    Book Your Ride
                  </h3>
                  <p className="text-base text-body">
                    Choose your destination, select a ride, and track it in
                    real-time for a safe and smooth journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- ======= Work Process End ======= --> */}
    </>
  );
};

export default HowItWorks;
