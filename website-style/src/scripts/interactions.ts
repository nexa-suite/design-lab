/**
 * Flecto Reconstruction — Client Interaction & Motion Controller
 * Handles mobile drawer, Phone mockup states, Owner switcher, GSAP scroll choreography,
 * interactive 3D hero circuit, live table filtering, and animated sustainability counters.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FLECTO_TIMELINE } from '../lib/flecto-motion';

// Register GSAP plugins safely in browser environment
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileDrawer();
  initHeroAnimation();
  initPhoneMockup();
  initOwnerSwitcher();
  initNewsletter();
  initTableSearch();
  initSustainabilityCounters();
  initScrollChoreography();
  initInsuranceAnimation();
});

/* --------------------------------------------------------------------------
   1. STICKY HEADER TRANSITION ON SCROLL
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 80) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const trigger = document.getElementById('mobile-menu-trigger');
  const heroTrigger = document.getElementById('hero-menu-trigger');
  const drawer = document.getElementById('mobile-drawer');
  const closeBtn = document.getElementById('mobile-menu-close');
  const links = drawer?.querySelectorAll('a');

  if (!drawer) return;

  const openDrawer = () => {
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    trigger?.setAttribute('aria-expanded', 'true');
    heroTrigger?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  };

  const closeDrawer = () => {
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    trigger?.setAttribute('aria-expanded', 'false');
    heroTrigger?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    trigger?.focus();
  };

  trigger?.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  heroTrigger?.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  closeBtn?.addEventListener('click', closeDrawer);

  links?.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });
}

/* --------------------------------------------------------------------------
   3. HERO SCULPTED CANVAS ENTRANCE & 3D CIRCUIT PARALLAX
   -------------------------------------------------------------------------- */
