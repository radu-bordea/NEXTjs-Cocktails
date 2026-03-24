import { ScrollTrigger, SplitText } from "gsap/all";
import gsap from "gsap";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Home() {
  return (
    <div className="flex-center h-screen">
      <h1 className="text-3xl text-indigo-300">Hello, GSAP!</h1>
    </div>
  );
}
