import type { SceneNode, SceneEdge, SceneRegion } from './types';
import { OrthogonalFilletRouter } from './router';
import { createHeroChapter1Scene } from './hero-scene';

/**
 * Living Geometry Artifact Environment — Master Scene Registry
 * Provides authentic, collision-free semantic scene graphs for all Flecto presets.
 * Every scene features dedicated spatial coordinates, rich content metadata,
 * guaranteed clearance margins (>= 24px), and orthogonal vascular pipes.
 */

export interface SceneGraph {
  nodes: SceneNode[];
  edges: SceneEdge[];
  regions?: SceneRegion[];
}

/**
 * 1. Hero Chapter 01 (Channels & Security)
 */
export function createChannelsScene(w: number, h: number): SceneGraph {
  return createHeroChapter1Scene(w, h);
}

/**
 * 2. Hero Chapter 02 (SaaS Platform Morph)
 */
export function createSaaSScene(w: number, h: number): SceneGraph {
  const isDesktop = w >= 1200;
  
  // Center Cockpit Workbench
  const cockpitW = isDesktop ? 540 : 420;
  const cockpitH = isDesktop ? 260 : 210;
  const cockpitX = (w - cockpitW) / 2;
  const cockpitY = Math.max(160, (h - cockpitH) / 2 - 20);

  // Satellite 1: Live Catalog Inventory (Left)
  const catW = isDesktop ? 240 : 190;
  const catH = isDesktop ? 130 : 110;
  const catX = Math.max(30, cockpitX - catW - 50);
  const catY = cockpitY + 15;

  // Satellite 2: Payments Router (Right)
  const payW = isDesktop ? 240 : 190;
  const payH = isDesktop ? 130 : 110;
  const payX = Math.min(w - payW - 30, cockpitX + cockpitW + 50);
  const payY = cockpitY + 15;

  // Satellite 3: Realtime Telemetry Stream (Bottom Left)
  const telW = isDesktop ? 270 : 210;
  const telH = isDesktop ? 120 : 100;
  const telX = Math.max(40, cockpitX - 80);
  const telY = Math.min(h - telH - 40, cockpitY + cockpitH + 45);

  // Satellite 4: Security & Escrow Compliance (Bottom Right)
  const secW = isDesktop ? 270 : 210;
  const secH = isDesktop ? 120 : 100;
  const secX = Math.min(w - secW - 40, cockpitX + cockpitW - telW + 80);
  const secY = telY;

  const nodes: SceneNode[] = [
    {
      id: 'node-saas-cockpit',
      name: 'Flecto SaaS Platform Core',
      semanticRole: 'hub',
      regionId: 'NETWORK_REGION',
      anchor: { x: cockpitX, y: cockpitY },
      intrinsicBounds: { x: cockpitX, y: cockpitY, width: cockpitW, height: cockpitH },
      visualBounds: { x: cockpitX, y: cockpitY, width: cockpitW, height: cockpitH },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-cockpit-left',
          nodeId: 'node-saas-cockpit',
          role: 'sink',
          signalType: 'circuit_trunk',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.45 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: cockpitX, y: cockpitY + cockpitH * 0.45 }
        },
        {
          id: 'port-cockpit-right',
          nodeId: 'node-saas-cockpit',
          role: 'source',
          signalType: 'circuit_branch',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.45 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: cockpitX + cockpitW, y: cockpitY + cockpitH * 0.45 }
        },
        {
          id: 'port-cockpit-bleft',
          nodeId: 'node-saas-cockpit',
          role: 'source',
          signalType: 'data_flow',
          direction: 'bottom',
          normal: { x: 0, y: 1 },
          offsetRatio: { x: 0.25, y: 1.0 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: cockpitX + cockpitW * 0.25, y: cockpitY + cockpitH }
        },
        {
          id: 'port-cockpit-bright',
          nodeId: 'node-saas-cockpit',
          role: 'source',
          signalType: 'data_flow',
          direction: 'bottom',
          normal: { x: 0, y: 1 },
          offsetRatio: { x: 0.75, y: 1.0 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: cockpitX + cockpitW * 0.75, y: cockpitY + cockpitH }
        }
      ]
    },
    {
      id: 'node-saas-catalog',
      name: 'Multi-Channel Catalog Hub',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: catX, y: catY },
      intrinsicBounds: { x: catX, y: catY, width: catW, height: catH },
      visualBounds: { x: catX, y: catY, width: catW, height: catH },
      zLayer: 54,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-catalog-out',
          nodeId: 'node-saas-catalog',
          role: 'source',
          signalType: 'circuit_trunk',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: catX + catW, y: catY + catH * 0.5 }
        }
      ]
    },
    {
      id: 'node-saas-payments',
      name: 'Stripe Multi-Payout Gateway',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: payX, y: payY },
      intrinsicBounds: { x: payX, y: payY, width: payW, height: payH },
      visualBounds: { x: payX, y: payY, width: payW, height: payH },
      zLayer: 54,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-payments-in',
          nodeId: 'node-saas-payments',
          role: 'sink',
          signalType: 'circuit_branch',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: payX, y: payY + payH * 0.5 }
        }
      ]
    },
    {
      id: 'node-saas-telemetry',
      name: 'Realtime Booking Telemetry',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: telX, y: telY },
      intrinsicBounds: { x: telX, y: telY, width: telW, height: telH },
      visualBounds: { x: telX, y: telY, width: telW, height: telH },
      zLayer: 54,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-telemetry-in',
          nodeId: 'node-saas-telemetry',
          role: 'sink',
          signalType: 'data_flow',
          direction: 'top',
          normal: { x: 0, y: -1 },
          offsetRatio: { x: 0.5, y: 0.0 },
          escapeClearance: 16,
          computedAbsolutePosition: { x: telX + telW * 0.5, y: telY }
        }
      ]
    },
    {
      id: 'node-saas-compliance',
      name: 'Automated Escrow & Insurance',
      semanticRole: 'terminal_badge',
      regionId: 'NETWORK_REGION',
      anchor: { x: secX, y: secY },
      intrinsicBounds: { x: secX, y: secY, width: secW, height: secH },
      visualBounds: { x: secX, y: secY, width: secW, height: secH },
      zLayer: 54,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-compliance-in',
          nodeId: 'node-saas-compliance',
          role: 'sink',
          signalType: 'data_flow',
          direction: 'top',
          normal: { x: 0, y: -1 },
          offsetRatio: { x: 0.5, y: 0.0 },
          escapeClearance: 16,
          computedAbsolutePosition: { x: secX + secW * 0.5, y: secY }
        }
      ]
    }
  ];

  // Vascular Edges
  const r1 = OrthogonalFilletRouter.route(nodes[1].ports[0], nodes[0].ports[0], 16);
  const r2 = OrthogonalFilletRouter.route(nodes[0].ports[1], nodes[2].ports[0], 16);
  const r3 = OrthogonalFilletRouter.route(nodes[0].ports[2], nodes[3].ports[0], 16);
  const r4 = OrthogonalFilletRouter.route(nodes[0].ports[3], nodes[4].ports[0], 16);

  const edges: SceneEdge[] = [
    {
      id: 'edge-catalog-core',
      sourceNodeId: 'node-saas-catalog',
      sourcePortId: 'port-catalog-out',
      targetNodeId: 'node-saas-cockpit',
      targetPortId: 'port-cockpit-left',
      strokeWidth: 24,
      filletRadius: 16,
      colorToken: '#57f09e',
      waypoints: r1.waypoints,
      svgPathData: r1.svgPathData,
      animationOrder: 1,
      drawDuration: 0.6,
      drawDelay: 0.2
    },
    {
      id: 'edge-core-payments',
      sourceNodeId: 'node-saas-cockpit',
      sourcePortId: 'port-cockpit-right',
      targetNodeId: 'node-saas-payments',
      targetPortId: 'port-payments-in',
      strokeWidth: 24,
      filletRadius: 16,
      colorToken: '#57f09e',
      waypoints: r2.waypoints,
      svgPathData: r2.svgPathData,
      animationOrder: 2,
      drawDuration: 0.6,
      drawDelay: 0.4
    },
    {
      id: 'edge-core-telemetry',
      sourceNodeId: 'node-saas-cockpit',
      sourcePortId: 'port-cockpit-bleft',
      targetNodeId: 'node-saas-telemetry',
      targetPortId: 'port-telemetry-in',
      strokeWidth: 20,
      filletRadius: 14,
      colorToken: '#57f09e',
      waypoints: r3.waypoints,
      svgPathData: r3.svgPathData,
      animationOrder: 3,
      drawDuration: 0.5,
      drawDelay: 0.6
    },
    {
      id: 'edge-core-compliance',
      sourceNodeId: 'node-saas-cockpit',
      sourcePortId: 'port-cockpit-bright',
      targetNodeId: 'node-saas-compliance',
      targetPortId: 'port-compliance-in',
      strokeWidth: 20,
      filletRadius: 14,
      colorToken: '#57f09e',
      waypoints: r4.waypoints,
      svgPathData: r4.svgPathData,
      animationOrder: 4,
      drawDuration: 0.5,
      drawDelay: 0.8
    }
  ];

  return { nodes, edges };
}