function initHeroAnimation() {
  const canvas = document.getElementById('hero-sculpted-canvas');
  const hub = document.getElementById('circuit-hub');
  const crown = document.querySelector<HTMLElement>('.hero-crown-content');
  const titleHeading = document.getElementById('hero-heading');
  const titleSub = document.querySelector<HTMLElement>('.hero-main-sub');
  const chapter1View = document.getElementById('hero-chapter-1-view');
  const chapter2View = document.getElementById('hero-chapter-2-view');
  const chapter3View = document.getElementById('hero-chapter-3-view');
  const pipeLines = document.querySelectorAll<SVGPathElement>('.circuit-pipe-line');
  const pipeAccent = document.querySelector<SVGPathElement>('.circuit-pipe-accent');
  const mark = document.querySelector<SVGPathElement>('.line-flecto-mark');
  const badges = document.querySelectorAll<HTMLElement>('.circuit-badge');
  const cards = document.querySelectorAll<HTMLElement>('.channel-card');
  const trackerSteps = document.querySelectorAll<HTMLButtonElement>('.tracker-step');
  const progressSeg = document.querySelector<HTMLElement>('.tracker-progress-segment');
  const tickerMsg = document.getElementById('hero-ticker-msg');
  const guarantee = document.getElementById('hero-guarantee-text');

  if (!canvas || !hub) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = window.innerWidth > 900;
  let ch3ConfettiId: number | null = null;

  // 1. Static Settled Fallback for prefers-reduced-motion
  if (prefersReduced) {
    gsap.set(canvas, { scale: 1, opacity: 1 });
    gsap.set(hub, { x: 0, y: 0, rotation: 0, scale: 1, opacity: 1 });
    if (crown) gsap.set(crown, { y: 0, opacity: 1 });
    if (guarantee) gsap.set(guarantee, { opacity: 1 });
    pipeLines.forEach(p => gsap.set(p, { opacity: 1, strokeDashoffset: 0 }));
    const markEl = document.querySelector<SVGPathElement>('.line-flecto-mark');
    if (markEl) gsap.set(markEl, { opacity: 1, scale: 1 });
    if (pipeAccent) gsap.set(pipeAccent, { opacity: 1 });
    badges.forEach(b => gsap.set(b, { scale: 1, opacity: 1 }));
    cards.forEach(c => gsap.set(c, { scale: 1, opacity: 1 }));
    if (tickerMsg) tickerMsg.textContent = 'Every booking is safe and every transaction is insured.';
    return;
  }
    // 2. Set Up Initial Dormant Stage (State A: Opening stillness)
    gsap.set(canvas, { scale: 0.98, opacity: 0.8 });
    gsap.set(hub, {
      x: isDesktop ? 483 : 0,
      y: 340,
      rotation: -52.7,
      scale: 0.85,
      opacity: 0,
    });
    if (crown) gsap.set(crown, { y: -25, opacity: 0 });
    if (guarantee) gsap.set(guarantee, { opacity: 0 });

    pipeLines.forEach((p) => {
      try {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      } catch {
        // Fallback for non-SVG geometry
      }
    });

    badges.forEach((b) => gsap.set(b, { scale: 0, opacity: 0 }));
    cards.forEach((c) => gsap.set(c, { scale: 0.85, opacity: 0 }));
    if (mark) gsap.set(mark, { opacity: 0, scale: 0.96, transformOrigin: 'left center' });

  const tickerIconSlot = document.getElementById('ticker-icon-slot');
  const setTicker = (msg: string, iconSvg: string) => {
    if (!tickerMsg) return;
    gsap.to(tickerMsg, {
      opacity: 0,
      y: -4,
      duration: 0.2,
      onComplete: () => {
        tickerMsg.textContent = msg;
        if (tickerIconSlot) tickerIconSlot.innerHTML = iconSvg;
        gsap.to(tickerMsg, { opacity: 1, y: 0, duration: 0.25 });
      }
    });
  };

  const icons = {
    notepad: '<svg class="guarantee-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>',
    email: '<svg class="guarantee-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>',
    store: '<svg class="guarantee-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>',
    globe: '<svg class="guarantee-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>',
    lock: '<svg class="guarantee-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
  };

  // 3. Master Forensic Sequence Timeline (Synchronized with elem-62bb3911cfdd5765825581.mp4 and elem-62d69ee3303ff845112099.mp4)
  const masterTl = gsap.timeline({ delay: 0.05 });
  const ch1 = FLECTO_TIMELINE.CHAPTER_01;

  // Phase 1 (0.0s - 0.25s): Stage opens in dominant green stillness
  masterTl.to(canvas, {
    scale: 1,
    opacity: 1,
    duration: ch1.STAGE_FADE_IN.duration,
    ease: 'power2.out',
  }, ch1.STAGE_FADE_IN.start);

  // Phase 2 (0.267s - 0.867s): YOUR COMPANY flies into center with -52.78° rotation and decelerates
  masterTl.to(hub, {
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 1,
    duration: ch1.COMPANY_ENTRY.duration,
    ease: 'power3.out',
  }, ch1.COMPANY_ENTRY.start);

  // Phase 3 (0.45s - 0.95s): Canopy headline slides down and fades in
  if (crown) {
    masterTl.to(crown, {
      y: 0,
      opacity: 1,
      duration: ch1.HEADLINE_REVEAL.duration,
      ease: 'power2.out',
    }, ch1.HEADLINE_REVEAL.start);
  }

  // Phase 4 (0.60s - 1.00s): Guarantee bar reveals
  if (guarantee) {
    masterTl.to(guarantee, {
      opacity: 1,
      duration: ch1.GUARANTEE_REVEAL.duration,
      ease: 'power1.out',
    }, ch1.GUARANTEE_REVEAL.start);
  }

  // Phase 5 (2.633s - 3.267s): Intentional static hold for 1.766s, then smooth lateral shift (dx = -235px)
  if (isDesktop) {
    masterTl.to(hub, {
      x: 0,
      duration: ch1.LATERAL_SHIFT.duration,
      ease: ch1.LATERAL_SHIFT.easing,
    }, ch1.LATERAL_SHIFT.start);
  }

  // Phase 6 (3.30s - 4.50s): Main horizontal connection stem projects
  const lineTrunk = document.querySelector<SVGPathElement>('.line-trunk');
  if (lineTrunk) {
    masterTl.to(lineTrunk, {
      opacity: 1,
      strokeDashoffset: 0,
      duration: ch1.TRUNK_DRAW.duration,
      ease: 'power1.out',
    }, ch1.TRUNK_DRAW.start);
  }

  // Phase 7 (4.50s - 6.00s): Modular logo mark reveals
  if (mark) {
    masterTl.to(mark, {
      opacity: 1,
      scale: 1,
      duration: ch1.MODULAR_MARK_ASSEMBLE.duration,
      ease: 'power2.out',
    }, ch1.MODULAR_MARK_ASSEMBLE.start);
  }

  // Phase 8: Channel arrival sequence matching forensic timing:
  const lineStore = document.querySelector<SVGPathElement>('.line-store');
  const badgeStore = document.querySelector<HTMLElement>('.badge-store');
  const cardStore = document.querySelector<HTMLElement>('.card-store');
  const lineEmail = document.querySelector<SVGPathElement>('.line-email');
  const badgeEmail = document.querySelector<HTMLElement>('.badge-email');
  const cardEmail = document.querySelector<HTMLElement>('.card-email');
  const lineOnline = document.querySelector<SVGPathElement>('.line-online');
  const badgeOnline = document.querySelector<HTMLElement>('.badge-online');
  const cardOnline = document.querySelector<HTMLElement>('.card-online');
  const lineShield = document.querySelector<SVGPathElement>('.line-shield');
  const badgeShield = document.querySelector<HTMLElement>('.badge-shield');

  // 1. Customer Inquiry Arrives (~6.10s)
  if (lineEmail) {
    masterTl.to(lineEmail, { opacity: 1, strokeDashoffset: 0, duration: ch1.CARDS.INQUIRY.duration, ease: 'power1.out' }, ch1.CARDS.INQUIRY.lineStart);
  }
  if (badgeEmail) {
    masterTl.to(badgeEmail, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }, ch1.CARDS.INQUIRY.cardStart);
  }
  if (cardEmail) {
    masterTl.to(cardEmail, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, ch1.CARDS.INQUIRY.cardStart);
  }
  masterTl.add(() => setTicker('Customers can email you directly or book in Physical Stores', icons.email), ch1.CARDS.INQUIRY.cardStart);

  // 2. Physical Store POS Arrives (~7.67s)
  if (lineStore) {
    masterTl.to(lineStore, { opacity: 1, strokeDashoffset: 0, duration: ch1.CARDS.PHYSICAL_STORE.duration, ease: 'power1.out' }, ch1.CARDS.PHYSICAL_STORE.lineStart);
  }
  if (badgeStore) {
    masterTl.to(badgeStore, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }, ch1.CARDS.PHYSICAL_STORE.cardStart);
  }
  if (cardStore) {
    masterTl.to(cardStore, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, ch1.CARDS.PHYSICAL_STORE.cardStart);
  }

  // 3. Online Store Channel Arrives (~10.02s) — CORRECTED from premature 7.4s!
  if (lineOnline) {
    masterTl.to(lineOnline, { opacity: 1, strokeDashoffset: 0, duration: ch1.CARDS.ONLINE_STORE.duration, ease: 'power1.out' }, ch1.CARDS.ONLINE_STORE.lineStart);
  }
  if (badgeOnline) {
    masterTl.to(badgeOnline, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }, ch1.CARDS.ONLINE_STORE.cardStart);
  }
  if (cardOnline) {
    masterTl.to(cardOnline, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' }, ch1.CARDS.ONLINE_STORE.cardStart);
  }

  // 4. Escrow Security Shield Arrives (~10.75s)
  if (lineShield) {
    masterTl.to(lineShield, { opacity: 1, strokeDashoffset: 0, duration: ch1.CARDS.ESCROW_SHIELD.duration, ease: 'power1.out' }, ch1.CARDS.ESCROW_SHIELD.lineStart);
  }
  if (badgeShield) {
    masterTl.to(badgeShield, { scale: 1, opacity: 1, duration: 0.25, ease: 'power2.out' }, ch1.CARDS.ESCROW_SHIELD.badgeStart);
  }
  masterTl.add(() => setTicker('Every booking is safe and every transaction is insured.', icons.lock), ch1.CARDS.ESCROW_SHIELD.badgeStart);

  // Phase 9: Chapter 01 Breathing Room (10.333s - 14.167s)
  // The system remains fully settled, allowing the user to read the complete network.
  // At 14.50s, auto-trigger organic Chapter 02 transition if user has not interacted.
  masterTl.add(() => {
    // Check if user is still on chapter 1
    const activeStep = document.querySelector('.tracker-step.active');
    const currCh = activeStep ? parseInt(activeStep.getAttribute('data-chapter') || '1', 10) : 1;
    if (currCh === 1) {
      goToChapter(2);
    }
  }, FLECTO_TIMELINE.CHAPTER_02.MORPH_START);

  // 4. Interactive Chapter State Machine (01 Channels -> 02 SaaS Platform -> 03 Safe Renting)
  const goToChapter = (chapter: number) => {
    // Update Tracker Button States
    trackerSteps.forEach((step) => {
      const stepNum = parseInt(step.getAttribute('data-chapter') || '1', 10);
      const isActive = stepNum === chapter;
      step.classList.toggle('active', isActive);
      step.setAttribute('aria-pressed', String(isActive));
    });

    // Update Progress Segment bar
    if (progressSeg) {
      if (chapter === 1) progressSeg.style.width = '33%';
      else if (chapter === 2) progressSeg.style.width = '66%';
      else if (chapter === 3) progressSeg.style.width = '100%';
    }

    if (chapter === 1) {
      // Restore Chapter 1 Titles
      if (titleHeading) titleHeading.innerHTML = 'Unlock your rental <br /> business';
      if (titleSub) titleSub.textContent = 'The easiest way to access new customers and a greener future';

      if (guarantee) gsap.to(guarantee, { opacity: 1, duration: 0.3 });
      if (chapter2View) {
        gsap.to(chapter2View, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          onComplete: () => {
            chapter2View.style.display = 'none';
          }
        });
      }
      if (chapter3View) {
        gsap.to(chapter3View, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          onComplete: () => {
            chapter3View.style.display = 'none';
          }
        });
      }
      if (chapter1View) {
        chapter1View.style.display = 'block';
        gsap.to(chapter1View, { opacity: 1, scale: 1, duration: 0.35, delay: 0.1 });
      }
    } else if (chapter === 2) {
      // Morph to Chapter 2 (SaaS Platform)
      if (titleHeading) titleHeading.innerHTML = 'A platform that brings <br /> it all together';
      if (titleSub) titleSub.textContent = 'Designed to improve the renting experience';
      if (guarantee) gsap.to(guarantee, { opacity: 0, duration: 0.25 });

      if (chapter1View) {
        gsap.to(chapter1View, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          onComplete: () => {
            chapter1View.style.display = 'none';
          }
        });
      }
      if (chapter3View) {
        gsap.to(chapter3View, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          onComplete: () => {
            chapter3View.style.display = 'none';
          }
        });
      }
      if (chapter2View) {
        chapter2View.style.display = 'block';
        gsap.fromTo(chapter2View, 
          { opacity: 0, scale: 0.95, y: 15 },
          { opacity: 1, scale: 1, y: 0, duration: 0.4, delay: 0.1, ease: 'power2.out' }
        );
      }
    } else if (chapter === 3) {
      // Morph to Chapter 3 (Flecto Link & Safe Renting)
      if (titleHeading) titleHeading.innerHTML = 'Making rental as easy <br /> as it can be';
      if (titleSub) titleSub.textContent = 'With multiple payment options and safeguards';
      if (guarantee) gsap.to(guarantee, { opacity: 0, duration: 0.25 });

      if (chapter1View) {
        gsap.to(chapter1View, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          onComplete: () => {
            chapter1View.style.display = 'none';
          }
        });
      }
      if (chapter2View) {
        gsap.to(chapter2View, {
          opacity: 0,
          scale: 0.95,
          duration: 0.25,
          onComplete: () => {
            chapter2View.style.display = 'none';
          }
        });
      }
      if (chapter3View) {
        chapter3View.style.display = 'flex';
        gsap.fromTo(chapter3View,
          { opacity: 0, scale: 0.95, y: 15 },
          { 
            opacity: 1, 
            scale: 1, 
            y: 0, 
            duration: 0.4, 
            delay: 0.1, 
            ease: 'power2.out',
            onComplete: () => {
              triggerCh3Confetti();
            }
          }
        );
      }
    }
  };

  // Chapter 3 Confetti & Interactive Buttons
  function triggerCh3Confetti() {
    if (prefersReduced) return;
    if (ch3ConfettiId !== null) {
      cancelAnimationFrame(ch3ConfettiId);
      ch3ConfettiId = null;
    }

    const confettiCanvas = document.getElementById('ch3-confetti-canvas') as HTMLCanvasElement | null;
    if (!confettiCanvas) return;
    const ctx = confettiCanvas.getContext('2d');
    if (!ctx) return;

    const width = confettiCanvas.width = 400;
    const height = confettiCanvas.height = 300;

    const colors = ['#57f09e', '#ffffff', '#e63946', '#3a86ff', '#f77f00'];
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      w: number;
      h: number;
      color: string;
      rotation: number;
      vRot: number;
      opacity: number;
      isCircle: boolean;
    }> = [];

    for (let i = 0; i < 65; i++) {
      particles.push({
        x: width / 2 + (Math.random() - 0.5) * 40,
        y: height - 20,
        vx: (Math.random() - 0.5) * 8,
        vy: -Math.random() * 8 - 4,
        w: Math.random() * 6 + 4,
        h: Math.random() * 4 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        opacity: 1,
        isCircle: Math.random() > 0.65
      });
    }

    let frames = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      frames++;
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.22;
        p.rotation += p.vRot;
        if (frames > 40) {
          p.opacity -= 0.02;
        }

        if (p.opacity > 0 && p.y < height + 20) {
          alive = true;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.globalAlpha = Math.max(0, p.opacity);
          ctx.fillStyle = p.color;

          if (p.isCircle) {
            ctx.beginPath();
            ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2);
            ctx.fill();
          } else {
            ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          }
          ctx.restore();
        }
      });

      if (alive && frames < 120) {
        ch3ConfettiId = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, width, height);
        ch3ConfettiId = null;
      }
    };

    ch3ConfettiId = requestAnimationFrame(render);
  }

  // Wire restart & done button in Chapter 3
  const restartBtn = document.getElementById('ch3-restart-btn');
  const doneBtn = document.getElementById('ch3-done-action-btn');
  restartBtn?.addEventListener('click', () => {
    triggerCh3Confetti();
  });
  doneBtn?.addEventListener('click', () => {
    triggerCh3Confetti();
  });

  // Wire chapter buttons
  trackerSteps.forEach((btn) => {
    btn.addEventListener('click', () => {
      const chapter = parseInt(btn.getAttribute('data-chapter') || '1', 10);
      goToChapter(chapter);
    });
  });
}

