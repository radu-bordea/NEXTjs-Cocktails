import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";
import NavBar from "@/components/NavBar";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <main>
      <NavBar />
    </main>
  );
}