/**
 * 3. Safe Renting / Payment Flow (Chapter 03 / Flecto Link)
 */
export function createPaymentScene(w: number, h: number): SceneGraph {
  // Mobile Phone Mockup (Center)
  const phoneW = 270;
  const phoneH = Math.min(480, h - 160);
  const phoneX = (w - phoneW) / 2;
  const phoneY = Math.max(80, (h - phoneH) / 2);

  // Milestone 1: Reserve Item (Left Top)
  const m1W = 230;
  const m1H = 95;
  const m1X = Math.max(30, phoneX - m1W - 48);
  const m1Y = phoneY + 30;

  // Milestone 2: Identity Verification (Left Bottom)
  const m2W = 230;
  const m2H = 95;
  const m2X = m1X;
  const m2Y = m1Y + m1H + 35;

  // Milestone 3: Escrow Deposit Hold (Right Top)
  const m3W = 230;
  const m3H = 95;
  const m3X = Math.min(w - m3W - 30, phoneX + phoneW + 48);
  const m3Y = phoneY + 30;

  // Milestone 4: Instant Payout & Confetti (Right Bottom)
  const m4W = 230;
  const m4H = 105;
  const m4X = m3X;
  const m4Y = m3Y + m3H + 35;

  const nodes: SceneNode[] = [
    {
      id: 'node-phone-device',
      name: 'iOS Checkout Interface',
      semanticRole: 'hub',
      regionId: 'NETWORK_REGION',
      anchor: { x: phoneX, y: phoneY },
      intrinsicBounds: { x: phoneX, y: phoneY, width: phoneW, height: phoneH },
      visualBounds: { x: phoneX, y: phoneY, width: phoneW, height: phoneH },
      zLayer: 60,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-phone-m1',
          nodeId: 'node-phone-device',
          role: 'sink',
          signalType: 'circuit_branch',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.22 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: phoneX, y: phoneY + phoneH * 0.22 }
        },
        {
          id: 'port-phone-m2',
          nodeId: 'node-phone-device',
          role: 'sink',
          signalType: 'circuit_branch',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.55 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: phoneX, y: phoneY + phoneH * 0.55 }
        },
        {
          id: 'port-phone-m3',
          nodeId: 'node-phone-device',
          role: 'source',
          signalType: 'escrow_link',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.22 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: phoneX + phoneW, y: phoneY + phoneH * 0.22 }
        },
        {
          id: 'port-phone-m4',
          nodeId: 'node-phone-device',
          role: 'source',
          signalType: 'escrow_link',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.55 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: phoneX + phoneW, y: phoneY + phoneH * 0.55 }
        }
      ]
    },
    {
      id: 'node-m1-reserve',
      name: '1. Reserve & Date Selection',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: m1X, y: m1Y },
      intrinsicBounds: { x: m1X, y: m1Y, width: m1W, height: m1H },
      visualBounds: { x: m1X, y: m1Y, width: m1W, height: m1H },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-m1-out',
          nodeId: 'node-m1-reserve',
          role: 'source',
          signalType: 'circuit_branch',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.5 },
          escapeClearance: 16,
          computedAbsolutePosition: { x: m1X + m1W, y: m1Y + m1H * 0.5 }
        }
      ]
    },
    {
      id: 'node-m2-verify',
      name: '2. Identity & Fraud Check',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: m2X, y: m2Y },
      intrinsicBounds: { x: m2X, y: m2Y, width: m2W, height: m2H },
      visualBounds: { x: m2X, y: m2Y, width: m2W, height: m2H },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-m2-out',
          nodeId: 'node-m2-verify',
          role: 'source',
          signalType: 'circuit_branch',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.5 },
          escapeClearance: 16,
          computedAbsolutePosition: { x: m2X + m2W, y: m2Y + m2H * 0.5 }
        }
      ]
    },
    {
      id: 'node-m3-escrow',
      name: '3. Digital Escrow Deposit',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: m3X, y: m3Y },
      intrinsicBounds: { x: m3X, y: m3Y, width: m3W, height: m3H },
      visualBounds: { x: m3X, y: m3Y, width: m3W, height: m3H },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-m3-in',
          nodeId: 'node-m3-escrow',
          role: 'sink',
          signalType: 'escrow_link',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.5 },
          escapeClearance: 16,
          computedAbsolutePosition: { x: m3X, y: m3Y + m3H * 0.5 }
        }
      ]
    },
    {
      id: 'node-m4-payout',
      name: '4. Return Verified & Payout',
      semanticRole: 'terminal_badge',
      regionId: 'NETWORK_REGION',
      anchor: { x: m4X, y: m4Y },
      intrinsicBounds: { x: m4X, y: m4Y, width: m4W, height: m4H },
      visualBounds: { x: m4X, y: m4Y, width: m4W, height: m4H },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-m4-in',
          nodeId: 'node-m4-payout',
          role: 'sink',
          signalType: 'escrow_link',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.5 },
          escapeClearance: 16,
          computedAbsolutePosition: { x: m4X, y: m4Y + m4H * 0.5 }
        }
      ]
    }
  ];

  const r1 = OrthogonalFilletRouter.route(nodes[1].ports[0], nodes[0].ports[0], 16);
  const r2 = OrthogonalFilletRouter.route(nodes[2].ports[0], nodes[0].ports[1], 16);
  const r3 = OrthogonalFilletRouter.route(nodes[0].ports[2], nodes[3].ports[0], 16);
  const r4 = OrthogonalFilletRouter.route(nodes[0].ports[3], nodes[4].ports[0], 16);

  const edges: SceneEdge[] = [
    {
      id: 'edge-pay-m1',
      sourceNodeId: 'node-m1-reserve',
      sourcePortId: 'port-m1-out',
      targetNodeId: 'node-phone-device',
      targetPortId: 'port-phone-m1',
      strokeWidth: 20,
      filletRadius: 14,
      colorToken: '#57f09e',
      waypoints: r1.waypoints,
      svgPathData: r1.svgPathData,
      animationOrder: 1,
      drawDuration: 0.5,
      drawDelay: 0.2
    },
    {
      id: 'edge-pay-m2',
      sourceNodeId: 'node-m2-verify',
      sourcePortId: 'port-m2-out',
      targetNodeId: 'node-phone-device',
      targetPortId: 'port-phone-m2',
      strokeWidth: 20,
      filletRadius: 14,
      colorToken: '#57f09e',
      waypoints: r2.waypoints,
      svgPathData: r2.svgPathData,
      animationOrder: 2,
      drawDuration: 0.5,
      drawDelay: 0.4
    },
    {
      id: 'edge-pay-m3',
      sourceNodeId: 'node-phone-device',
      sourcePortId: 'port-phone-m3',
      targetNodeId: 'node-m3-escrow',
      targetPortId: 'port-m3-in',
      strokeWidth: 20,
      filletRadius: 14,
      colorToken: '#fbbf24',
      waypoints: r3.waypoints,
      svgPathData: r3.svgPathData,
      animationOrder: 3,
      drawDuration: 0.5,
      drawDelay: 0.6
    },
    {
      id: 'edge-pay-m4',
      sourceNodeId: 'node-phone-device',
      sourcePortId: 'port-phone-m4',
      targetNodeId: 'node-m4-payout',
      targetPortId: 'port-m4-in',
      strokeWidth: 20,
      filletRadius: 14,
      colorToken: '#57f09e',
      waypoints: r4.waypoints,
      svgPathData: r4.svgPathData,
      animationOrder: 4,
      drawDuration: 0.5,
      drawDelay: 0.8
    }
  ];

  return { nodes, edges };
}