/* --------------------------------------------------------------------------
   4. INTERACTIVE PHONE MOCKUP & SCROLLYTELLING STATE CONTROLLER
   -------------------------------------------------------------------------- */
let currentPhoneState: number | 'inventory' = 1;
let activeCategoryTab: 'bookings' | 'inventory' = 'bookings';
let isScrollytellingInState2 = false;
let isConfettiFiring = false;

function setPhoneState(targetState: number | 'inventory', triggerConfetti = true) {
  currentPhoneState = targetState;
  const views = document.querySelectorAll<HTMLElement>('.phone-screen .phone-state-view');
  const stepperTabs = document.querySelectorAll<HTMLButtonElement>('.timeline-stepper .step-pill');
  const timelineItems = document.querySelectorAll<HTMLElement>('.timeline-steps-list .timeline-item');

  // Update Views
  views.forEach(v => {
    const vState = v.getAttribute('data-state');
    const isActive = String(vState) === String(targetState);
    v.classList.toggle('active', isActive);
    if (isActive) {
      v.removeAttribute('aria-hidden');
    } else {
      v.setAttribute('aria-hidden', 'true');
    }
  });

  // If numeric step (1, 2, 3, 4), update right wing timeline and stepper pills
  if (typeof targetState === 'number') {
    stepperTabs.forEach(t => {
      const tStep = parseInt(t.getAttribute('data-step') || '1', 10);
      const isSel = tStep === targetState;
      t.classList.toggle('active', isSel);
      t.setAttribute('aria-selected', String(isSel));
    });

    timelineItems.forEach(item => {
      const itemStep = parseInt(item.getAttribute('data-step') || '1', 10);
      const isItemActive = itemStep === targetState;
      item.classList.toggle('active', isItemActive);
    });

    if (targetState === 4 && triggerConfetti) {
      triggerPaymentConfetti();
    }
  }
}

