import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";

// Register GSAP plugins (required for them to work)
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <div className="h-[200vh] bg-black"></div>
    </main>
  );
}
