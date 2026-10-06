import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let lenis: Lenis | null = null;

/**
 * Lazily create a single shared Lenis instance wired into GSAP's ticker and
 * ScrollTrigger. Safe to call from multiple component scripts — subsequent
 * calls return the existing instance. Returns `null` when the visitor has
 * asked for reduced motion, in which case native scrolling is left untouched.
 */
export function getLenis(): Lenis | null {
  if (prefersReducedMotion) return null;
  if (lenis) return lenis;

  lenis = new Lenis({ lerp: 0.12 });
  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  return lenis;
}

export { gsap, ScrollTrigger };
