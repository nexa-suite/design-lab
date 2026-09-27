/**
 * Nexafy Geometry Lab — Shared Parametric Geometry Engine
 * INTERNAL SANDBOX TOOL — NOT PRODUCTION PRODUCT
 * 
 * Provides stable, topologically consistent 26-command path generation
 * for all sculpted Flecto stage containers.
 */

import type { NexafyShapeConfig, PathCommand, Point2D, CubicSegment, LineSegment } from './types';

const KAPPA = 0.552284749831; // Standard cubic bezier circle approximation factor

function createCubic(_p0: Point2D, p1: Point2D, p2: Point2D, p3: Point2D): CubicSegment {
  return {
    type: 'C',
    cp1: { x: p1.x, y: p1.y },
    cp2: { x: p2.x, y: p2.y },
    end: { x: p3.x, y: p3.y }
  };
}

function createLine(p: Point2D): LineSegment {
  return {
    type: 'L',
    end: { x: p.x, y: p.y }
  };
}

export function generateContainerCommands(config: NexafyShapeConfig): PathCommand[] {
  const W = config.width;
  const H = config.height;
  const rBase = Math.min(config.baseRadius, W / 4, H / 4);

  // Crown metrics
  const crownEnabled = config.crown.enabled;
  const crownH = crownEnabled ? config.crown.height : 0;
  const crownW = crownEnabled ? Math.min(config.crown.width, W - 2 * rBase) : 0;
  const crownX = crownEnabled ? (config.crown.x !== undefined ? config.crown.x : (W - crownW) / 2) : W / 2;
  const crownXR = crownX + crownW;
  const rCrown = crownEnabled ? Math.min(config.crown.radius, crownW / 2, crownH) : 0;
  const rFilletCrown = crownEnabled ? Math.min(config.crown.filletRadius, (crownX - rBase), crownH) : 0;

  // Shelf metrics
  const shelfEnabled = config.shelf.enabled;
  const shelfH = shelfEnabled ? config.shelf.height : 0;
  const shelfW = shelfEnabled ? Math.min(config.shelf.width, W - 2 * rBase) : 0;
  const shelfX = shelfEnabled ? (config.shelf.x !== undefined ? config.shelf.x : (W - shelfW) / 2) : W / 2;
  const shelfXR = shelfX + shelfW;
  const rShelf = shelfEnabled ? Math.min(config.shelf.radius, shelfW / 2, shelfH) : 0;
  const rFilletShelf = shelfEnabled ? Math.min(config.shelf.filletRadius, (shelfX - rBase), shelfH) : 0;

  const yShoulderTop = crownH;
  const yShoulderBottom = H - shelfH;

  const commands: PathCommand[] = [];

  if (crownEnabled) {
    // Start at top-left of crown flat top
    commands.push({ type: 'M', start: { x: crownX + rCrown, y: 0 } });

    // 1. Crown top edge
    commands.push(createLine({ x: crownXR - rCrown, y: 0 }));

    // 2. Crown top-right corner (curving down to right side of crown)
    commands.push(createCubic(
      { x: crownXR - rCrown, y: 0 },
      { x: crownXR - rCrown + rCrown * KAPPA, y: 0 },
      { x: crownXR, y: rCrown * (1 - KAPPA) },
      { x: crownXR, y: rCrown }
    ));

    // 3. Crown right vertical drop
    commands.push(createLine({ x: crownXR, y: yShoulderTop - rFilletCrown }));

    // 4. Crown right concave fillet (transitioning into horizontal top right shoulder)
    commands.push(createCubic(
      { x: crownXR, y: yShoulderTop - rFilletCrown },
      { x: crownXR, y: yShoulderTop - rFilletCrown + rFilletCrown * KAPPA },
      { x: crownXR + rFilletCrown * (1 - KAPPA), y: yShoulderTop },
      { x: crownXR + rFilletCrown, y: yShoulderTop }
    ));
  } else {
    // Collapsed top crown
    commands.push({ type: 'M', start: { x: rBase, y: 0 } });
    commands.push(createLine({ x: W / 2, y: 0 }));
    commands.push(createCubic({ x: W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: 0 }));
    commands.push(createLine({ x: W / 2, y: 0 }));
    commands.push(createCubic({ x: W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: 0 }));
  }

  // 5. Top-right shoulder horizontal run
  commands.push(createLine({ x: W - rBase, y: yShoulderTop }));

  // 6. Top-right outer corner
  commands.push(createCubic(
    { x: W - rBase, y: yShoulderTop },
    { x: W - rBase + rBase * KAPPA, y: yShoulderTop },
    { x: W, y: yShoulderTop + rBase * (1 - KAPPA) },
    { x: W, y: yShoulderTop + rBase }
  ));

  // 7. Right vertical edge
  commands.push(createLine({ x: W, y: yShoulderBottom - rBase }));

  // 8. Bottom-right outer corner
  commands.push(createCubic(
    { x: W, y: yShoulderBottom - rBase },
    { x: W, y: yShoulderBottom - rBase + rBase * KAPPA },
    { x: W - rBase + rBase * (1 - KAPPA), y: yShoulderBottom },
    { x: W - rBase, y: yShoulderBottom }
  ));

  if (shelfEnabled) {
    // 9. Bottom-right shoulder inward run
    commands.push(createLine({ x: shelfXR + rFilletShelf, y: yShoulderBottom }));

    // 10. Shelf right concave fillet
    commands.push(createCubic(
      { x: shelfXR + rFilletShelf, y: yShoulderBottom },
      { x: shelfXR + rFilletShelf - rFilletShelf * KAPPA, y: yShoulderBottom },
      { x: shelfXR, y: yShoulderBottom + rFilletShelf * (1 - KAPPA) },
      { x: shelfXR, y: yShoulderBottom + rFilletShelf }
    ));

    // 11. Shelf right vertical drop
    commands.push(createLine({ x: shelfXR, y: H - rShelf }));

    // 12. Shelf bottom-right corner
    commands.push(createCubic(
      { x: shelfXR, y: H - rShelf },
      { x: shelfXR, y: H - rShelf + rShelf * KAPPA },
      { x: shelfXR - rShelf * (1 - KAPPA), y: H },
      { x: shelfXR - rShelf, y: H }
    ));

    // 13. Shelf bottom horizontal run
    commands.push(createLine({ x: shelfX + rShelf, y: H }));

    // 14. Shelf bottom-left corner
    commands.push(createCubic(
      { x: shelfX + rShelf, y: H },
      { x: shelfX + rShelf - rShelf * KAPPA, y: H },
      { x: shelfX, y: H - rShelf * (1 - KAPPA) },
      { x: shelfX, y: H - rShelf }
    ));

    // 15. Shelf left vertical rise
    commands.push(createLine({ x: shelfX, y: yShoulderBottom + rFilletShelf }));

    // 16. Shelf left concave fillet
    commands.push(createCubic(
      { x: shelfX, y: yShoulderBottom + rFilletShelf },
      { x: shelfX, y: yShoulderBottom + rFilletShelf - rFilletShelf * KAPPA },
      { x: shelfX - rFilletShelf * (1 - KAPPA), y: yShoulderBottom },
      { x: shelfX - rFilletShelf, y: yShoulderBottom }
    ));
  } else {
    // Collapsed bottom shelf
    commands.push(createLine({ x: W / 2, y: yShoulderBottom }));
    commands.push(createCubic({ x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }));
    commands.push(createLine({ x: W / 2, y: yShoulderBottom }));
    commands.push(createCubic({ x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }));
    commands.push(createLine({ x: W / 2, y: yShoulderBottom }));
    commands.push(createCubic({ x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }));
    commands.push(createLine({ x: W / 2, y: yShoulderBottom }));
    commands.push(createCubic({ x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }, { x: W / 2, y: yShoulderBottom }));
  }

  // 17. Bottom-left shoulder outward run
  commands.push(createLine({ x: rBase, y: yShoulderBottom }));

  // 18. Bottom-left outer corner
  commands.push(createCubic(
    { x: rBase, y: yShoulderBottom },
    { x: rBase - rBase * KAPPA, y: yShoulderBottom },
    { x: 0, y: yShoulderBottom - rBase * (1 - KAPPA) },
    { x: 0, y: yShoulderBottom - rBase }
  ));

  // 19. Left vertical edge
  commands.push(createLine({ x: 0, y: yShoulderTop + rBase }));

  // 20. Top-left outer corner
  commands.push(createCubic(
    { x: 0, y: yShoulderTop + rBase },
    { x: 0, y: yShoulderTop + rBase - rBase * KAPPA },
    { x: rBase * (1 - KAPPA), y: yShoulderTop },
    { x: rBase, y: yShoulderTop }
  ));

  if (crownEnabled) {
    // 21. Top-left shoulder inward run
    commands.push(createLine({ x: crownX - rFilletCrown, y: yShoulderTop }));

    // 22. Crown left concave fillet
    commands.push(createCubic(
      { x: crownX - rFilletCrown, y: yShoulderTop },
      { x: crownX - rFilletCrown + rFilletCrown * KAPPA, y: yShoulderTop },
      { x: crownX, y: yShoulderTop - rFilletCrown * (1 - KAPPA) },
      { x: crownX, y: yShoulderTop - rFilletCrown }
    ));

    // 23. Crown left vertical rise
    commands.push(createLine({ x: crownX, y: rCrown }));

    // 24. Crown top-left corner
    commands.push(createCubic(
      { x: crownX, y: rCrown },
      { x: crownX, y: rCrown - rCrown * KAPPA },
      { x: crownX + rCrown * (1 - KAPPA), y: 0 },
      { x: crownX + rCrown, y: 0 }
    ));
  } else {
    // Collapsed left crown transition
    commands.push(createLine({ x: W / 2, y: 0 }));
    commands.push(createCubic({ x: W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: 0 }));
    commands.push(createLine({ x: W / 2, y: 0 }));
    commands.push(createCubic({ x: W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: 0 }, { x: W / 2, y: 0 }));
  }

  // 25. Close path
  commands.push({ type: 'Z' });

  return commands;
}