function updateDuration(days: number) {
  const chipButtons = document.querySelectorAll<HTMLButtonElement>('.duration-chip');
  chipButtons.forEach(btn => {
    const bDays = parseInt(btn.getAttribute('data-days') || '5', 10);
    btn.classList.toggle('active', bDays === days);
  });

  // End date calculation
  const endDateEl = document.getElementById('step1-end-date');
  if (endDateEl) {
    if (days === 3) endDateEl.textContent = '2022/03/22';
    else if (days === 5) endDateEl.textContent = '2022/03/24';
    else if (days === 7) endDateEl.textContent = '2022/03/26';
  }

  // Price calculations:
  // Base daily rate: €100.00
  // Deposit: €200.00
  // Insurance: €20.00
  // Duration discount: €30.00
  const rentalBase = days * 100;
  const total = rentalBase + 200 + 20 - 30; // 3d: €490.00, 5d: €690.00, 7d: €890.00
  const totalFormatted = `€${total.toFixed(2)}`;

  // Step 1 display amount
  const step1Amt = document.getElementById('step1-display-amount');
  if (step1Amt) step1Amt.textContent = totalFormatted;

  // Step 3 (Summary) updates
  const itemValEl = document.querySelector<HTMLElement>('#phone-state-3 .item-val');
  if (itemValEl) itemValEl.textContent = `€${rentalBase.toFixed(2)}`;

  const itemSubInfo = document.querySelector<HTMLElement>('#phone-state-3 .item-info span');
  if (itemSubInfo) itemSubInfo.textContent = `€100.00 / day × ${days} days`;

  const totalDueEl = document.querySelector<HTMLElement>('#phone-state-3 .total-price');
  if (totalDueEl) totalDueEl.textContent = totalFormatted;

  const payBtnSpan = document.querySelector<HTMLElement>('#execute-payment-btn span');
  if (payBtnSpan) payBtnSpan.textContent = `Pay ${totalFormatted} & Escrow`;
}

