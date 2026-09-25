/**
 * Nexafy Geometry Lab — Shared Type Definitions
 * INTERNAL SANDBOX TOOL — NOT PRODUCTION PRODUCT
 */

export interface Point2D {
  x: number;
  y: number;
}

export interface CubicSegment {
  type: 'C';
  cp1: Point2D;
  cp2: Point2D;
  end: Point2D;
}

export interface LineSegment {
  type: 'L';
  end: Point2D;
}

export interface MoveSegment {
  type: 'M';
  start: Point2D;
}

export interface CloseSegment {
  type: 'Z';
}

export type PathCommand = MoveSegment | LineSegment | CubicSegment | CloseSegment;

export interface NexafyCrownConfig {
  enabled: boolean;
  x?: number; // center x offset or null for centered
  width: number;
  height: number;
  radius: number;
  filletRadius: number;
}

export interface NexafyShelfConfig {
  enabled: boolean;
  x?: number; // center x offset or null for centered
  width: number;
  height: number;
  radius: number;
  filletRadius: number;
}

export interface NexafyShapeConfig {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
  baseRadius: number;
  crown: NexafyCrownConfig;
  shelf: NexafyShelfConfig;
  colors: {
    background: string;
    mintAccent: string;
    surface: string;
    border?: string;
  };
}

export interface NexafyModularMarkConfig {
  unit: number; // width/height unit e.g. 40px
  gap: number; // gap between bricks e.g. 6px
  radius: number; // corner radius e.g. 10px
  stagger: number; // vertical step e.g. 28px
  stemThickness: number; // e.g. 28px
}
