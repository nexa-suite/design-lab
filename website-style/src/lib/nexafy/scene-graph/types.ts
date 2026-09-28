/**
 * Living Geometry — Semantic Scene Graph Core Contracts
 * Location: src/lib/nexafy/scene-graph/types.ts
 */

export type PortDirection = 'top' | 'right' | 'bottom' | 'left';
export type PortRole = 'source' | 'sink' | 'bidirectional';
export type SignalType = 'circuit_trunk' | 'circuit_branch' | 'escrow_link' | 'data_flow';

export interface Vector2D {
  x: number;
  y: number;
}

export interface BoundingBox {
  x: number;      // Top-left X in stage coordinates
  y: number;      // Top-left Y in stage coordinates
  width: number;
  height: number;
}

export interface Insets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Connection port defined on a node boundary
 */
export interface ScenePort {
  id: string;
  nodeId: string;
  role: PortRole;
  signalType: SignalType;
  direction: PortDirection;
  normal: Vector2D; // Normalized outward vector (e.g. {x: 1, y: 0} for right)
  offsetRatio: Vector2D; // Position relative to parent node visual bounds (fractional 0..1)
  computedAbsolutePosition?: Vector2D;
  escapeClearance: number; // Clearance distance required before bending
}

/**
 * Directed vascular connection between two ports
 */
export interface SceneEdge {
  id: string;
  sourceNodeId: string;
  sourcePortId: string;
  targetNodeId: string;
  targetPortId: string;
  strokeWidth: number;         // Historical standard: 28px
  filletRadius: number;        // Bend smoothing radius: 12px to 20px
  colorToken: string;          // e.g. '#38bdf8'
  waypoints: Vector2D[];
  svgPathData: string;
  animationOrder: number;      // Sequential sequence step (1 to 5)
  drawDuration: number;        // Time in seconds to draw line
  drawDelay: number;           // Absolute forensic timeline offset (s)
}

/**
 * Macro layout container organizing nodes into spatial domains
 */
export type SceneRegionId = 
  | 'STAGE_CANVAS'
  | 'NAV_REGION'
  | 'HEADLINE_REGION'
  | 'NETWORK_REGION'
  | 'LOWER_CAPTION_REGION'
  | 'CHAPTER_TRACKER_REGION';

export interface SceneRegion {
  id: SceneRegionId;
  bounds: BoundingBox;
  padding: Insets;
  zIndex: number;
  lanes?: {
    horizontal: Array<{ id: string; y: number; height: number }>;
    vertical: Array<{ id: string; x: number; width: number }>;
  };
}

/**
 * Discrete node in the semantic graph
 */
export interface SceneNode {
  id: string;
  name: string;
  semanticRole: 
    | 'origin'             // YOUR COMPANY tile
    | 'hub'                // Flecto modular logo manifold
    | 'leaf_channel'       // Physical Store, Online Store, Customer Inquiry
    | 'terminal_badge'     // Escrow Shield, Phone Pill
    | 'backdrop_container' // Sculpted stage frame
    | 'headline_canopy'    // Top monumental editorial
    | 'tracker'            // Bottom chapter progression
    | 'floating_control';  // Chat bubble, restart pill

  regionId: SceneRegionId;
  parentId?: string;
  
  // Spatial Extents
  anchor: Vector2D;
  intrinsicBounds: BoundingBox;
  visualBounds: BoundingBox;
  
  // Topological Connections
  ports: ScenePort[];
  
  // Rendering State
  zLayer: number; // 0..100
  visibility: 'visible' | 'hidden' | 'transparent';
  
  // Dynamic Motion Transforms
  motionState: {
    x: number;
    y: number;
    scale: number;
    rotation: number;
    opacity: number;
  };
  
  // Layout Collision Policy
  allowOverlapWith?: string[]; // IDs of nodes permitted to visually touch/overlap
}

export interface CollisionViolation {
  nodeAId: string;
  nodeBId: string;
  intersectionBox: BoundingBox;
  overlapArea: number;
  isPermitted: boolean;
}
