"use client";

import Icons from "../utils/Icons";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Icons name={"Car"} size={30} color="#fab12f" />,
    title: "Wide Car Selection",
    description:
      "Browse from a variety of cars including hatchbacks, sedans, SUVs, and premium rides from trusted local agencies.",
  },
  {
    icon: <Icons name={"MapPin"} size={30} color="#fab12f" />,
    title: "Verified Local Agencies",
    description:
      "Book confidently with agencies that are verified and rated, ensuring transparent pricing and safe travel.",
  },
  {
    icon: <Icons name={"Clock"} size={30} color="#fab12f" />,
    title: "Instant Booking",
    description:
      "Reserve your car in just a few taps with real-time availability and instant confirmations.",
  },
  {
    icon: <Icons name={"RefreshCw"} size={30} color="#fab12f" />,
    title: "Flexible Trips",
    description:
      "Choose one-way or round trips, airport transfers, or special occasion rides as per your convenience.",
  },
  {
    icon: <Icons name={"Shield"} size={30} color="#fab12f" />,
    title: "Safe & Reliable",
    description:
      "Travel stress-free with agencies that follow strict safety standards and provide reliable vehicles.",
  },
  {
    icon: <Icons name={"User"} size={30} color="#fab12f" />,
    title: "Dashboard & Reviews",
    description:
      "Easily manage your bookings, track inquiries, and share your reviews with agencies directly from your dashboard.",
  },
];

export default function Features() {
  return (
    <section id="features" className="relative z-10 pt-[110px]">
      <div className="container">
        <div
          className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
          data-wow-delay=".2s"
        >
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            Discover Why Gadiyo Makes Travel Simple
          </h2>
          <p className="text-base text-body">
            From quick bookings to trusted agencies, Gadiyo brings you a
            seamless and secure way to rent cars across India.
          </p>
        </div>
      </div>

      <div className="container max-w-[1390px]">
        <div className="rounded-2xl bg-white px-5 pt-14 pb-14 shadow-card dark:bg-dark dark:shadow-card-dark lg:pt-20 xl:px-10">
          <div className="-mx-4 flex flex-wrap">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="w-full px-4 md:w-1/2 lg:w-1/3"
              >
                <div
                  className="wow fadeInUp group mx-auto mb-[60px] max-w-[310px] text-center"
                  data-wow-delay={`${0.2 + index * 0.1}s`}
                >
                  <div
                    className="mx-auto mb-8 flex h-[90px] w-[90px] items-center justify-center rounded-3xl bg-gray text-primary duration-300 group-hover:text-white hover:text-white dark:bg-[#2A2E44] dark:text-white dark:group-hover:bg-primary"
                    aria-label={feature.title}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="mb-4 text-xl font-semibold text-black dark:text-white sm:text-[22px] xl:text-[26px]">
                    {feature.title}
                  </h3>
                  <p className="text-base text-body">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
