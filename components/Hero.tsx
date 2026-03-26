"use client";

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

const Hero = () => {
  // const videoRef = useRef<HTMLVideoElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(() => {
    const heroSplit = new SplitText(".title", { type: "chars, words" });
    const paragraphSplit = new SplitText(".subtitle", { type: "lines" });

    heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

    gsap.from(heroSplit.chars, {
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
    });

    gsap.from(paragraphSplit.lines, {
      opacity: 0,
      yPercent: 100,
      duration: 1.8,
      ease: "expo.out",
      stagger: 0.06,
      delay: 1,
    });

    gsap
      .timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      })
      .to(".right-leaf", { y: 200 }, 0)
      .to(".left-leaf", { y: -200 }, 0);

    // ── Video scroll scrub ──────────────────────────────────────────
    // const startValue = isMobile ? "top 50%" : "center 60%";
    // const endValue = isMobile ? "120% top" : "bottom top";

    // const tl = gsap.timeline({
    //   scrollTrigger: {
    //     trigger: ".video-wrapper",
    //     start: startValue,
    //     end: endValue,
    //     scrub: true,
    //     pin: true,
    //   },
    // });

    // const video = videoRef.current;

    // if (video) {
    //   const setupVideoScrub = () => {
    //     if (video.duration && isFinite(video.duration)) {
    //       tl.to(video, { currentTime: video.duration });
    //     }
    //   };

    //   if (video.readyState >= 1) {
    //     setupVideoScrub();
    //   } else {
    //     video.addEventListener("loadedmetadata", setupVideoScrub, { once: true });
    //   }
    // }
  }, [isMobile]);

  return (
    <>
      {/* ── Hero section ─────────────────────────────────────────────── */}
      <section id="hero" className="relative sm:top-0">
        <h1 className="title absolute z-20 w-full">MOJITO</h1>

        <Image
          src="/images/ll.png"
          alt="Decorative left leaf"
          width={500}
          height={500}
          className="left-leaf z-0"
        />
        <Image
          src="/images/rl.png"
          alt="Decorative right leaf"
          width={500}
          height={500}
          className="right-leaf z-0"
        />

        <div className="body">
          <div className="content absolute top-60">
            <div className="space-y-5">
              <p>Cool .Crisp .Classic</p>
              <p className="subtitle">
                Sip the Spirit <br /> of Summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle ">
                Every cocktail on our menu is a blend of premium ingredients,
                creative flair, and timeless recipes — designed to delight your
                senses
              </p>
              <Link href="#cocktails">View Cocktails</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Video section ─────────────────────────────────────────────
           FIXES applied here:
           
           1. Renamed class to "video-wrapper" — avoids conflicting with the
              raw <video> HTML tag selector that GSAP/CSS might accidentally
              target instead of this wrapper div.

           2. Removed "absolute inset-0" — this was the main reason the video
              was invisible. "absolute inset-0" pins the div to its nearest
              positioned ancestor (likely the page root), placing it BEHIND
              the #hero section with no visible space of its own in the
              document flow.

           3. Added "relative w-full h-screen overflow-hidden" — gives the
              wrapper a real place in the page layout so it appears below
              the hero section and GSAP can pin it correctly on scroll.

           4. Added "w-full h-full object-cover" to the <video> element —
              without explicit dimensions the video renders at 0×0 (its
              default intrinsic size before the src loads) and stays invisible.
      ──────────────────────────────────────────────────────────────── */}
      {/* <div className="video-wrapper absolute opacity-20 z-30 inset-0  w-full h-screen overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          src="/videos/output.mp4"
          className="w-full h-full object-cover"
        />
      </div> */}
    </>
  );
};

export default Hero;
