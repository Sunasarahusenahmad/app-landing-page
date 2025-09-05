"use client";

interface Testimonial {
  quote: string;
  author: {
    name: string;
    role: string;
  };
}

const testimonials: Testimonial[] = [
  {
    quote:
      "Gadiyo has completely transformed how I manage my daily tasks. The interface is intuitive and the performance is outstanding!",
    author: {
      name: "Jagarala Tosif",
      role: "Travel Blogger",
    },
  },
  {
    quote:
      "The best mobile app I've ever used. The attention to detail and user experience is phenomenal. Highly recommended!",
    author: {
      name: "Mo Jahid",
      role: "Travel Enthusiast",
    },
  },
  {
    quote:
      "Gadiyo's offline capabilities saved my productivity during a recent trip. It's now an essential part of my workflow.",
    author: {
      name: "Mashud Ekta Travels",
      role: "Travel Consultant",
    },
  },
  {
    quote:
      "Gadiyo provides seamless service and makes travel planning a breeze. Exceptional support and easy-to-use interface.",
    author: {
      name: "Taj Tours & Travels",
      role: "Travel Agency",
    },
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative z-10 pt-[110px] pb-[60px]">
      <div className="container">
        <div
          className="wow fadeInUp mx-auto mb-14 max-w-[690px] text-center lg:mb-[70px]"
          data-wow-delay=".2s"
        >
          <h2 className="mb-4 text-3xl font-bold text-black dark:text-white sm:text-4xl md:text-[44px] md:leading-tight">
            What Client's Say
          </h2>
          <p className="text-base text-body">
            Hear directly from our clients about their experience using Gadiyo.
          </p>
        </div>
      </div>

      <div className="container overflow-hidden lg:max-w-[1160px]">
        <div className="-mx-6 flex flex-wrap items-stretch">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full px-6 lg:w-1/2 flex">
              <div
                className="wow fadeInUp mb-[50px] flex-1 rounded-lg bg-white py-9 px-7 shadow-card dark:bg-dark dark:shadow-card-dark sm:px-9 lg:px-7 xl:px-9"
                data-wow-delay={`.${2 + index * 1}s`}
              >
                <div className="mb-5 border-b border-stroke dark:border-stroke-dark">
                  <p className="pb-9 text-base text-body">
                    {testimonial.quote}
                  </p>
                </div>

                <div className="items-center justify-between sm:flex lg:block xl:flex">
                  <div className="mb-4 flex items-center sm:mb-0 lg:mb-4 xl:mb-0">
                    <div>
                      <h5 className="text-base font-medium text-black dark:text-white">
                        {testimonial.author.name}
                      </h5>
                      <p className="text-sm text-body">
                        {testimonial.author.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3 sm:justify-end lg:justify-start xl:justify-end">
                    <p className="text-base font-medium text-black dark:text-white">
                      5.0
                    </p>
                    <div className="flex items-center space-x-[6px]">
                      {[...Array(5)].map((_, starIndex) => (
                        <span key={starIndex}>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M10 15.2171L4.1225 18.5071L5.435 11.9004L0.489166 7.32712L7.17833 6.53378L10 0.417114L12.8217 6.53378L19.5108 7.32712L14.565 11.9004L15.8775 18.5071L10 15.2171Z"
                              fill="#EABF23"
                            />
                          </svg>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
