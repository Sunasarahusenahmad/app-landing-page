import { Gadiyo } from "@/app/assets/images";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      href: "https://twitter.com/gadiyo",
      label: "Twitter",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M18.36 2H21l-6.5 7.4L22 22h-7.3l-4.7-6.6L5.7 22H3l7-8L2 2h7.5l4.3 6.2ZM16.34 20h2.1L8.02 4h-2Z" />
        </svg>
      ),
    },
    {
      href: "https://facebook.com/gadiyo",
      label: "Facebook",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2V12h2.2l-.3 3h-1.9v7A10 10 0 0 0 22 12Z" />
        </svg>
      ),
    },
    {
      href: "https://instagram.com/gadiyo",
      label: "Instagram",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7Zm10 2c1.65 0 3 1.35 3 3v10c0 1.65-1.35 3-3 3H7c-1.65 0-3-1.35-3-3V7c0-1.65 1.35-3 3-3h10Zm-5 3.5A5.5 5.5 0 1 0 17.5 13 5.5 5.5 0 0 0 12 7.5Zm0 2A3.5 3.5 0 1 1 8.5 13 3.5 3.5 0 0 1 12 9.5ZM17.85 6.65a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z" />
        </svg>
      ),
    },
    {
      href: "https://linkedin.com/company/gadiyo",
      label: "LinkedIn",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="white"
          viewBox="0 0 24 24"
        >
          <path d="M19 3A2.94 2.94 0 0 1 22 6v12a2.94 2.94 0 0 1-3 3H5a2.94 2.94 0 0 1-3-3V6a2.94 2.94 0 0 1 3-3ZM8.34 18V10.7H5.67V18Zm-1.34-9.1a1.55 1.55 0 1 0-1.55-1.55A1.55 1.55 0 0 0 7 8.9ZM18.33 18v-4.09c0-2.18-1.16-3.19-2.72-3.19a2.34 2.34 0 0 0-2.13 1.17h-.05V10.7H10v7.3h2.57v-4.06c0-1.07.2-2.1 1.53-2.1s1.35 1.26 1.35 2.17V18Z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      {/* Footer */}
      <footer>
        <div className="bg-[#F8FAFB] pt-[95px] pb-[46px] dark:bg-[#15182A]">
          <div className="container max-w-[1390px]">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 lg:w-4/12 xl:w-5/12">
                <div
                  className="wow fadeInUp mb-11 max-w-[320px]"
                  data-wow-delay=".2s"
                >
                  <Link
                    href="/"
                    className="block max-w-[120px] sm:max-w-[120px]"
                  >
                    <Image
                      src={Gadiyo}
                      alt="Gadiyo - Car Rental Platform"
                      width={150}
                      height={40}
                      className="block dark:hidden"
                    />
                  </Link>
                  <p className="text-base text-body mt-4">
                    Connect with trusted car rental agencies across India. Find
                    the perfect vehicle for your journey with Gadiyo&apos;s
                    extensive network of verified rental partners.
                  </p>
                </div>
              </div>

              <div className="w-full px-4 lg:w-8/12 xl:w-7/12">
                <div className="-mx-4 flex flex-wrap">
                  <div className="w-full px-4 sm:w-1/2 md:w-4/12 lg:w-6/12">
                    <div className="wow fadeInUp mb-11" data-wow-delay=".25s">
                      <h3 className="mb-8 text-[22px] font-medium text-black dark:text-white">
                        Quick Links
                      </h3>

                      <ul className="space-y-[10px]">
                        <li>
                          <Link
                            href="#about"
                            className="inline-block text-base text-body hover:text-primary transition-colors duration-200"
                          >
                            About Us
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#contact"
                            className="inline-block text-base text-body hover:text-primary transition-colors duration-200"
                          >
                            Contact
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#features"
                            className="inline-block text-base text-body hover:text-primary transition-colors duration-200"
                          >
                            Features
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="#pricing"
                            className="inline-block text-base text-body hover:text-primary transition-colors duration-200"
                          >
                            Pricing
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="w-full px-4 sm:w-1/2 md:w-4/12 lg:w-6/12">
                    <div className="wow fadeInUp mb-11" data-wow-delay=".4s">
                      <h3 className="mb-8 text-[22px] font-medium text-black dark:text-white">
                        Contact
                      </h3>

                      <ul className="space-y-[10px]">
                        <li>
                          <a
                            href="mailto:support@gadiyo.com"
                            className="inline-block text-base text-body hover:text-primary transition-colors duration-200"
                          >
                            Email: support@gadiyo.com
                          </a>
                        </li>
                        <li>
                          <a
                            href="tel:+919876543210"
                            className="inline-block text-base text-body hover:text-primary transition-colors duration-200"
                          >
                            Phone: +91-98765-43210
                          </a>
                        </li>
                        <li>
                          <span className="inline-block text-base text-body">
                            Support Hours: 10 AM - 7 PM (Mon - Sat)
                          </span>
                        </li>
                        <li>
                          <span className="inline-block text-base text-body">
                            Address: Ahmedabad, Gujarat, India
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="wow fadeInUp bg-primary py-7 dark:bg-black"
          data-wow-delay=".2s"
        >
          <div className="container max-w-[1390px]">
            <div className="-mx-3 flex flex-wrap">
              <div className="order-last w-full px-3 lg:order-first lg:w-1/3">
                <p className="mt-4 text-center text-base text-white lg:mt-0 lg:text-left">
                  &copy; {currentYear} Gadiyo. All rights reserved
                </p>
              </div>

              <div className="w-full px-3 md:w-1/2 lg:w-1/3">
                <div className="mb-4 flex items-center justify-center space-x-5 md:mb-0 md:justify-start lg:justify-center">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>

              <div className="w-full px-3 md:w-1/2 lg:w-1/3">
                <div className="flex items-center justify-center space-x-4 sm:space-x-8 md:justify-end lg:justify-end">
                  <Link
                    href="/privacy-policy"
                    className="text-base text-white hover:text-opacity-80 transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms-and-conditions"
                    className="text-base text-white hover:text-opacity-80 transition-colors duration-200"
                  >
                    Terms and Conditions
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
