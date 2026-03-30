"use client";
// pages/index.tsx
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Cocktails from "@/components/Cocktails";
import Art from "@/components/Art";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const bgRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (!bgRef.current) return;

  //   gsap.to(bgRef.current, {
  //     yPercent: 20, // background moves 20% slower than scroll
  //     ease: "none",
  //     scrollTrigger: {
  //       trigger: bgRef.current,
  //       start: "top top",
  //       end: "bottom top",
  //       scrub: true,
  //     },
  //   });
  // }, []);

  return (
    <main className="relative w-full overflow-x-hidden">
      {/* Parallax background */}
      <div
        ref={bgRef}
        className="fixed inset-0 z-0 bg-[url('/images/bg2.jpg')] bg-cover bg-center"
      />

      {/* Foreground content */}
      <div className="relative z-10">
        <NavBar />
        <Hero />
        <Cocktails />
        <About />
        <Art/>
      </div>
    </main>
  );
}
