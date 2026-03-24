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
      <div className="flex items-center justify-between p-4">
        {/* Logo + Brand Name (click scrolls to home section) */}
        <Link href="#home" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Cocktails Lovable logo"
            width={40}
            height={40}
            className="object-contain"
          />
          <p className="font-semibold">Cocktails Lovable</p>
        </Link>

        {/* Navigation Links */}
        <ul className="flex gap-6">
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
      </div>
    </nav>
  );
};

export default NavBar;
