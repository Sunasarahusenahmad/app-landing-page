"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gadiyo } from "@/app/assets/images";
import Image from "next/image";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/features", label: "Features" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      {/* <!-- ======= Header Start ======= --> */}
      <header className="navbar absolute top-0 left-0 z-50 w-full border-stroke bg-white duration-300 dark:border-stroke-dark dark:bg-black">
        <div className="container relative max-w-[1400px]">
          <div className="flex items-center justify-between">
            <div className="block py-4 lg:py-0">
              <Link href="/" className="block max-w-[120px] sm:max-w-[120px]">
                <Image
                  src={Gadiyo}
                  alt="logo"
                  width={150}
                  height={40}
                  className="block dark:hidden"
                />
              </Link>
            </div>

            {/* Hamburger Menu Button - Added onClick handler */}
            <button
              onClick={toggleMenu}
              className="navbarOpen absolute right-4 top-1/2 z-50 flex h-10 w-10 -translate-y-1/2 flex-col items-center justify-center space-y-[6px] font-bold lg:hidden"
              aria-label="navbarOpen"
              name="navbarOpen"
            >
              <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
              <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
              <span className="block h-[2px] w-7 bg-black dark:bg-white"></span>
            </button>

            {/* Menu Wrapper - Added conditional visibility */}
            <div
              className={`menu-wrapper relative justify-between lg:flex ${
                isMenuOpen ? "block" : "hidden"
              }`}
            >
              {/* Close Button - Added onClick handler */}
              <button
                onClick={closeMenu}
                className="navbarClose fixed top-10 right-10 z-[9999] flex h-10 w-10 flex-col items-center justify-center font-bold lg:hidden"
                name="navbarClose"
                aria-label="navbarClose"
              >
                <span className="block h-[2px] w-7 rotate-45 bg-black dark:bg-white"></span>
                <span className="-mt-[2px] block h-[2px] w-7 -rotate-45 bg-black dark:bg-white"></span>
              </button>

              <nav className="fixed top-0 left-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-95 text-center backdrop-blur-sm dark:bg-black dark:bg-opacity-95 lg:static lg:h-auto lg:w-max lg:bg-transparent lg:backdrop-blur-none lg:dark:bg-transparent">
                <ul className="items-center space-y-3 lg:flex lg:space-x-8 lg:space-y-0 xl:space-x-10">
                  <li className="menu-item">
                    <a
                      href="#features"
                      onClick={closeMenu} // Close menu when clicking nav item
                      className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                    >
                      Features
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="#about"
                      onClick={closeMenu} // Close menu when clicking nav item
                      className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                    >
                      About
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="#work-process"
                      onClick={closeMenu} // Close menu when clicking nav item
                      className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                    >
                      How It Works
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="#pricing"
                      onClick={closeMenu} // Close menu when clicking nav item
                      className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                    >
                      Pricing
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="#support"
                      onClick={closeMenu} // Close menu when clicking nav item
                      className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                    >
                      Support
                    </a>
                  </li>
                  <li className="menu-item">
                    <a
                      href="/blogs"
                      onClick={closeMenu}
                      className="menu-scroll inline-flex items-center text-base font-medium text-black hover:text-primary dark:text-white dark:hover:text-primary lg:py-7"
                    >
                      Blogs
                    </a>
                  </li>
                </ul>
              </nav>
            </div>

            <a
              href="#"
              className="hidden rounded-md bg-primary py-[10px] px-[30px] text-base font-medium text-white hover:bg-opacity-90 sm:inline-block"
            >
              <div className="flex items-center">
                <span>Download Now</span>
                <span className="pl-3">
                  <svg
                    width="20"
                    height="20"
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
              </div>
            </a>
          </div>
        </div>
      </header>
      {/* <!-- ======= Header End ======= --> */}
    </>
  );
}
