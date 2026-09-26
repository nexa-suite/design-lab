import type { MasterTimelineConfig } from './types';

/**
 * Master Forensic Motion Timings — Single Source of Truth
 * Synchronized with elem-62bb3911cfdd5765825581.mp4 and elem-62d69ee3303ff845112099.mp4
 * 
 * CRITICAL DEFECT FIXES IMPLEMENTED:
 * 1. Online Store arrival is calibrated to 10.02s (NOT prematurely at 7.4s).
 * 2. Chapter 01 breathing room holds fully settled from 10.333s to 14.167s before Chapter 02 begins.
 * 3. Initial state starts as dominant green stage assembling itself.
 * 4. Pinned payment scene holds until final success milestone and hold are complete.
 */
export const FLECTO_TIMELINE: MasterTimelineConfig = {
  MASTER_CYCLE_DURATION: 48.150, // Full cyclical loop (seconds)
  FPS: 60.0,

  // Chapter 01: Channels & Security
  CHAPTER_01: {
    STAGE_FADE_IN: { start: 0.000, duration: 0.250 },
    
    // YOUR COMPANY Tile entry (-52.78° rotation, large velocity deceleration)
    COMPANY_ENTRY: { 
      start: 0.267, 
      duration: 0.600,
      settle: 0.867,
      initialRotation: -52.78,
      initialScale: 1.22,
      startY: 1155.0,
      targetY: 665.0
    },
    
    // Headline canopy slide down & guarantee reveal
    HEADLINE_REVEAL: { start: 0.450, duration: 0.500 },
    GUARANTEE_REVEAL: { start: 0.600, duration: 0.400 },

    // Intentional Center Hold (1.766s pause)
    CENTER_HOLD: { start: 0.867, duration: 1.766, end: 2.633 },

    // Lateral translation to left anchor
    LATERAL_SHIFT: { 
      start: 2.633, 
      duration: 0.634, 
      end: 3.267, 
      deltaX: -235.0,
      easing: 'power2.inOut'
    },

    // Vascular network trunk projection & modular mark assembly
    TRUNK_DRAW: { start: 3.300, duration: 0.800 },
    MODULAR_MARK_ASSEMBLE: { start: 4.500, duration: 1.500 },

    // Forensic Channel Arrival Sequence (Authentic Pacing):
    // 1. Inquiry arrives ~6.10s
    // 2. Physical Store arrives ~7.67s
    // 3. Online Store arrives ~10.02s (Pass 5 mistakenly had this at 7.4s)
    // 4. Escrow Shield arrives ~10.80s
    CARDS: {
      INQUIRY: { lineStart: 6.000, cardStart: 6.100, duration: 0.400 },
      PHYSICAL_STORE: { lineStart: 7.400, cardStart: 7.670, duration: 0.450 },
      ONLINE_STORE: { lineStart: 9.800, cardStart: 10.020, duration: 0.450 },
      ESCROW_SHIELD: { lineStart: 10.500, badgeStart: 10.750, duration: 0.350 }
    },

    // Chapter 01 Settled Hold: User has time to read the completed omnichannel network
    SETTLED_HOLD: { start: 10.333, end: 14.167 }
  },

  // Chapter 02: SaaS Platform System-Wide Evolution
  CHAPTER_02: {
    MORPH_START: 14.500,
    MIDPOINT_50_PCT: 15.550, // Frame 933 forensic observation
    MORPH_SETTLE: 16.383,
    CARD_EXPANSION_DURATION: 1.883,
    CONTAINER_PRESET_TARGET: 'SAAS',
    EXPLORATION_HOLD: { start: 16.383, end: 24.000 }
  },

  // Chapter 03: Safe Renting & Payment Flow
  CHAPTER_03: {
    TRANSITION_START: 24.000,
    PAYMENT_CIRCUIT_DRAW: { start: 24.800, duration: 1.200 },
    CHIPS_CASCADE: { start: 26.200, stagger: 0.120 },
    PHONE_CHASSIS_ENTER: { start: 27.500, duration: 0.850 },
    VERIFICATION_TIMELINE: { start: 28.500, duration: 2.000 },
    PAYMENT_SUCCESS: 31.000,
    CONFETTI_BURST: { start: 31.200, duration: 4.000, particleCount: 60 },
    SETTLED_HOLD: { start: 35.000, end: 42.000 }
  },

  // Stage Reset & Seamless Loop
  LOOP_RETURN: {
    FADE_OUT: 45.000,
    RESET_COMPONENTS: 47.000,
    CYCLE_COMPLETE: 48.150
  }
};
