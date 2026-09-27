/**
 * Flecto Reconstruction — Forensic Mathematical Shape Morphing & Geometry Engine
 * Implements continuous SVG path generation and responsive coordinate systems
 * matching Bürocratik's Awwwards Site of the Day modular design system.
 */

export interface FlectoViewport {
  width: number;
  height: number;
  unit: number; // Base modular grid unit (default 40px at 1440w)
  scale: number;
}

export interface Point {
  x: number;
  y: number;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  radius?: number;
}

export type HeroMorphState = 
  | 'EMPTY'
  | 'COMPANY_ENTER'
  | 'NETWORK_CONNECT'
  | 'CHANNELS_COMPLETE'
  | 'CHAPTER_02_SAAS';

export class FlectoGeometryEngine {
  private baseWidth: number = 1440;

  /**
   * Calculate viewport scale and responsive dimensions
   */
  public getViewport(width: number, height: number): FlectoViewport {
    const scale = Math.min(1.2, Math.max(0.4, width / this.baseWidth));
    const unit = Math.round(40 * scale);
    return { width, height, unit, scale };
  }

  /**
   * Generates the sculpted outer stage container path (with top canopy and bottom shelf notches)
   */
  public getSculptedContainerPath(w: number = 1440, h: number = 820): string {
    // If mobile viewport (< 768px), return simple smooth rounded rect
    if (w < 768) {
      const r = 24;
      return `M ${r} 0 L ${w - r} 0 A ${r} ${r} 0 0 1 ${w} ${r} L ${w} ${h - r} A ${r} ${r} 0 0 1 ${w - r} ${h} L ${r} ${h} A ${r} ${r} 0 0 1 0 ${h - r} L 0 ${r} A ${r} ${r} 0 0 1 ${r} 0 Z`;
    }

    // Desktop/Tablet sculpted architectural path matching Bürocratik SOTD
    const r = 36;
    const topCanopyStart = Math.round(w * 0.295); // ~426px
    const topCanopyEnd = Math.round(w * 0.690);   // ~994px
    const topStepDownY = Math.round(h * 0.128);    // ~105px
    const botShelfStart = Math.round(w * 0.129);  // ~186px
    const botShelfEnd = Math.round(w * 0.745);    // ~1074px
    const botStepUpY = Math.round(h * 0.896);     // ~735px

    return [
      `M ${topCanopyStart} 0`,
      `L ${topCanopyEnd} 0`,
      `A ${r} ${r} 0 0 1 ${topCanopyEnd + r} ${r}`,
      `L ${topCanopyEnd + r} ${topStepDownY - r}`,
      `A ${r} ${r} 0 0 0 ${topCanopyEnd + r * 2} ${topStepDownY}`,
      `L ${w - r} ${topStepDownY}`,
      `A ${r} ${r} 0 0 1 ${w} ${topStepDownY + r}`,
      `L ${w} ${botStepUpY - r}`,
      `A ${r} ${r} 0 0 1 ${w - r} ${botStepUpY}`,
      `L ${botShelfEnd + r * 2} ${botStepUpY}`,
      `A ${r} ${r} 0 0 0 ${botShelfEnd + r} ${botStepUpY + r}`,
      `L ${botShelfEnd + r} ${h - r}`,
      `A ${r} ${r} 0 0 1 ${botShelfEnd} ${h}`,
      `L ${botShelfStart} ${h}`,
      `A ${r} ${r} 0 0 1 ${botShelfStart - r} ${h - r}`,
      `L ${botShelfStart - r} ${botStepUpY + r}`,
      `A ${r} ${r} 0 0 0 ${botShelfStart - r * 2} ${botStepUpY}`,
      `L ${r} ${botStepUpY}`,
      `A ${r} ${r} 0 0 1 0 ${botStepUpY - r}`,
      `L 0 ${topStepDownY + r}`,
      `A ${r} ${r} 0 0 1 ${r} ${topStepDownY}`,
      `L ${topCanopyStart - r * 2} ${topStepDownY}`,
      `A ${r} ${r} 0 0 0 ${topCanopyStart - r} ${topStepDownY - r}`,
      `L ${topCanopyStart - r} ${r}`,
      `A ${r} ${r} 0 0 1 ${topCanopyStart} 0`,
      `Z`
    ].join(' ');
  }

  /**
   * Generates the horizontal connection stem path with rounded 90-degree filleted branches
   * @param progress 0.0 to 1.0 growth progress
   */
  public getConnectionStemPath(progress: number, originX: number = 420, centerY: number = 410): string {
    if (progress <= 0) return '';

    const maxStemLength = 480;
    const currentLength = maxStemLength * Math.min(1, progress);

    const trunkEndX = originX + currentLength;

    let path = `M ${originX} ${centerY} L ${trunkEndX} ${centerY}`;

    // Branching emerges after progress > 0.4
    if (progress > 0.4) {
      const branchProgress = (progress - 0.4) / 0.6;
      const branchDist = 120 * branchProgress;
      const r = 16;

      // Branch UP to Marketplace
      if (branchDist > r) {
        path += ` M ${originX + 260} ${centerY} ` +
                `A ${r} ${r} 0 0 0 ${originX + 260 + r} ${centerY - r} ` +
                `L ${originX + 260 + r} ${centerY - branchDist}`;
      }

      // Branch DOWN to Physical Store POS
      if (branchDist > r) {
        path += ` M ${originX + 160} ${centerY} ` +
                `A ${r} ${r} 0 0 1 ${originX + 160 + r} ${centerY + r} ` +
                `L ${originX + 160 + r} ${centerY + branchDist * 0.9}`;
      }

      // Branch RIGHT to Online Website
      if (branchDist > r) {
        path += ` M ${originX + 380} ${centerY} ` +
                `A ${r} ${r} 0 0 1 ${originX + 380 + r} ${centerY + r} ` +
                `L ${originX + 380 + r} ${centerY + branchDist * 0.8}`;
      }
    }

    return path;
  }