/**
 * 4. Access Channels ("Market Bento" - "eso de market, la sección beige")
 * 4-column asymmetric bento composition matching unsection-features.jpg
 */
export function createAccessChannelsScene(w: number, _h: number): SceneGraph {
  // Grid layout parameters
  const paddingX = Math.max(30, (w - 1380) / 2 + 30);
  const availableW = w - paddingX * 2;
  const colGap = 20;
  const rowGap = 20;

  const colW = (availableW - colGap * 3) / 4;
  const row1H = 260;
  const row2H = 160;
  const row3H = 160;
  const startY = 60;

  // Row 1: Flecto Market (Cols 1-2) & Dedicated Online Store (Cols 3-4)
  const marketX = paddingX;
  const marketY = startY;
  const marketW = colW * 2 + colGap;

  const storeX = marketX + marketW + colGap;
  const storeY = startY;
  const storeW = colW * 2 + colGap;

  // Row 2: Sales €21k (Col 1), Safe Shield (Col 2), Booking Flow (Col 3, tall rows 2-3), Easy Snap (Col 4)
  const salesX = paddingX;
  const salesY = marketY + row1H + rowGap;
  const salesW = colW;

  const safeX = salesX + salesW + colGap;
  const safeY = salesY;
  const safeW = colW;

  const bookingX = safeX + safeW + colGap;
  const bookingY = salesY;
  const bookingW = colW;
  const bookingH = row2H + rowGap + row3H;

  const easyX = bookingX + bookingW + colGap;
  const easyY = salesY;
  const easyW = colW;

  // Row 3: Boost Leads (Cols 1-2), Advanced SEO (Col 4)
  const boostX = paddingX;
  const boostY = salesY + row2H + rowGap;
  const boostW = colW * 2 + colGap;

  const seoX = easyX;
  const seoY = boostY;
  const seoW = colW;

  const nodes: SceneNode[] = [
    {
      id: 'node-bento-market',
      name: 'Flecto Market Catalog',
      semanticRole: 'hub',
      regionId: 'NETWORK_REGION',
      anchor: { x: marketX, y: marketY },
      intrinsicBounds: { x: marketX, y: marketY, width: marketW, height: row1H },
      visualBounds: { x: marketX, y: marketY, width: marketW, height: row1H },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-bento-store',
      name: 'Dedicated Online Store',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: storeX, y: storeY },
      intrinsicBounds: { x: storeX, y: storeY, width: storeW, height: row1H },
      visualBounds: { x: storeX, y: storeY, width: storeW, height: row1H },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-bento-sales',
      name: 'Sales Revenue €21k Wave',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: salesX, y: salesY },
      intrinsicBounds: { x: salesX, y: salesY, width: salesW, height: row2H },
      visualBounds: { x: salesX, y: salesY, width: salesW, height: row2H },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-bento-safe',
      name: 'Safe Guarantee Shield',
      semanticRole: 'terminal_badge',
      regionId: 'NETWORK_REGION',
      anchor: { x: safeX, y: safeY },
      intrinsicBounds: { x: safeX, y: safeY, width: safeW, height: row2H },
      visualBounds: { x: safeX, y: safeY, width: safeW, height: row2H },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-bento-boost',
      name: 'Boost Leads Sand Banner',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: boostX, y: boostY },
      intrinsicBounds: { x: boostX, y: boostY, width: boostW, height: row3H },
      visualBounds: { x: boostX, y: boostY, width: boostW, height: row3H },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-bento-booking',
      name: 'Manage Entire Booking Flow',
      semanticRole: 'hub',
      regionId: 'NETWORK_REGION',
      anchor: { x: bookingX, y: bookingY },
      intrinsicBounds: { x: bookingX, y: bookingY, width: bookingW, height: bookingH },
      visualBounds: { x: bookingX, y: bookingY, width: bookingW, height: bookingH },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-bento-easy',
      name: 'Easy Snapping Hand',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: easyX, y: easyY },
      intrinsicBounds: { x: easyX, y: easyY, width: easyW, height: row2H },
      visualBounds: { x: easyX, y: easyY, width: easyW, height: row2H },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-bento-seo',
      name: 'Advanced SEO Sand Card',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: seoX, y: seoY },
      intrinsicBounds: { x: seoX, y: seoY, width: seoW, height: row3H },
      visualBounds: { x: seoX, y: seoY, width: seoW, height: row3H },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    }
  ];

  return { nodes, edges: [] };
}

