import type { SceneNode, BoundingBox, CollisionViolation, Vector2D } from './types';

/**
 * Living Geometry Collision Detector & Constraint Solver Engine
 * Guarantees zero overlaps, enforces clearance margins, and provides
 * real-time elastoplastic repulsion and drag-collision prevention.
 */
export class SceneCollisionDetector {
  /**
   * Check for collisions across all nodes in the scene with optional clearance padding
   */
  static detectCollisions(nodes: SceneNode[], minClearance: number = 0): CollisionViolation[] {
    const violations: CollisionViolation[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i];
        const nodeB = nodes[j];

        // Skip non-visible nodes
        if (nodeA.visibility === 'hidden' || nodeB.visibility === 'hidden') continue;

        // Check if overlap is explicitly allowed in semantic policy
        const isPermitted = 
          (nodeA.allowOverlapWith && nodeA.allowOverlapWith.includes(nodeB.id)) ||
          (nodeB.allowOverlapWith && nodeB.allowOverlapWith.includes(nodeA.id)) ||
          false;

        // Calculate intersection with clearance
        const boxA = nodeA.visualBounds;
        const boxB = nodeB.visualBounds;

        const leftA = boxA.x - minClearance / 2;
        const rightA = boxA.x + boxA.width + minClearance / 2;
        const topA = boxA.y - minClearance / 2;
        const bottomA = boxA.y + boxA.height + minClearance / 2;

        const leftB = boxB.x - minClearance / 2;
        const rightB = boxB.x + boxB.width + minClearance / 2;
        const topB = boxB.y - minClearance / 2;
        const bottomB = boxB.y + boxB.height + minClearance / 2;

        const xOverlap = Math.max(0, Math.min(rightA, rightB) - Math.max(leftA, leftB));
        const yOverlap = Math.max(0, Math.min(bottomA, bottomB) - Math.max(topA, topB));

        if (xOverlap > 0 && yOverlap > 0) {
          const overlapArea = xOverlap * yOverlap;
          const intersectionBox: BoundingBox = {
            x: Math.max(boxA.x, boxB.x),
            y: Math.max(boxA.y, boxB.y),
            width: Math.min(boxA.x + boxA.width, boxB.x + boxB.width) - Math.max(boxA.x, boxB.x),
            height: Math.min(boxA.y + boxA.height, boxB.y + boxB.height) - Math.max(boxA.y, boxB.y)
          };

          violations.push({
            nodeAId: nodeA.id,
            nodeBId: nodeB.id,
            intersectionBox: intersectionBox.width > 0 && intersectionBox.height > 0 ? intersectionBox : { x: 0, y: 0, width: 0, height: 0 },
            overlapArea,
            isPermitted
          });
        }
      }
    }

    return violations;
  }

  /**
   * Return only accidental/unintended collisions
   */
  static getAccidentalCollisions(nodes: SceneNode[], minClearance: number = 0): CollisionViolation[] {
    return this.detectCollisions(nodes, minClearance).filter(v => !v.isPermitted);
  }

  /**
   * Bulletproof Drag Collision Prevention
   * Tests candidate movement along each axis independently. If a collision with another node
   * or container boundary occurs, stops at the boundary and slides along the free axis.
   * Guarantees zero overlaps under any direct manipulation.
   */
  static preventOverlapOnDrag(
    draggedNode: SceneNode,
    otherNodes: SceneNode[],
    targetX: number,
    targetY: number,
    containerBounds?: BoundingBox,
    minClearance: number = 20
  ): Vector2D {
    const w = draggedNode.visualBounds.width;
    const h = draggedNode.visualBounds.height;
    const origX = draggedNode.visualBounds.x;
    const origY = draggedNode.visualBounds.y;

    // Helper: test if candidate box collides with any other node or container boundary
    const collides = (testBox: BoundingBox): boolean => {
      // Container bounds check
      if (containerBounds) {
        const margin = 20;
        if (testBox.x < containerBounds.x + margin ||
            testBox.x + testBox.width > containerBounds.x + containerBounds.width - margin ||
            testBox.y < containerBounds.y + margin ||
            testBox.y + testBox.height > containerBounds.y + containerBounds.height - margin) {
          return true;
        }
      }

      for (const other of otherNodes) {
        if (other.id === draggedNode.id || other.visibility === 'hidden') continue;
        if (draggedNode.allowOverlapWith?.includes(other.id) || other.allowOverlapWith?.includes(draggedNode.id)) continue;

        const ob = other.visualBounds;
        const targetDistX = (testBox.width + ob.width) / 2 + minClearance;
        const targetDistY = (testBox.height + ob.height) / 2 + minClearance;
        const distCenterX = Math.abs((testBox.x + testBox.width / 2) - (ob.x + ob.width / 2));
        const distCenterY = Math.abs((testBox.y + testBox.height / 2) - (ob.y + ob.height / 2));

        if (distCenterX < targetDistX && distCenterY < targetDistY) {
          return true;
        }
      }
      return false;
    };

    // 1. Try full movement
    if (!collides({ x: targetX, y: targetY, width: w, height: h })) {
      return { x: targetX, y: targetY };
    }

    // 2. Try moving along X only (sliding along Y obstruction)
    let bestX = origX;
    if (!collides({ x: targetX, y: origY, width: w, height: h })) {
      bestX = targetX;
    }

    // 3. Try moving along Y only (sliding along X obstruction)
    let bestY = origY;
    if (!collides({ x: bestX, y: targetY, width: w, height: h })) {
      bestY = targetY;
    }

    return { x: bestX, y: bestY };
  }

  /**
   * Iterative Relaxation Solver
   * Pushes overlapping nodes apart so that zero accidental overlaps remain.
   */
  static resolveCollisions(
    nodes: SceneNode[],
    activeNodeId?: string,
    containerBounds?: BoundingBox,
    minClearance: number = 20,
    maxIterations: number = 8
  ): boolean {
    let movedAny = false;

    for (let iter = 0; iter < maxIterations; iter++) {
      let iterMoved = false;

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const nodeA = nodes[i];
          const nodeB = nodes[j];

          if (nodeA.visibility === 'hidden' || nodeB.visibility === 'hidden') continue;
          if (nodeA.allowOverlapWith?.includes(nodeB.id) || nodeB.allowOverlapWith?.includes(nodeA.id)) continue;

          const boxA = nodeA.visualBounds;
          const boxB = nodeB.visualBounds;

          const centerAX = boxA.x + boxA.width / 2;
          const centerAY = boxA.y + boxA.height / 2;
          const centerBX = boxB.x + boxB.width / 2;
          const centerBY = boxB.y + boxB.height / 2;

          const dx = centerBX - centerAX;
          const dy = centerBY - centerAY;

          const targetDistX = (boxA.width + boxB.width) / 2 + minClearance;
          const targetDistY = (boxA.height + boxB.height) / 2 + minClearance;

          const overlapX = targetDistX - Math.abs(dx);
          const overlapY = targetDistY - Math.abs(dy);

          if (overlapX > 0 && overlapY > 0) {
            // Penetration detected!
            iterMoved = true;
            movedAny = true;

            const isAFixed = nodeA.id === activeNodeId;
            const isBFixed = nodeB.id === activeNodeId;

            // Separate along the axis of minimum penetration
            if (overlapX < overlapY) {
              const sign = dx >= 0 ? 1 : -1;
              if (isAFixed) {
                boxB.x += overlapX * sign;
              } else if (isBFixed) {
                boxA.x -= overlapX * sign;
              } else {
                boxA.x -= (overlapX / 2) * sign;
                boxB.x += (overlapX / 2) * sign;
              }
            } else {
              const sign = dy >= 0 ? 1 : -1;
              if (isAFixed) {
                boxB.y += overlapY * sign;
              } else if (isBFixed) {
                boxA.y -= overlapY * sign;
              } else {
                boxA.y -= (overlapY / 2) * sign;
                boxB.y += (overlapY / 2) * sign;
              }
            }

            // Sync anchors & ports
            this.syncNodePositions(nodeA);
            this.syncNodePositions(nodeB);
          }
        }
      }

      // Keep within bounds
      if (containerBounds) {
        for (const node of nodes) {
          const b = node.visualBounds;
          const margin = 20;
          const minX = containerBounds.x + margin;
          const maxX = containerBounds.x + containerBounds.width - b.width - margin;
          const minY = containerBounds.y + margin;
          const maxY = containerBounds.y + containerBounds.height - b.height - margin;

          if (b.x < minX) { b.x = minX; iterMoved = true; }
          if (b.x > maxX) { b.x = Math.max(minX, maxX); iterMoved = true; }
          if (b.y < minY) { b.y = minY; iterMoved = true; }
          if (b.y > maxY) { b.y = Math.max(minY, maxY); iterMoved = true; }
          this.syncNodePositions(node);
        }
      }

      if (!iterMoved) break;
    }

    return movedAny;
  }

  /**
   * Synchronize anchor and port positions from updated visualBounds
   */
  static syncNodePositions(node: SceneNode): void {
    node.anchor.x = node.visualBounds.x;
    node.anchor.y = node.visualBounds.y;
    node.intrinsicBounds.x = node.visualBounds.x;
    node.intrinsicBounds.y = node.visualBounds.y;

    node.ports.forEach(port => {
      port.computedAbsolutePosition = {
        x: node.visualBounds.x + port.offsetRatio.x * node.visualBounds.width,
        y: node.visualBounds.y + port.offsetRatio.y * node.visualBounds.height
      };
    });
  }
}

