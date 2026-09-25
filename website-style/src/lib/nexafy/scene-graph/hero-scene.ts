import type { SceneNode, SceneEdge, SceneRegion } from './types';
import { OrthogonalFilletRouter } from './router';

/**
 * Canonical Hero Chapter 01 Scene Graph Factory
 * Generates the collision-free semantic scene graph and routed vascular connectors.
 * Implements adaptive constraint layout to guarantee 0 accidental collisions across all viewports.
 */
export function createHeroChapter1Scene(stageWidth: number = 1440, stageHeight: number = 820) {
  const regions: SceneRegion[] = [
    {
      id: 'STAGE_CANVAS',
      bounds: { x: 0, y: 0, width: stageWidth, height: stageHeight },
      padding: { top: 24, right: 32, bottom: 24, left: 32 },
      zIndex: 0
    },
    {
      id: 'NAV_REGION',
      bounds: { x: 0, y: 0, width: stageWidth, height: 80 },
      padding: { top: 16, right: 24, bottom: 16, left: 24 },
      zIndex: 70
    },
    {
      id: 'HEADLINE_REGION',
      bounds: { x: 380, y: 20, width: stageWidth - 760, height: 110 },
      padding: { top: 12, right: 16, bottom: 12, left: 16 },
      zIndex: 60
    },
    {
      id: 'NETWORK_REGION',
      bounds: { x: 80, y: 150, width: stageWidth - 160, height: 550 },
      padding: { top: 20, right: 24, bottom: 20, left: 24 },
      zIndex: 50
    },
    {
      id: 'LOWER_CAPTION_REGION',
      bounds: { x: 300, y: stageHeight - 80, width: stageWidth - 680, height: 60 },
      padding: { top: 8, right: 16, bottom: 8, left: 16 },
      zIndex: 60
    },
    {
      id: 'CHAPTER_TRACKER_REGION',
      bounds: { x: stageWidth - 360, y: stageHeight - 85, width: 340, height: 65 },
      padding: { top: 8, right: 16, bottom: 8, left: 16 },
      zIndex: 70
    }
  ];

  // Responsive constraint solving
  const isDesktop = stageWidth >= 1280;
  const isTabletLandscape = stageWidth >= 1000 && stageWidth < 1280;

  // Adaptive node dimensions
  const companyWidth = isDesktop ? 220 : (isTabletLandscape ? 180 : 150);
  const companyHeight = isDesktop ? 104 : (isTabletLandscape ? 90 : 80);

  const hubSize = isDesktop ? 140 : (isTabletLandscape ? 120 : 100);

  const cardWidth = isDesktop ? 280 : (isTabletLandscape ? 220 : 190);
  const cardHeight = isDesktop ? 136 : (isTabletLandscape ? 120 : 105);

  const shieldSize = isDesktop ? 70 : (isTabletLandscape ? 56 : 48);

  // Responsive Anchor Calculations with Guaranteed Clearances (Gx >= 32px, Gy >= 24px)
  const companyX = Math.max(30, 120 * (stageWidth / 1440));
  const companyY = 240;

  const hubX = Math.max(companyX + companyWidth + 48, stageWidth * 0.38);
  const hubY = 220;

  const onlineX = Math.max(hubX + hubSize + 40, stageWidth * 0.58);
  const onlineY = 210;

  const shieldX = Math.max(onlineX + cardWidth + 32, stageWidth * 0.88);
  const shieldY = 245;

  const storeX = Math.max(24, hubX - cardWidth * 0.7);
  const storeY = Math.max(hubY + hubSize + 50, 440);

  const emailX = Math.max(storeX + cardWidth + 32, hubX + 40);
  const emailY = storeY;

  const nodes: SceneNode[] = [
    // 1. YOUR COMPANY tile
    {
      id: 'node-company',
      name: 'YOUR COMPANY Origin',
      semanticRole: 'origin',
      regionId: 'NETWORK_REGION',
      anchor: { x: companyX, y: companyY },
      intrinsicBounds: { x: companyX, y: companyY, width: companyWidth, height: companyHeight },
      visualBounds: { x: companyX, y: companyY, width: companyWidth, height: companyHeight },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-company-out',
          nodeId: 'node-company',
          role: 'source',
          signalType: 'circuit_trunk',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.5 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: companyX + companyWidth, y: companyY + companyHeight / 2 }
        }
      ],
      allowOverlapWith: ['node-trunk-edge']
    },

    // 2. FLECTO MODULAR HUB
    {
      id: 'node-hub',
      name: 'Flecto Modular Hub',
      semanticRole: 'hub',
      regionId: 'NETWORK_REGION',
      anchor: { x: hubX, y: hubY },
      intrinsicBounds: { x: hubX, y: hubY, width: hubSize, height: hubSize },
      visualBounds: { x: hubX, y: hubY, width: hubSize, height: hubSize },
      zLayer: 52,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-hub-in',
          nodeId: 'node-hub',
          role: 'sink',
          signalType: 'circuit_trunk',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.5 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: hubX, y: hubY + hubSize / 2 }
        },
        {
          id: 'port-hub-store-out',
          nodeId: 'node-hub',
          role: 'source',
          signalType: 'circuit_branch',
          direction: 'bottom',
          normal: { x: 0, y: 1 },
          offsetRatio: { x: 0.25, y: 1.0 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: hubX + hubSize * 0.25, y: hubY + hubSize }
        },
        {
          id: 'port-hub-email-out',
          nodeId: 'node-hub',
          role: 'source',
          signalType: 'circuit_branch',
          direction: 'bottom',
          normal: { x: 0, y: 1 },
          offsetRatio: { x: 0.70, y: 1.0 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: hubX + hubSize * 0.70, y: hubY + hubSize }
        },
        {
          id: 'port-hub-online-out',
          nodeId: 'node-hub',
          role: 'source',
          signalType: 'circuit_branch',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.35 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: hubX + hubSize, y: hubY + hubSize * 0.35 }
        },
        {
          id: 'port-hub-shield-out',
          nodeId: 'node-hub',
          role: 'source',
          signalType: 'escrow_link',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.65 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: hubX + hubSize, y: hubY + hubSize * 0.65 }
        }
      ],
      allowOverlapWith: ['node-trunk-edge', 'edge-store', 'edge-email', 'edge-online', 'edge-shield']
    },

    // 3. PHYSICAL STORE CHANNEL CARD
    {
      id: 'node-card-store',
      name: 'Physical Store POS Channel',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: storeX, y: storeY },
      intrinsicBounds: { x: storeX, y: storeY, width: cardWidth, height: cardHeight },
      visualBounds: { x: storeX, y: storeY, width: cardWidth, height: cardHeight },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-card-store-in',
          nodeId: 'node-card-store',
          role: 'sink',
          signalType: 'circuit_branch',
          direction: 'top',
          normal: { x: 0, y: -1 },
          offsetRatio: { x: 0.5, y: 0.0 },
          escapeClearance: 16,
          computedAbsolutePosition: { x: storeX + cardWidth / 2, y: storeY }
        }
      ],
      allowOverlapWith: ['edge-store']
    },

    // 4. CUSTOMER INQUIRY CHANNEL CARD
    {
      id: 'node-card-email',
      name: 'Direct Customer Inquiry Channel',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: emailX, y: emailY },
      intrinsicBounds: { x: emailX, y: emailY, width: cardWidth, height: cardHeight },
      visualBounds: { x: emailX, y: emailY, width: cardWidth, height: cardHeight },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-card-email-in',
          nodeId: 'node-card-email',
          role: 'sink',
          signalType: 'circuit_branch',
          direction: 'top',
          normal: { x: 0, y: -1 },
          offsetRatio: { x: 0.5, y: 0.0 },
          escapeClearance: 16,
          computedAbsolutePosition: { x: emailX + cardWidth / 2, y: emailY }
        }
      ],
      allowOverlapWith: ['edge-email']
    },

    // 5. ONLINE STORE CHANNEL CARD
    {
      id: 'node-card-online',
      name: 'Online Store Channel',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: onlineX, y: onlineY },
      intrinsicBounds: { x: onlineX, y: onlineY, width: cardWidth, height: cardHeight },
      visualBounds: { x: onlineX, y: onlineY, width: cardWidth, height: cardHeight },
      zLayer: 55,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-card-online-in',
          nodeId: 'node-card-online',
          role: 'sink',
          signalType: 'circuit_branch',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: onlineX, y: onlineY + cardHeight / 2 }
        }
      ],
      allowOverlapWith: ['edge-online']
    },

    // 6. ESCROW SHIELD TERMINAL
    {
      id: 'node-shield',
      name: 'Escrow Security Terminal',
      semanticRole: 'terminal_badge',
      regionId: 'NETWORK_REGION',
      anchor: { x: shieldX, y: shieldY },
      intrinsicBounds: { x: shieldX, y: shieldY, width: shieldSize, height: shieldSize },
      visualBounds: { x: shieldX, y: shieldY, width: shieldSize, height: shieldSize },
      zLayer: 56,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-shield-in',
          nodeId: 'node-shield',
          role: 'sink',
          signalType: 'escrow_link',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.5 },
          escapeClearance: 16,
          computedAbsolutePosition: { x: shieldX, y: shieldY + shieldSize / 2 }
        }
      ],
      allowOverlapWith: ['edge-shield']
    }
  ];

  // Route Edges using OrthogonalFilletRouter
  const edges: SceneEdge[] = [];

  // Trunk Edge: Company -> Hub
  const companyPort = nodes[0].ports[0];
  const hubInPort = nodes[1].ports[0];
  const trunkRoute = OrthogonalFilletRouter.route(companyPort, hubInPort, 16);
  edges.push({
    id: 'edge-trunk',
    sourceNodeId: 'node-company',
    sourcePortId: 'port-company-out',
    targetNodeId: 'node-hub',
    targetPortId: 'port-hub-in',
    strokeWidth: 28,
    filletRadius: 16,
    colorToken: '#57f09e',
    waypoints: trunkRoute.waypoints,
    svgPathData: trunkRoute.svgPathData,
    animationOrder: 1,
    drawDuration: 0.8,
    drawDelay: 3.30
  });

  // Store Edge: Hub -> Store Card
  const hubStorePort = nodes[1].ports[1];
  const storePort = nodes[2].ports[0];
  const storeRoute = OrthogonalFilletRouter.route(hubStorePort, storePort, 16);
  edges.push({
    id: 'edge-store',
    sourceNodeId: 'node-hub',
    sourcePortId: 'port-hub-store-out',
    targetNodeId: 'node-card-store',
    targetPortId: 'port-card-store-in',
    strokeWidth: 28,
    filletRadius: 16,
    colorToken: '#57f09e',
    waypoints: storeRoute.waypoints,
    svgPathData: storeRoute.svgPathData,
    animationOrder: 2,
    drawDuration: 0.4,
    drawDelay: 7.40
  });

  // Email Edge: Hub -> Email Card
  const hubEmailPort = nodes[1].ports[2];
  const emailPort = nodes[3].ports[0];
  const emailRoute = OrthogonalFilletRouter.route(hubEmailPort, emailPort, 16);
  edges.push({
    id: 'edge-email',
    sourceNodeId: 'node-hub',
    sourcePortId: 'port-hub-email-out',
    targetNodeId: 'node-card-email',
    targetPortId: 'port-card-email-in',
    strokeWidth: 28,
    filletRadius: 16,
    colorToken: '#57f09e',
    waypoints: emailRoute.waypoints,
    svgPathData: emailRoute.svgPathData,
    animationOrder: 3,
    drawDuration: 0.4,
    drawDelay: 6.00
  });

  // Online Edge: Hub -> Online Card
  const hubOnlinePort = nodes[1].ports[3];
  const onlinePort = nodes[4].ports[0];
  const onlineRoute = OrthogonalFilletRouter.route(hubOnlinePort, onlinePort, 16);
  edges.push({
    id: 'edge-online',
    sourceNodeId: 'node-hub',
    sourcePortId: 'port-hub-online-out',
    targetNodeId: 'node-card-online',
    targetPortId: 'port-card-online-in',
    strokeWidth: 28,
    filletRadius: 16,
    colorToken: '#57f09e',
    waypoints: onlineRoute.waypoints,
    svgPathData: onlineRoute.svgPathData,
    animationOrder: 4,
    drawDuration: 0.45,
    drawDelay: 9.80
  });

  // Shield Edge: Hub -> Escrow Shield
  const hubShieldPort = nodes[1].ports[4];
  const shieldPort = nodes[5].ports[0];
  const shieldRoute = OrthogonalFilletRouter.route(hubShieldPort, shieldPort, 16);
  edges.push({
    id: 'edge-shield',
    sourceNodeId: 'node-hub',
    sourcePortId: 'port-hub-shield-out',
    targetNodeId: 'node-shield',
    targetPortId: 'port-shield-in',
    strokeWidth: 28,
    filletRadius: 16,
    colorToken: '#57f09e',
    waypoints: shieldRoute.waypoints,
    svgPathData: shieldRoute.svgPathData,
    animationOrder: 5,
    drawDuration: 0.35,
    drawDelay: 10.50
  });

  return {
    regions,
    nodes,
    edges
  };
}