/**
 * 5. Global Footer (Sculpted Beige Silhouette)
 * Asymmetric contour layout matching unsection-footer.jpg
 */
export function createFooterBeigeScene(w: number, h: number): SceneGraph {
  const isDesktop = w >= 1200;
  const paddingX = Math.max(30, (w - 1380) / 2 + 30);

  // 1. Book a Demo Tab (Top Canopy, Elevated at Center)
  const tabW = 200;
  const tabH = 50;
  const tabX = (w - tabW) / 2;
  const tabY = 15;

  // 2. Modular Mark (Left Column)
  const markW = isDesktop ? 220 : 160;
  const markH = isDesktop ? 160 : 120;
  const markX = paddingX + 20;
  const markY = 120;

  // 3. Newsletter Capsule (Center-Left)
  const newsW = isDesktop ? 360 : 280;
  const newsH = 110;
  const newsX = markX + markW + (isDesktop ? 40 : 20);
  const newsY = markY;

  // 4. Backed-by Investors Cluster (Center-Right)
  const backW = isDesktop ? 300 : 240;
  const backH = 100;
  const backX = newsX + newsW + (isDesktop ? 40 : 20);
  const backY = markY;

  // 5. Sitemap Navigation (Right)
  const siteW = isDesktop ? 260 : 200;
  const siteH = 180;
  const siteX = Math.min(w - siteW - paddingX - 10, backX + backW + 30);
  const siteY = markY;

  // 6. Made by Büro White Notch (Bottom Right Recess)
  const notchW = 180;
  const notchH = 45;
  const notchX = w - notchW - paddingX - 20;
  const notchY = Math.min(h - notchH - 15, 450);

  const nodes: SceneNode[] = [
    {
      id: 'node-footer-demo-tab',
      name: 'Book a Demo Canopy Tab',
      semanticRole: 'headline_canopy',
      regionId: 'NAV_REGION',
      anchor: { x: tabX, y: tabY },
      intrinsicBounds: { x: tabX, y: tabY, width: tabW, height: tabH },
      visualBounds: { x: tabX, y: tabY, width: tabW, height: tabH },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-footer-mark',
      name: 'Modular 4-Brick Flecto Mark',
      semanticRole: 'origin',
      regionId: 'NETWORK_REGION',
      anchor: { x: markX, y: markY },
      intrinsicBounds: { x: markX, y: markY, width: markW, height: markH },
      visualBounds: { x: markX, y: markY, width: markW, height: markH },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-footer-newsletter',
      name: 'Newsletter Subscription Capsule',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: newsX, y: newsY },
      intrinsicBounds: { x: newsX, y: newsY, width: newsW, height: newsH },
      visualBounds: { x: newsX, y: newsY, width: newsW, height: newsH },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-footer-investors',
      name: 'Backed by: Techstars, Übermorgen, Maze',
      semanticRole: 'terminal_badge',
      regionId: 'NETWORK_REGION',
      anchor: { x: backX, y: backY },
      intrinsicBounds: { x: backX, y: backY, width: backW, height: backH },
      visualBounds: { x: backX, y: backY, width: backW, height: backH },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-footer-sitemap',
      name: 'Sitemap Navigation Links',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: siteX, y: siteY },
      intrinsicBounds: { x: siteX, y: siteY, width: siteW, height: siteH },
      visualBounds: { x: siteX, y: siteY, width: siteW, height: siteH },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    },
    {
      id: 'node-footer-notch',
      name: 'Made by Büro White Notch',
      semanticRole: 'terminal_badge',
      regionId: 'LOWER_CAPTION_REGION',
      anchor: { x: notchX, y: notchY },
      intrinsicBounds: { x: notchX, y: notchY, width: notchW, height: notchH },
      visualBounds: { x: notchX, y: notchY, width: notchW, height: notchH },
      zLayer: 60,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: []
    }
  ];

  return { nodes, edges: [] };
}

