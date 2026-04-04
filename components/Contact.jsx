import { openingHours, socials } from "@/utils/navlinks";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";

const Contact = () => {
 	useGSAP(() => {
		const titleSplit = SplitText.create('#contact h2', { type: 'words' });
		
		const timeline = gsap.timeline({
		 scrollTrigger: {
			trigger: '#contact',
			start: 'top center',
		 },
		 ease: "power1.inOut"
		})
	 
	 timeline
		.from(titleSplit.words, {
		 opacity: 0, yPercent: 100, stagger: 0.02
	 })
		.from('#contact h3, #contact p', {
			opacity: 0, yPercent: 100, stagger: 0.02
	 })
		.to('#f-right-leaf', {
		 y: '-50', duration: 1, ease: 'power1.inOut'
	 }).to('#f-left-leaf', {
		 y: '-50', duration: 1, ease: 'power1.inOut'
	 }, '<')
	})

  return (
    <footer id="contact">
      <Image
        src="/images/footer-right-leaf.png"
        alt="leaf-right"
        id="f-right-leaf"
        width={100}
        height={100}
      />
      <Image
        src="/images/footer-left-leaf.png"
        alt="leaf-left"
        id="f-left-leaf"
        width={100}
        height={100}
      />

      <div className="content">
        <h2>Where to Find Us</h2>

        <div>
          <h3>Visit Our Bar</h3>
          <p>123 Main Street, City, State 12345</p>
        </div>

        <div>
          <h3>Contact Us</h3>
          <p>Phone: (123) 456-7890</p>
          <p>Email: info@ourbar.com</p>
        </div>

        <div>
          <h3>Open Everyday</h3>
          {openingHours.map((item) => (
            <p key={item.day}>
              {item.day}: {item.time}
            </p>
          ))}
        </div>

        <div>
          <h3>Socials</h3>
          <div className="flex-center gap-5 pt-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="social.name"
              >
                <Image src={social.icon} alt={social.name} width={30} height={30} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Contact;
