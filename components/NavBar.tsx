"use client";

// Import navigation link data (typed array of section links)
import { navLinks } from "@/utils/navlinks";

// Next.js components for client-side routing and optimized images
import Link from "next/link";
import Image from "next/image";

// GSAP animation hooks and core library
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// GSAP plugins
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

// Register GSAP plugins (required for them to work)
gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * NavBar Component
 * ----------------
 * Responsive navigation bar with:
 * - Logo + brand name
 * - Navigation links
 * - Scroll-based background animation using GSAP
 */
const NavBar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Optional: GSAP for smooth background fade
  useEffect(() => {
    gsap.to("nav", {
      backgroundColor: scrolled ? "rgba(0,0,0,0.7)" : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "blur(0px)",
      duration: 0.5,
      ease: "power1.out",
    });
  }, [scrolled]);

  /**
   * GSAP Animation Hook
   * -------------------
   * Adds a smooth background + blur effect to the navbar
   * when the user scrolls down the page.
   */
  useGSAP(() => {
    const navTween = gsap.timeline({
      // NOTE: This should ideally use ScrollTrigger (see improvement below)
      trigger: "nav",
      start: "bottom top",
    });

    // Animate navbar from transparent → semi-transparent with blur
    navTween.fromTo(
      "nav",
      { background: "transparent" },
      {
        background: "#00000050", // semi-transparent black
        backdropFilter: "blur(10px)", // glass effect
        duration: 1,
        ease: "power1.inOut",
      },
    );
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      {/* Container for layout (logo + links) */}
      <div className="flex flex-row items-center justify-between p-4">
        {/* Logo + Brand Name (click scrolls to home section) */}
        <Link href="#home" className="flex items-center gap-2">
          <Image
            src="/images/fav.jpg"
            alt="Cocktails Lovable logo"
            width={40}
            height={40}
            className="object-contain rounded-full"
          />
          <p className="font-semibold">Cocktails Lovable</p>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-6 ">
          {navLinks.map((link) => (
            <li key={link.id}>
              {/* Each link scrolls to a section by ID */}
              <Link
                href={`#${link.id}`}
                className="hover:text-gray-300 transition-colors"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger button */}
        <button
          className="md:hidden flex flex-col gap-1.5"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${
              mobileOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform ${
              mobileOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <ul className="md:hidden flex flex-col bg-black/80 backdrop-blur-lg text-white p-6 gap-6">
          {navLinks.map((link) => (
            <li key={link.id}>
              <Link
                href={`#${link.id}`}
                onClick={() => setMobileOpen(false)}
                className="hover:text-yellow-500 transition-colors text-lg"
              >
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