export function commandsToSvgPath(commands: PathCommand[]): string {
  return commands.map(cmd => {
    switch (cmd.type) {
      case 'M':
        return `M ${round(cmd.start.x)} ${round(cmd.start.y)}`;
      case 'L':
        return `L ${round(cmd.end.x)} ${round(cmd.end.y)}`;
      case 'C':
        return `C ${round(cmd.cp1.x)} ${round(cmd.cp1.y)}, ${round(cmd.cp2.x)} ${round(cmd.cp2.y)}, ${round(cmd.end.x)} ${round(cmd.end.y)}`;
      case 'Z':
        return 'Z';
    }
  }).join(' ');
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

function interpolatePoint(p1: Point2D, p2: Point2D, t: number): Point2D {
  return {
    x: p1.x + (p2.x - p1.x) * t,
    y: p1.y + (p2.y - p1.y) * t,
  };
}

export function interpolateCommands(cmdsA: PathCommand[], cmdsB: PathCommand[], t: number): PathCommand[] {
  return cmdsA.map((cmdA, i) => {
    const cmdB = cmdsB[i];
    if (!cmdB) return cmdA;
    if (cmdA.type === 'M' && cmdB.type === 'M') {
      return { type: 'M', start: interpolatePoint(cmdA.start, cmdB.start, t) };
    }
    if (cmdA.type === 'L' && cmdB.type === 'L') {
      return { type: 'L', end: interpolatePoint(cmdA.end, cmdB.end, t) };
    }
    if (cmdA.type === 'C' && cmdB.type === 'C') {
      return {
        type: 'C',
        cp1: interpolatePoint(cmdA.cp1, cmdB.cp1, t),
        cp2: interpolatePoint(cmdA.cp2, cmdB.cp2, t),
        end: interpolatePoint(cmdA.end, cmdB.end, t),
      };
    }
    return cmdB;
  });
}
