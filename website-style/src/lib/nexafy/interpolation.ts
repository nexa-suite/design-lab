/**
 * Nexafy Geometry Lab — Shared Interpolation & Morphing Engine
 * INTERNAL SANDBOX TOOL — NOT PRODUCTION PRODUCT
 * 
 * Provides deterministic 0 -> 1 morphing between topologically compatible paths
 * without any commercial or proprietary runtime dependencies.
 */

import type { PathCommand, Point2D } from './types';
import { commandsToSvgPath } from './geometry';

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function lerpPoint(p1: Point2D, p2: Point2D, t: number): Point2D {
  return {
    x: lerp(p1.x, p2.x, t),
    y: lerp(p1.y, p2.y, t)
  };
}

export function interpolateCommands(cmdsA: PathCommand[], cmdsB: PathCommand[], t: number): PathCommand[] {
  if (cmdsA.length !== cmdsB.length) {
    console.warn(`[Nexafy Morph] Command length mismatch: ${cmdsA.length} vs ${cmdsB.length}. Falling back.`);
    return t < 0.5 ? cmdsA : cmdsB;
  }

  const clampedT = Math.max(0, Math.min(1, t));
  const result: PathCommand[] = [];

  for (let i = 0; i < cmdsA.length; i++) {
    const a = cmdsA[i];
    const b = cmdsB[i];

    if (a.type === 'M' && b.type === 'M') {
      result.push({
        type: 'M',
        start: lerpPoint(a.start, b.start, clampedT)
      });
    } else if (a.type === 'L' && b.type === 'L') {
      result.push({
        type: 'L',
        end: lerpPoint(a.end, b.end, clampedT)
      });
    } else if (a.type === 'C' && b.type === 'C') {
      result.push({
        type: 'C',
        cp1: lerpPoint(a.cp1, b.cp1, clampedT),
        cp2: lerpPoint(a.cp2, b.cp2, clampedT),
        end: lerpPoint(a.end, b.end, clampedT)
      });
    } else if (a.type === 'Z' && b.type === 'Z') {
      result.push({ type: 'Z' });
    } else {
      // Incompatible command fallback
      result.push(clampedT < 0.5 ? a : b);
    }
  }

  return result;
}

export function interpolateSvgPath(cmdsA: PathCommand[], cmdsB: PathCommand[], t: number): string {
  const interpolated = interpolateCommands(cmdsA, cmdsB, t);
  return commandsToSvgPath(interpolated);
}

// Built-in easing curves for preview and GSAP synchronization
export const easings = {
  linear: (t: number) => t,
  easeInOutQuad: (t: number) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  easeInOutCubic: (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  easeOutCubic: (t: number) => (--t) * t * t + 1
};