function initPhoneMockup() {
  const notifCard = document.getElementById('trigger-step-2');
  const btnToStep2 = document.getElementById('btn-to-step-2');
  const faceScanBtn = document.getElementById('confirm-face-scan');
  const payBtn = document.getElementById('execute-payment-btn');
  const restartBtn = document.getElementById('phone-restart-btn');
  const backBtns = document.querySelectorAll<HTMLButtonElement>('.phone-back-btn');
  const invProceedBtn = document.getElementById('inv-proceed-btn');
  const invBackBtn = document.getElementById('inv-back-btn');
  const durationChips = document.querySelectorAll<HTMLButtonElement>('.duration-chip');
  const timelineItems = document.querySelectorAll<HTMLElement>('.timeline-steps-list .timeline-item');
  const stepperTabs = document.querySelectorAll<HTMLButtonElement>('.timeline-stepper .step-pill');

  // Duration chips click
  durationChips.forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.stopPropagation();
      const days = parseInt(chip.getAttribute('data-days') || '5', 10);
      updateDuration(days);
    });
  });

  // Step 1 -> Step 2
  notifCard?.addEventListener('click', () => setPhoneState(2));
  notifCard?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setPhoneState(2);
    }
  });
  btnToStep2?.addEventListener('click', (e) => {
    e.stopPropagation();
    setPhoneState(2);
  });

  // Step 2 -> Step 3 (Face Scan Confirm)
  faceScanBtn?.addEventListener('click', () => setPhoneState(3));

  // Step 3 -> Step 4 (Payment Button)
  payBtn?.addEventListener('click', () => setPhoneState(4));

  // Step 4 -> Step 1 (Restart Flow)
  restartBtn?.addEventListener('click', () => setPhoneState(1));

  // Back buttons
  backBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = parseInt(btn.getAttribute('data-target') || '1', 10);
      setPhoneState(target);
    });
  });

  // Inventory navigation
  invProceedBtn?.addEventListener('click', () => setPhoneState(2));
  invBackBtn?.addEventListener('click', () => {
    const tabBookings = document.getElementById('tab-bookings');
    tabBookings?.click();
  });

  // Right-wing timeline step click
  timelineItems.forEach(item => {
    item.addEventListener('click', () => {
      const step = parseInt(item.getAttribute('data-step') || '1', 10);
      setPhoneState(step);
    });
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const step = parseInt(item.getAttribute('data-step') || '1', 10);
        setPhoneState(step);
      }
    });
  });

  // Stepper tabs click
  stepperTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const step = parseInt(tab.getAttribute('data-step') || '1', 10);
      setPhoneState(step);
    });
  });
}

