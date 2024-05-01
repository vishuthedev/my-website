import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const animateSection = (container: HTMLDivElement, sections: NodeListOf<Element>) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: container,
      start: 'top top',
      end: `+=${container.offsetWidth * (sections.length - 1)}`,
      scrub: 1,
      snap: 1 / (sections.length - 1),
      pin: true,
    },
  });

  tl.to(sections, {
    xPercent: -100 * (sections.length - 1),
    ease: 'none',
  });
};

// Add other animation functions as needed