  /**
   * Generates the 4-block modular Flecto logo mark path
   */
  public getModularLogoPath(cx: number, cy: number, size: number = 48): string {
    const s = size / 2;
    const r = Math.round(s * 0.35); // 35% corner radius
    const gap = 3;

    // 4 rounded rects
    const b1 = `M ${cx - s} ${cy - s + r} A ${r} ${r} 0 0 1 ${cx - s + r} ${cy - s} L ${cx - gap - r} ${cy - s} A ${r} ${r} 0 0 1 ${cx - gap} ${cy - s + r} L ${cx - gap} ${cy - gap - r} A ${r} ${r} 0 0 1 ${cx - gap - r} ${cy - gap} L ${cx - s + r} ${cy - gap} A ${r} ${r} 0 0 1 ${cx - s} ${cy - gap - r} Z`;
    const b2 = `M ${cx + gap} ${cy - s + r} A ${r} ${r} 0 0 1 ${cx + gap + r} ${cy - s} L ${cx + s - r} ${cy - s} A ${r} ${r} 0 0 1 ${cx + s} ${cy - s + r} L ${cx + s} ${cy - gap - r} A ${r} ${r} 0 0 1 ${cx + s - r} ${cy - gap} L ${cx + gap + r} ${cy - gap} A ${r} ${r} 0 0 1 ${cx + gap} ${cy - gap - r} Z`;
    const b3 = `M ${cx - s} ${cy + gap + r} A ${r} ${r} 0 0 1 ${cx - s + r} ${cy + gap} L ${cx - gap - r} ${cy + gap} A ${r} ${r} 0 0 1 ${cx - gap} ${cy + gap + r} L ${cx - gap} ${cy + s - r} A ${r} ${r} 0 0 1 ${cx - gap - r} ${cy + s} L ${cx - s + r} ${cy + s} A ${r} ${r} 0 0 1 ${cx - s} ${cy + s - r} Z`;
    const b4 = `M ${cx + gap} ${cy + gap + r} A ${r} ${r} 0 0 1 ${cx + gap + r} ${cy + gap} L ${cx + s - r} ${cy + gap} A ${r} ${r} 0 0 1 ${cx + s} ${cy + gap + r} L ${cx + s} ${cy + s - r} A ${r} ${r} 0 0 1 ${cx + s - r} ${cy + s} L ${cx + gap + r} ${cy + s} A ${r} ${r} 0 0 1 ${cx + gap} ${cy + s - r} Z`;

    return `${b1} ${b2} ${b3} ${b4}`;
  }

  /**
   * Generates the monumental mint cross path for Scene 2 (The Flecto Link)
   */
  public getScrollyCrossPath(w: number = 960, h: number = 840): string {
    const cx = w / 2;
    const cy = h / 2;
    const slabW = Math.round(w * 0.42); // Central vertical slab
    const slabH = Math.round(h * 0.38); // Horizontal arm height
    const r = 32;

    const left = cx - w / 2;
    const right = cx + w / 2;
    const top = cy - h / 2;
    const bottom = cy + h / 2;

    const vLeft = cx - slabW / 2;
    const vRight = cx + slabW / 2;
    const hTop = cy - slabH / 2;
    const hBottom = cy + slabH / 2;

    return [
      `M ${vLeft + r} ${top}`,
      `L ${vRight - r} ${top}`,
      `A ${r} ${r} 0 0 1 ${vRight} ${top + r}`,
      `L ${vRight} ${hTop - r}`,
      `A ${r} ${r} 0 0 0 ${vRight + r} ${hTop}`,
      `L ${right - r} ${hTop}`,
      `A ${r} ${r} 0 0 1 ${right} ${hTop + r}`,
      `L ${right} ${hBottom - r}`,
      `A ${r} ${r} 0 0 1 ${right - r} ${hBottom}`,
      `L ${vRight + r} ${hBottom}`,
      `A ${r} ${r} 0 0 0 ${vRight} ${hBottom + r}`,
      `L ${vRight} ${bottom - r}`,
      `A ${r} ${r} 0 0 1 ${vRight - r} ${bottom}`,
      `L ${vLeft + r} ${bottom}`,
      `A ${r} ${r} 0 0 1 ${vLeft} ${bottom - r}`,
      `L ${vLeft} ${hBottom + r}`,
      `A ${r} ${r} 0 0 0 ${vLeft - r} ${hBottom}`,
      `L ${left + r} ${hBottom}`,
      `A ${r} ${r} 0 0 1 ${left} ${hBottom - r}`,
      `L ${left} ${hTop + r}`,
      `A ${r} ${r} 0 0 1 ${left + r} ${hTop}`,
      `L ${vLeft - r} ${hTop}`,
      `A ${r} ${r} 0 0 0 ${vLeft} ${hTop - r}`,
      `L ${vLeft} ${top + r}`,
      `A ${r} ${r} 0 0 1 ${vLeft + r} ${top}`,
      `Z`
    ].join(' ');
  }
}

export const flectoGeometry = new FlectoGeometryEngine();