function triggerPaymentConfetti() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || isConfettiFiring) return;
  isConfettiFiring = true;
  setTimeout(() => { isConfettiFiring = false; }, 1400);

  const phoneScreen = document.querySelector<HTMLElement>('.phone-screen');
  if (!phoneScreen) return;

  let container = phoneScreen.querySelector<HTMLElement>('.phone-confetti-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'phone-confetti-container';
    container.setAttribute('aria-hidden', 'true');
    container.style.cssText = 'position:absolute;inset:0;pointer-events:none;overflow:hidden;z-index:90;';
    phoneScreen.appendChild(container);
  }
  gsap.killTweensOf(container.children);
  container.innerHTML = '';

  const colors = ['#57f09e', '#38c8ff', '#f7b928', '#ffffff', '#004737', '#6effb0'];
  const count = 42;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const color = colors[i % colors.length];
    const isRound = Math.random() > 0.45;
    const size = Math.random() * 6 + 5;
    p.style.cssText = `
      position: absolute;
      left: 50%;
      top: 45%;
      width: ${size}px;
      height: ${isRound ? size : size * 1.7}px;
      background-color: ${color};
      border-radius: ${isRound ? '50%' : '2px'};
      pointer-events: none;
    `;
    container.appendChild(p);

    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * 120 + 30;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance - 25;
    const rot = (Math.random() - 0.5) * 720;

    gsap.fromTo(p, 
      { x: 0, y: 0, rotation: 0, scale: 0.4, opacity: 1 },
      { 
        x, 
        y: y + 95, 
        rotation: rot, 
        scale: 1, 
        opacity: 0, 
        duration: Math.random() * 0.75 + 0.75, 
        ease: 'power2.out',
        onComplete: () => p.remove()
      }
    );
  }
}

/* --------------------------------------------------------------------------
   5. OWNER SWITCHER & LIVE QUOTE SIMULATOR
   -------------------------------------------------------------------------- */
function initOwnerSwitcher() {
  const toggleCards = document.querySelectorAll<HTMLElement>('.toggle-card');
  const quoteAmount = document.getElementById('sim-quote-amount');
  const copyBtn = document.getElementById('copy-link-btn');
  const copyLabel = document.getElementById('copy-btn-label');

  // Base calculation
  const basePrice = 500; // 5 days GoPro
  const servicesPrice = 40; // Delivery + Insurance
  const depositPrice = 200; // Escrow hold
  const discount = 50;

  const recalculateQuote = () => {
    const hasServices = document.querySelector('[data-toggle="add-services"]')?.classList.contains('active');
    const hasDeposits = document.querySelector('[data-toggle="add-deposits"]')?.classList.contains('active');

    let total = basePrice - discount;
    if (hasServices) total += servicesPrice;
    if (hasDeposits) total += depositPrice;

    if (quoteAmount) {
      quoteAmount.textContent = `€${total.toFixed(2)} Total`;
    }
  };

  toggleCards.forEach(card => {
    card.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      const toggleKey = card.getAttribute('data-toggle');
      
      card.classList.toggle('active', !isActive);
      card.setAttribute('aria-checked', String(!isActive));

      // Update linked simulator row
      const paramRow = document.getElementById(`param-${toggleKey}`);
      if (paramRow) {
        paramRow.classList.toggle('disabled', isActive);
        const valSpan = paramRow.querySelector('.param-val');
        if (valSpan) {
          valSpan.classList.toggle('enabled', !isActive);
          valSpan.classList.toggle('disabled', isActive);
        }
      }

      recalculateQuote();
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // Copy link action
  copyBtn?.addEventListener('click', async () => {
    const linkText = 'https://flecto.io/l/camera-store-88219';
    try {
      await navigator.clipboard.writeText(linkText);
      if (copyLabel) copyLabel.textContent = 'Copied! ✓';
      setTimeout(() => {
        if (copyLabel) copyLabel.textContent = 'Copy Link';
      }, 2000);
    } catch {
      if (copyLabel) copyLabel.textContent = 'Copied! ✓';
    }
  });
}

/* --------------------------------------------------------------------------
   6. LIVE SEARCH IN SAAS BOOKINGS LEDGER
   -------------------------------------------------------------------------- */
function initTableSearch() {
  const input = document.getElementById('bookings-search-input') as HTMLInputElement | null;
  const table = document.getElementById('bookings-table') as HTMLTableElement | null;
  if (!input || !table) return;

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    const rows = table.querySelectorAll('tbody tr');

    rows.forEach(row => {
      const text = row.textContent?.toLowerCase() || '';
      if (text.includes(query)) {
        (row as HTMLElement).style.display = '';
      } else {
        (row as HTMLElement).style.display = 'none';
      }
    });
  });
}

/* --------------------------------------------------------------------------
   7. ANIMATED SUSTAINABILITY NUMERICAL COUNTERS
   -------------------------------------------------------------------------- */
function initSustainabilityCounters() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const metricValues = document.querySelectorAll<HTMLElement>('.metric-value[data-target]');
  if (!metricValues.length) return;

  metricValues.forEach(el => {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const suffix = el.getAttribute('data-suffix') || '';
    const counter = { val: 0 };

    gsap.to(counter, {
      val: target,
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '#sustainability',
        start: 'top 80%',
        once: true,
      },
      onUpdate: () => {
        el.textContent = Math.round(counter.val) + suffix;
      },
    });
  });
}

