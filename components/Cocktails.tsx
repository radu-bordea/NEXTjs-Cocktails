"use client";

import { cocktailLists, mockTailLists } from "@/utils/navlinks";
import Image from "next/image";
import { useEffect, useRef } from "react";

// GSAP
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register plugin
gsap.registerPlugin(ScrollTrigger);

const Cocktails = () => {
  // Ref for the section container (safe for Next.js)
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return; // safe guard

    const section = sectionRef.current;

    // Title animation
    gsap.fromTo(
      section.querySelectorAll(".cocktails-title"),
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        duration: 2.2, // slower than before
        ease: "expo.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Cards fade in
    gsap.fromTo(
      section.querySelectorAll(".cocktail-card"),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.4,
        stagger: 0.25,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Items inside cards
    gsap.fromTo(
      section.querySelectorAll(".cocktail-item"),
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Leaves parallax
    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    })
      .to("#c-right-leaf", { y: 180, x: 30, ease: "none" }, 0)
      .to("#c-left-leaf", { y: -180, x: -30, ease: "none" }, 0);

    ScrollTrigger.refresh();
  }, []);

  return (
    <section
      id="cocktails"
      ref={sectionRef}
      className="relative py-24 px-6 md:px-16 overflow-visible"
    >
      {/* Decorative Leaves */}
      <Image
        src="/images/cocktail-left-leaf.png"
        alt="Decorative left leaf"
        width={200}
        height={200}
        id="c-left-leaf"
        className="absolute left-0 top-10 z-0 opacity-60 pointer-events-none will-change-transform"
      />
      <Image
        src="/images/cocktail-right-leaf.png"
        alt="Decorative right leaf"
        width={200}
        height={200}
        id="c-right-leaf"
        className="absolute right-0 top-20 z-0 opacity-60 pointer-events-none will-change-transform"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Title */}
        <h2 className="cocktails-title text-3xl md:text-5xl font-bold text-center mb-16">
          Our Menu
        </h2>

        {/* Grid Layout */}
        <div className="cocktails-grid grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Cocktails */}
          <div className="cocktail-card backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-xl md:text-2xl font-semibold mb-6">Cocktails</h3>
            <ul className="space-y-6">
              {cocktailLists.map((item) => (
                <li
                  key={item.name}
                  className="cocktail-item flex justify-between items-start border-b border-white/10 pb-4 transition-all duration-300 hover:translate-x-1 hover:border-white/30"
                >
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm opacity-70">
                      {item.country} | {item.detail}
                    </p>
                  </div>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mocktails */}
          <div className="cocktail-card backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 md:p-8 shadow-2xl">
            <h3 className="text-xl md:text-2xl font-semibold mb-6">Mocktails</h3>
            <ul className="space-y-6">
              {mockTailLists.map((item) => (
                <li
                  key={item.name}
                  className="cocktail-item flex justify-between items-start border-b border-white/10 pb-4 transition-all duration-300 hover:translate-x-1 hover:border-white/30"
                >
                  <div>
                    <h4 className="font-semibold">{item.name}</h4>
                    <p className="text-sm opacity-70">
                      {item.country} | {item.detail}
                    </p>
                  </div>
                  <span>{item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;