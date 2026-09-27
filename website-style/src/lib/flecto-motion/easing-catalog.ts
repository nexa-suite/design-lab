/**
 * Exact Forensic Easing Profiles
 * Extracted from high-resolution frame-by-frame deceleration analysis
 */

export const FLECTO_EASINGS = {
  // Card entry: heavy inertia deceleration without bounce (GSAP: power3.out)
  cardFlightDecel: 'cubic-bezier(0.16, 1.0, 0.30, 1.0)',

  // Lateral shift: symmetrical mechanical track movement (GSAP: power2.inOut)
  lateralSlide: 'cubic-bezier(0.65, 0.0, 0.35, 1.0)',

  // Vascular pipe expansion: steady fluid injection (GSAP: power1.inOut)
  pipeGrowth: 'cubic-bezier(0.25, 0.1, 0.25, 1.0)',

  // Modal expand (SaaS morph): expansive elastic ease-out
  saasExpand: 'cubic-bezier(0.2, 0.8, 0.2, 1.0)',

  // Chip pop-in (GSAP: back.out(1.4))
  badgePop: 'cubic-bezier(0.34, 1.56, 0.64, 1.0)'
} as const;