/**
 * 6. Insurance Protection Stage
 */
export function createInsuranceScene(w: number, h: number): SceneGraph {
  const isDesktop = w >= 1200;
  const hubW = isDesktop ? 220 : 180;
  const hubH = isDesktop ? 120 : 100;
  const hubX = Math.round((w - hubW) / 2);
  const hubY = Math.round(h * 0.32);

  const policyW = isDesktop ? 220 : 180;
  const policyH = isDesktop ? 100 : 90;
  const policyX = Math.max(40, hubX - policyW - 60);
  const policyY = hubY + 10;

  const claimW = isDesktop ? 220 : 180;
  const claimH = isDesktop ? 100 : 90;
  const claimX = Math.min(w - claimW - 40, hubX + hubW + 60);
  const claimY = hubY + 10;

  const guaranteeW = isDesktop ? 220 : 180;
  const guaranteeH = isDesktop ? 100 : 90;
  const guaranteeX = Math.round((w - guaranteeW) / 2);
  const guaranteeY = Math.min(h - guaranteeH - 40, hubY + hubH + 60);

  const nodes: SceneNode[] = [
    {
      id: 'node-ins-hub',
      name: 'Nexa Protection Engine',
      semanticRole: 'hub',
      regionId: 'NETWORK_REGION',
      anchor: { x: hubX, y: hubY },
      intrinsicBounds: { x: hubX, y: hubY, width: hubW, height: hubH },
      visualBounds: { x: hubX, y: hubY, width: hubW, height: hubH },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-ins-hub-in',
          nodeId: 'node-ins-hub',
          role: 'sink',
          signalType: 'circuit_trunk',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: hubX, y: hubY + hubH * 0.5 }
        },
        {
          id: 'port-ins-hub-right',
          nodeId: 'node-ins-hub',
          role: 'source',
          signalType: 'circuit_branch',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: hubX + hubW, y: hubY + hubH * 0.5 }
        },
        {
          id: 'port-ins-hub-bottom',
          nodeId: 'node-ins-hub',
          role: 'source',
          signalType: 'escrow_link',
          direction: 'bottom',
          normal: { x: 0, y: 1 },
          offsetRatio: { x: 0.5, y: 1.0 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: hubX + hubW * 0.5, y: hubY + hubH }
        }
      ]
    },
    {
      id: 'node-ins-policy',
      name: 'Smart Policy Underwriting',
      semanticRole: 'origin',
      regionId: 'NETWORK_REGION',
      anchor: { x: policyX, y: policyY },
      intrinsicBounds: { x: policyX, y: policyY, width: policyW, height: policyH },
      visualBounds: { x: policyX, y: policyY, width: policyW, height: policyH },
      zLayer: 54,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-ins-policy-out',
          nodeId: 'node-ins-policy',
          role: 'source',
          signalType: 'circuit_trunk',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: policyX + policyW, y: policyY + policyH * 0.5 }
        }
      ]
    },
    {
      id: 'node-ins-claims',
      name: 'Instant Claims Settlement',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: claimX, y: claimY },
      intrinsicBounds: { x: claimX, y: claimY, width: claimW, height: claimH },
      visualBounds: { x: claimX, y: claimY, width: claimW, height: claimH },
      zLayer: 54,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-ins-claim-in',
          nodeId: 'node-ins-claims',
          role: 'sink',
          signalType: 'circuit_branch',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: claimX, y: claimY + claimH * 0.5 }
        }
      ]
    },
    {
      id: 'node-ins-guarantee',
      name: 'Escrow Guarantee Shield',
      semanticRole: 'terminal_badge',
      regionId: 'NETWORK_REGION',
      anchor: { x: guaranteeX, y: guaranteeY },
      intrinsicBounds: { x: guaranteeX, y: guaranteeY, width: guaranteeW, height: guaranteeH },
      visualBounds: { x: guaranteeX, y: guaranteeY, width: guaranteeW, height: guaranteeH },
      zLayer: 54,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-ins-guarantee-in',
          nodeId: 'node-ins-guarantee',
          role: 'sink',
          signalType: 'escrow_link',
          direction: 'top',
          normal: { x: 0, y: -1 },
          offsetRatio: { x: 0.5, y: 0.0 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: guaranteeX + guaranteeW * 0.5, y: guaranteeY }
        }
      ]
    }
  ];

  const r1 = OrthogonalFilletRouter.route(nodes[1].ports[0], nodes[0].ports[0], 16);
  const r2 = OrthogonalFilletRouter.route(nodes[0].ports[1], nodes[2].ports[0], 16);
  const r3 = OrthogonalFilletRouter.route(nodes[0].ports[2], nodes[3].ports[0], 16);

  const edges: SceneEdge[] = [
    {
      id: 'edge-ins-policy',
      sourceNodeId: 'node-ins-policy',
      sourcePortId: 'port-ins-policy-out',
      targetNodeId: 'node-ins-hub',
      targetPortId: 'port-ins-hub-in',
      strokeWidth: 20,
      filletRadius: 16,
      colorToken: '#57f09e',
      waypoints: r1.waypoints,
      svgPathData: r1.svgPathData,
      animationOrder: 1,
      drawDuration: 0.5,
      drawDelay: 0.2
    },
    {
      id: 'edge-ins-claims',
      sourceNodeId: 'node-ins-hub',
      sourcePortId: 'port-ins-hub-right',
      targetNodeId: 'node-ins-claims',
      targetPortId: 'port-ins-claim-in',
      strokeWidth: 20,
      filletRadius: 16,
      colorToken: '#57f09e',
      waypoints: r2.waypoints,
      svgPathData: r2.svgPathData,
      animationOrder: 2,
      drawDuration: 0.5,
      drawDelay: 0.4
    },
    {
      id: 'edge-ins-guarantee',
      sourceNodeId: 'node-ins-hub',
      sourcePortId: 'port-ins-hub-bottom',
      targetNodeId: 'node-ins-guarantee',
      targetPortId: 'port-ins-guarantee-in',
      strokeWidth: 20,
      filletRadius: 16,
      colorToken: '#57f09e',
      waypoints: r3.waypoints,
      svgPathData: r3.svgPathData,
      animationOrder: 3,
      drawDuration: 0.5,
      drawDelay: 0.6
    }
  ];

  return { nodes, edges };
}