/* --------------------------------------------------------------------------
   8. NEWSLETTER FEEDBACK
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const form = document.getElementById('newsletter-form') as HTMLFormElement | null;
  const feedback = document.getElementById('newsletter-feedback');

  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement | null;
    if (emailInput && emailInput.value) {
      feedback.textContent = `Thank you! We'll keep ${emailInput.value} updated on circular rental news.`;
      form.reset();
    }
  });
}

/* --------------------------------------------------------------------------
   9. GSAP SCROLL CHOREOGRAPHY & SCENE 2 SCROLLYTELLING
   -------------------------------------------------------------------------- */
function initScrollChoreography() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Smooth scroll for the down circle button
  const downBtn = document.querySelector('.hero-down-circle');
  downBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById('scrollytelling');
    target?.scrollIntoView({ behavior: 'smooth' });
  });

  // Initialize interactive satellite switches in Scrollytelling
  initSatelliteSwitches();

  if (prefersReduced) return;

  // Scene 2: Dedicated Bidirectional Native Scrollytelling Timeline
  initScrollytellingTimeline();

  // Sustainability metric cards entrance
  const sustEl = document.querySelector('#sustainability');
  if (sustEl) {
    ScrollTrigger.create({
      trigger: sustEl,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          '.metric-card',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out', clearProps: 'all' }
        );
      },
    });
  }

  // SaaS Bento cards entrance
  const featEl = document.querySelector('#features');
  if (featEl) {
    ScrollTrigger.create({
      trigger: featEl,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.fromTo(
          '.bento-card',
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: 'power2.out', clearProps: 'all' }
        );
      },
    });
  }
}

function initSatelliteSwitches() {
  const switches = document.querySelectorAll<HTMLElement>('.satellite-switch-pill');
  switches.forEach(sw => {
    sw.addEventListener('click', (e) => {
      e.stopPropagation();
      const isChecked = sw.classList.toggle('active');
      sw.setAttribute('aria-checked', String(isChecked));
    });
  });

  // Tab Bookings / Inventory
  const tabBookings = document.getElementById('tab-bookings');
  const tabInventory = document.getElementById('tab-inventory');
  const trackBar = document.querySelector<HTMLElement>('.track-active-bar');

  const bookingsSatellites = document.querySelectorAll<HTMLElement>('.bookings-satellite');
  const inventorySatellites = document.querySelectorAll<HTMLElement>('.inventory-satellite');

  function switchTab(tab: 'bookings' | 'inventory') {
    activeCategoryTab = tab;
    const isBookings = tab === 'bookings';

    tabBookings?.classList.toggle('active', isBookings);
    tabBookings?.setAttribute('aria-selected', String(isBookings));
    tabInventory?.classList.toggle('active', !isBookings);
    tabInventory?.setAttribute('aria-selected', String(!isBookings));

    if (trackBar) {
      trackBar.style.transform = isBookings ? 'translateX(0)' : 'translateX(100%)';
    }

    // Toggle satellite cards visibility without breaking GSAP's transform
    bookingsSatellites.forEach(el => {
      el.style.display = isBookings ? 'flex' : 'none';
      el.style.opacity = isBookings ? '1' : '0';
    });
    inventorySatellites.forEach(el => {
      el.style.display = isBookings ? 'none' : 'flex';
      el.style.opacity = isBookings ? '0' : '1';
    });

    // Update phone state
    setPhoneState(isBookings ? 1 : 'inventory', false);
  }

  tabBookings?.addEventListener('click', () => switchTab('bookings'));
  tabInventory?.addEventListener('click', () => switchTab('inventory'));

  // Inventory Interactive Switches (Add Services -> €20 Delivery fee)
  const addServicesCard = document.getElementById('satellite-add-services');
  const servicesRow = document.getElementById('inv-additional-services-row');
  const totalAmountEl = document.getElementById('inv-total-amount');

  addServicesCard?.addEventListener('click', () => {
    const pill = addServicesCard.querySelector('.satellite-switch-pill');
    if (!pill) return;
    const isNowActive = !pill.classList.contains('active');
    pill.classList.toggle('active', isNowActive);
    pill.setAttribute('aria-checked', String(isNowActive));

    if (servicesRow) {
      servicesRow.style.display = isNowActive ? 'block' : 'none';
    }
    if (totalAmountEl) {
      totalAmountEl.textContent = isNowActive ? '€520.00' : '€500.00';
    }
  });

  // Clicking anywhere on satellite cards to toggle switch
  const otherSatellites = document.querySelectorAll<HTMLElement>(
    '#satellite-online-payments, #satellite-pay-store, #satellite-id-verify, #satellite-add-deposits, #satellite-add-items, #satellite-discounts'
  );
  otherSatellites.forEach(card => {
    card.addEventListener('click', () => {
      const pill = card.querySelector<HTMLElement>('.satellite-switch-pill');
      if (pill) {
        const isNowActive = !pill.classList.contains('active');
        pill.classList.toggle('active', isNowActive);
        pill.setAttribute('aria-checked', String(isNowActive));
      }
    });
  });
}

