/**
 * Flecto Centralized Motion Timing Types
 * Single Source of Truth for Forensic Motion Reconstructions
 */

export interface KeyframeSpan {
  start: number;
  duration: number;
  end?: number;
}

export interface CardArrivalTiming {
  lineStart: number;
  cardStart: number;
  duration: number;
}

export interface CompanyEntryTiming {
  start: number;
  duration: number;
  settle: number;
  initialRotation: number;
  initialScale: number;
  startY: number;
  targetY: number;
}

export interface LateralShiftTiming {
  start: number;
  duration: number;
  end: number;
  deltaX: number;
  easing: string;
}

export interface Chapter01Timeline {
  STAGE_FADE_IN: KeyframeSpan;
  COMPANY_ENTRY: CompanyEntryTiming;
  HEADLINE_REVEAL: KeyframeSpan;
  GUARANTEE_REVEAL: KeyframeSpan;
  CENTER_HOLD: { start: number; duration: number; end: number };
  LATERAL_SHIFT: LateralShiftTiming;
  TRUNK_DRAW: KeyframeSpan;
  MODULAR_MARK_ASSEMBLE: KeyframeSpan;
  CARDS: {
    INQUIRY: CardArrivalTiming;
    PHYSICAL_STORE: CardArrivalTiming;
    ONLINE_STORE: CardArrivalTiming;
    ESCROW_SHIELD: { lineStart: number; badgeStart: number; duration: number };
  };
  SETTLED_HOLD: { start: number; end: number };
}

export interface Chapter02Timeline {
  MORPH_START: number;
  MIDPOINT_50_PCT: number;
  MORPH_SETTLE: number;
  CARD_EXPANSION_DURATION: number;
  CONTAINER_PRESET_TARGET: string;
  EXPLORATION_HOLD: { start: number; end: number };
}

export interface Chapter03Timeline {
  TRANSITION_START: number;
  PAYMENT_CIRCUIT_DRAW: KeyframeSpan;
  CHIPS_CASCADE: { start: number; stagger: number };
  PHONE_CHASSIS_ENTER: KeyframeSpan;
  VERIFICATION_TIMELINE: KeyframeSpan;
  PAYMENT_SUCCESS: number;
  CONFETTI_BURST: { start: number; duration: number; particleCount: number };
  SETTLED_HOLD: { start: number; end: number };
}

export interface MasterTimelineConfig {
  MASTER_CYCLE_DURATION: number;
  FPS: number;
  CHAPTER_01: Chapter01Timeline;
  CHAPTER_02: Chapter02Timeline;
  CHAPTER_03: Chapter03Timeline;
  LOOP_RETURN: {
    FADE_OUT: number;
    RESET_COMPONENTS: number;
    CYCLE_COMPLETE: number;
  };
}