/**
 * 7. Sustainability Aerial Canvas
 */
export function createSustainabilityScene(w: number, h: number): SceneGraph {
  const isDesktop = w >= 1200;
  const hubW = isDesktop ? 240 : 190;
  const hubH = isDesktop ? 120 : 100;
  const hubX = Math.round((w - hubW) / 2);
  const hubY = Math.round(h * 0.32);

  const footW = isDesktop ? 220 : 180;
  const footH = isDesktop ? 100 : 90;
  const footX = Math.max(40, hubX - footW - 60);
  const footY = hubY + 10;

  const fleetW = isDesktop ? 220 : 180;
  const fleetH = isDesktop ? 100 : 90;
  const fleetX = Math.min(w - fleetW - 40, hubX + hubW + 60);
  const fleetY = hubY + 10;

  const recW = isDesktop ? 240 : 190;
  const recH = isDesktop ? 100 : 90;
  const recX = Math.round((w - recW) / 2);
  const recY = Math.min(h - recH - 40, hubY + hubH + 60);

  const nodes: SceneNode[] = [
    {
      id: 'node-sust-hub',
      name: 'Circular Lifecycle Platform',
      semanticRole: 'hub',
      regionId: 'NETWORK_REGION',
      anchor: { x: hubX, y: hubY },
      intrinsicBounds: { x: hubX, y: hubY, width: hubW, height: hubH },
      visualBounds: { x: hubX, y: hubY, width: hubW, height: hubH },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-sust-hub-in',
          nodeId: 'node-sust-hub',
          role: 'sink',
          signalType: 'circuit_trunk',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: hubX, y: hubY + hubH * 0.5 }
        },
        {
          id: 'port-sust-hub-right',
          nodeId: 'node-sust-hub',
          role: 'source',
          signalType: 'circuit_branch',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: hubX + hubW, y: hubY + hubH * 0.5 }
        },
        {
          id: 'port-sust-hub-bottom',
          nodeId: 'node-sust-hub',
          role: 'source',
          signalType: 'data_flow',
          direction: 'bottom',
          normal: { x: 0, y: 1 },
          offsetRatio: { x: 0.5, y: 1.0 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: hubX + hubW * 0.5, y: hubY + hubH }
        }
      ]
    },
    {
      id: 'node-sust-footprint',
      name: 'Carbon Emission Ledger',
      semanticRole: 'origin',
      regionId: 'NETWORK_REGION',
      anchor: { x: footX, y: footY },
      intrinsicBounds: { x: footX, y: footY, width: footW, height: footH },
      visualBounds: { x: footX, y: footY, width: footW, height: footH },
      zLayer: 54,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-sust-foot-out',
          nodeId: 'node-sust-footprint',
          role: 'source',
          signalType: 'circuit_trunk',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: footX + footW, y: footY + footH * 0.5 }
        }
      ]
    },
    {
      id: 'node-sust-fleet',
      name: 'Fleet Electrification',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: fleetX, y: fleetY },
      intrinsicBounds: { x: fleetX, y: fleetY, width: fleetW, height: fleetH },
      visualBounds: { x: fleetX, y: fleetY, width: fleetW, height: fleetH },
      zLayer: 54,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-sust-fleet-in',
          nodeId: 'node-sust-fleet',
          role: 'sink',
          signalType: 'circuit_branch',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: fleetX, y: fleetY + fleetH * 0.5 }
        }
      ]
    },
    {
      id: 'node-sust-recovery',
      name: 'Automated Asset Recovery',
      semanticRole: 'terminal_badge',
      regionId: 'NETWORK_REGION',
      anchor: { x: recX, y: recY },
      intrinsicBounds: { x: recX, y: recY, width: recW, height: recH },
      visualBounds: { x: recX, y: recY, width: recW, height: recH },
      zLayer: 54,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-sust-rec-in',
          nodeId: 'node-sust-recovery',
          role: 'sink',
          signalType: 'data_flow',
          direction: 'top',
          normal: { x: 0, y: -1 },
          offsetRatio: { x: 0.5, y: 0.0 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: recX + recW * 0.5, y: recY }
        }
      ]
    }
  ];

  const r1 = OrthogonalFilletRouter.route(nodes[1].ports[0], nodes[0].ports[0], 16);
  const r2 = OrthogonalFilletRouter.route(nodes[0].ports[1], nodes[2].ports[0], 16);
  const r3 = OrthogonalFilletRouter.route(nodes[0].ports[2], nodes[3].ports[0], 16);

  const edges: SceneEdge[] = [
    {
      id: 'edge-sust-foot',
      sourceNodeId: 'node-sust-footprint',
      sourcePortId: 'port-sust-foot-out',
      targetNodeId: 'node-sust-hub',
      targetPortId: 'port-sust-hub-in',
      strokeWidth: 20,
      filletRadius: 16,
      colorToken: '#57f09e',
      waypoints: r1.waypoints,
      svgPathData: r1.svgPathData,
      animationOrder: 1,
      drawDuration: 0.5,
      drawDelay: 0.2
    },
    {
      id: 'edge-sust-fleet',
      sourceNodeId: 'node-sust-hub',
      sourcePortId: 'port-sust-hub-right',
      targetNodeId: 'node-sust-fleet',
      targetPortId: 'port-sust-fleet-in',
      strokeWidth: 20,
      filletRadius: 16,
      colorToken: '#57f09e',
      waypoints: r2.waypoints,
      svgPathData: r2.svgPathData,
      animationOrder: 2,
      drawDuration: 0.5,
      drawDelay: 0.4
    },
    {
      id: 'edge-sust-rec',
      sourceNodeId: 'node-sust-hub',
      sourcePortId: 'port-sust-hub-bottom',
      targetNodeId: 'node-sust-recovery',
      targetPortId: 'port-sust-rec-in',
      strokeWidth: 20,
      filletRadius: 16,
      colorToken: '#57f09e',
      waypoints: r3.waypoints,
      svgPathData: r3.svgPathData,
      animationOrder: 3,
      drawDuration: 0.5,
      drawDelay: 0.6
    }
  ];

  return { nodes, edges };
}

/**
 * Master Scene Dispatcher for Presets
 */
export function createSceneForPreset(presetId: string, stageWidth: number, stageHeight: number): SceneGraph {
  switch (presetId) {
    case 'SAAS':
      return createSaaSScene(stageWidth, stageHeight);
    case 'PAYMENT':
      return createPaymentScene(stageWidth, stageHeight);
    case 'INSURANCE':
      return createInsuranceScene(stageWidth, stageHeight);
    case 'SUSTAINABILITY':
      return createSustainabilityScene(stageWidth, stageHeight);
    case 'ACCESS_CHANNELS':
      return createAccessChannelsScene(stageWidth, stageHeight);
    case 'FOOTER_BEIGE':
      return createFooterBeigeScene(stageWidth, stageHeight);
    case 'CHANNELS':
    default:
      return createChannelsScene(stageWidth, stageHeight);
  }
}