function initScrollytellingTimeline() {
  const isMobile = window.innerWidth <= 900;
  if (isMobile) return;

  const section = document.getElementById('scrollytelling');
  if (!section) return;

  const navTabs = section.querySelector<HTMLElement>('.scrolly-nav-tabs');
  const leftCards = section.querySelectorAll<HTMLElement>('.card-top-left, .card-bottom-left');
  const rightCards = section.querySelectorAll<HTMLElement>('.card-right, .card-bottom-right');
  const avatarBlock = section.querySelector<HTMLElement>('.customer-avatar-stem-block');
  const leftWing = section.querySelector<HTMLElement>('.customer-left-wing');
  const rightWing = section.querySelector<HTMLElement>('.customer-right-wing');

  // Initial setup for State 1: ensure customer wings start hidden & avatar is properly centered with xPercent
  if (avatarBlock) {
    gsap.set(avatarBlock, { opacity: 0, y: -20, xPercent: -50 });
  }
  if (leftWing) {
    gsap.set(leftWing, { opacity: 0, x: -30 });
  }
  if (rightWing) {
    gsap.set(rightWing, { opacity: 0, x: 30 });
  }

  // Create GSAP ScrollTrigger timeline with scrub
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '#scrollytelling',
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6,
      onUpdate: (self) => {
        const p = self.progress;

        // Mode switch: State 1 (< 0.22) vs State 2 (>= 0.22)
        if (p < 0.22) {
          if (isScrollytellingInState2) {
            isScrollytellingInState2 = false;
            rightWing?.classList.remove('is-interactive');
            if (rightWing) rightWing.style.pointerEvents = 'none';
            if (navTabs) navTabs.style.pointerEvents = 'auto';
            leftCards.forEach(c => (c.style.pointerEvents = 'auto'));
            rightCards.forEach(c => (c.style.pointerEvents = 'auto'));
            // Restore tab state (1 or inventory)
            setPhoneState(activeCategoryTab === 'bookings' ? 1 : 'inventory', false);
          }
        } else {
          if (!isScrollytellingInState2) {
            isScrollytellingInState2 = true;
            rightWing?.classList.add('is-interactive');
            if (rightWing) rightWing.style.pointerEvents = 'auto';
            if (navTabs) navTabs.style.pointerEvents = 'none';
            leftCards.forEach(c => (c.style.pointerEvents = 'none'));
            rightCards.forEach(c => (c.style.pointerEvents = 'none'));
          }

          // Step progression in State 2:
          // 0.22 - 0.44 -> Step 1 (Date selection & order)
          // 0.44 - 0.64 -> Step 2 (Run face verification)
          // 0.64 - 0.82 -> Step 3 (Summary & pay)
          // 0.82 - 1.00 -> Step 4 (Success! 🍾)
          let targetStep = 1;
          if (p >= 0.82) {
            targetStep = 4;
          } else if (p >= 0.64) {
            targetStep = 3;
          } else if (p >= 0.44) {
            targetStep = 2;
          } else {
            targetStep = 1;
          }

          if (currentPhoneState !== targetStep) {
            setPhoneState(targetStep, targetStep === 4);
          }
        }
      },
    },
  });

  // Crossfade animations (progress 0.08 to 0.24)
  // 1. Fade out nav tabs and glide upward
  if (navTabs) {
    tl.to(navTabs, { opacity: 0, y: -20, duration: 0.12 }, 0.08);
  }
  // 2. Glide satellite cards outward and fade out
  if (leftCards.length) {
    tl.to(leftCards, { opacity: 0, x: -40, duration: 0.14 }, 0.10);
  }
  if (rightCards.length) {
    tl.to(rightCards, { opacity: 0, x: 40, duration: 0.14 }, 0.10);
  }
  // 3. Fade in John Cooper avatar (preserving xPercent: -50), left wing, right wing
  if (avatarBlock) {
    tl.to(avatarBlock, { opacity: 1, y: 0, xPercent: -50, duration: 0.14 }, 0.16);
  }
  if (leftWing) {
    tl.to(leftWing, { opacity: 1, x: 0, duration: 0.14 }, 0.18);
  }
  if (rightWing) {
    tl.to(rightWing, { opacity: 1, x: 0, duration: 0.14 }, 0.18);
  }

  // Hold completion state through the remainder of the pin
  tl.to({}, { duration: 0.65 }, 0.35);
}

/* --------------------------------------------------------------------------
   9. INSURANCE SECTION ARCHITECTURAL ENTRANCE
   -------------------------------------------------------------------------- */
function initInsuranceAnimation() {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const section = document.querySelector('.insurance-section');
  if (!section) return;

  const badge = section.querySelector('.insurance-badge-wrap');
  const title = section.querySelector('.insurance-title');
  const desc = section.querySelector('.insurance-description');
  const btn = section.querySelector('.insurance-cta-btn');
  const callout = section.querySelector('.insurance-pricing-callout');

  gsap.fromTo(
    [badge, title, desc],
    { opacity: 0, y: 30 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    }
  );

  gsap.fromTo(
    [btn, callout],
    { opacity: 0, y: 25 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      delay: 0.25,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    }
  );
}

