import type { Vector2D, ScenePort } from './types';

const KAPPA = 0.552284749831;

/**
 * Deterministic Orthogonal Filleted Connector Router
 * Computes Manhattan routes between source and target ports with smooth Bezier fillet bends.
 */
export class OrthogonalFilletRouter {
  /**
   * Route from source port to target port
   */
  static route(
    source: ScenePort,
    target: ScenePort,
    filletRadius: number = 16
  ): { waypoints: Vector2D[]; svgPathData: string } {
    const p1 = source.computedAbsolutePosition || { x: 0, y: 0 };
    const p2 = target.computedAbsolutePosition || { x: 0, y: 0 };

    // Initial waypoints with escape clearances
    const esc1 = source.escapeClearance || 20;
    const esc2 = target.escapeClearance || 20;

    const w1: Vector2D = {
      x: p1.x + source.normal.x * esc1,
      y: p1.y + source.normal.y * esc1
    };

    const w4: Vector2D = {
      x: p2.x + target.normal.x * esc2,
      y: p2.y + target.normal.y * esc2
    };

    const waypoints: Vector2D[] = [p1, w1];

    // Orthogonal middle routing
    if (source.direction === 'right' && target.direction === 'top') {
      // Step right, then drop down
      const corner: Vector2D = { x: p2.x, y: w1.y };
      waypoints.push(corner);
      waypoints.push(w4);
    } else if (source.direction === 'bottom' && target.direction === 'top') {
      // Step down, step x to target, step down to target
      const midY = (w1.y + w4.y) / 2;
      waypoints.push({ x: w1.x, y: midY });
      waypoints.push({ x: w4.x, y: midY });
      waypoints.push(w4);
    } else if (source.direction === 'right' && target.direction === 'left') {
      // Direct horizontal bridge
      if (Math.abs(w1.y - w4.y) < 2) {
        // straight line
      } else {
        const midX = (w1.x + w4.x) / 2;
        waypoints.push({ x: midX, y: w1.y });
        waypoints.push({ x: midX, y: w4.y });
        waypoints.push(w4);
      }
    } else {
      // Generic Manhattan L-turn
      waypoints.push({ x: p2.x, y: w1.y });
      waypoints.push(w4);
    }

    waypoints.push(p2);

    // Clean redundant collinear points
    const simplified = this.simplifyCollinear(waypoints);

    // Generate filleted SVG Path Data
    const svgPathData = this.buildFilletedPath(simplified, filletRadius);

    return {
      waypoints: simplified,
      svgPathData
    };
  }

  /**
   * Remove redundant collinear waypoints
   */
  private static simplifyCollinear(pts: Vector2D[]): Vector2D[] {
    if (pts.length <= 2) return pts;
    const result: Vector2D[] = [pts[0]];

    for (let i = 1; i < pts.length - 1; i++) {
      const prev = result[result.length - 1];
      const curr = pts[i];
      const next = pts[i + 1];

      const dx1 = curr.x - prev.x;
      const dy1 = curr.y - prev.y;
      const dx2 = next.x - curr.x;
      const dy2 = next.y - curr.y;

      // If in same direction, skip curr
      const isCollinearX = Math.abs(dy1) < 0.1 && Math.abs(dy2) < 0.1 && Math.sign(dx1) === Math.sign(dx2);
      const isCollinearY = Math.abs(dx1) < 0.1 && Math.abs(dx2) < 0.1 && Math.sign(dy1) === Math.sign(dy2);

      if (!isCollinearX && !isCollinearY) {
        result.push(curr);
      }
    }

    result.push(pts[pts.length - 1]);
    return result;
  }

  /**
   * Convert waypoints into continuous SVG path with cubic Bezier fillets
   */
  private static buildFilletedPath(pts: Vector2D[], maxRadius: number): string {
    if (pts.length < 2) return '';
    if (pts.length === 2) {
      return `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} L ${pts[1].x.toFixed(1)} ${pts[1].y.toFixed(1)}`;
    }

    let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)}`;

    for (let i = 1; i < pts.length - 1; i++) {
      const prev = pts[i - 1];
      const curr = pts[i];
      const next = pts[i + 1];

      // Segment vectors
      const vPrev = { x: prev.x - curr.x, y: prev.y - curr.y };
      const vNext = { x: next.x - curr.x, y: next.y - curr.y };

      const lenPrev = Math.hypot(vPrev.x, vPrev.y);
      const lenNext = Math.hypot(vNext.x, vNext.y);

      // Max radius cannot exceed half of either segment
      const r = Math.min(maxRadius, lenPrev / 2, lenNext / 2);

      if (r < 2) {
        // Sharp turn if radius too small
        d += ` L ${curr.x.toFixed(1)} ${curr.y.toFixed(1)}`;
        continue;
      }

      // Normalized vectors
      const uPrev = { x: vPrev.x / lenPrev, y: vPrev.y / lenPrev };
      const uNext = { x: vNext.x / lenNext, y: vNext.y / lenNext };

      // Fillet start & end points
      const t1 = { x: curr.x + uPrev.x * r, y: curr.y + uPrev.y * r };
      const t2 = { x: curr.x + uNext.x * r, y: curr.y + uNext.y * r };

      // Bezier control points using Kappa constant
      const cp1 = { x: t1.x + (curr.x - t1.x) * KAPPA, y: t1.y + (curr.y - t1.y) * KAPPA };
      const cp2 = { x: t2.x + (curr.x - t2.x) * KAPPA, y: t2.y + (curr.y - t2.y) * KAPPA };

      // Draw line to fillet start, then cubic Bezier curve to fillet end
      d += ` L ${t1.x.toFixed(1)} ${t1.y.toFixed(1)}`;
      d += ` C ${cp1.x.toFixed(1)} ${cp1.y.toFixed(1)}, ${cp2.x.toFixed(1)} ${cp2.y.toFixed(1)}, ${t2.x.toFixed(1)} ${t2.y.toFixed(1)}`;
    }

    const last = pts[pts.length - 1];
    d += ` L ${last.x.toFixed(1)} ${last.y.toFixed(1)}`;
    return d;
  }
}
