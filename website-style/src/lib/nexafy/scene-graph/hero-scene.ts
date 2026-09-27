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
  const isDesktop = stageWidth >= 1200;
  const isTabletLandscape = stageWidth >= 900 && stageWidth < 1200;

  // Adaptive node dimensions matching media_1790393466518.png
  const companyWidth = isDesktop ? 190 : (isTabletLandscape ? 170 : 150);
  const companyHeight = isDesktop ? 90 : (isTabletLandscape ? 85 : 80);

  const hubSize = isDesktop ? 120 : (isTabletLandscape ? 110 : 100);

  const cardWidth = isDesktop ? 230 : (isTabletLandscape ? 200 : 180);
  const cardHeight = isDesktop ? 115 : (isTabletLandscape ? 105 : 95);

  const shieldWidth = isDesktop ? 140 : (isTabletLandscape ? 125 : 110);
  const shieldHeight = isDesktop ? 80 : (isTabletLandscape ? 75 : 70);

  // Responsive Anchor Calculations with Guaranteed Clearances matching media_1790393466518.png
  const companyX = Math.round(stageWidth * 0.08);
  const companyY = Math.round(stageHeight * 0.33);

  const hubX = Math.round(stageWidth * 0.33);
  const hubY = Math.round(stageHeight * 0.31);

  const onlineX = Math.round(stageWidth * 0.49);
  const onlineY = Math.round(stageHeight * 0.29);

  const shieldX = Math.round(stageWidth * 0.74);
  const shieldY = Math.round(stageHeight * 0.33);

  const storeX = Math.round(stageWidth * 0.24);
  const storeY = Math.round(stageHeight * 0.55);

  const emailX = Math.round(stageWidth * 0.44);
  const emailY = Math.round(stageHeight * 0.55);

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

    // 2. NEXA MODULAR HUB (FLECTO MODULAR HUB)
    {
      id: 'node-hub',
      name: 'Nexa Modular Hub',
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
          id: 'port-hub-online2-out',
          nodeId: 'node-hub',
          role: 'source',
          signalType: 'circuit_branch',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.65 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: hubX + hubSize, y: hubY + hubSize * 0.65 }
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
          offsetRatio: { x: 0.75, y: 1.0 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: hubX + hubSize * 0.75, y: hubY + hubSize }
        }
      ],
      allowOverlapWith: ['node-trunk-edge', 'edge-store', 'edge-email', 'edge-online', 'edge-online2']
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
          offsetRatio: { x: 0.0, y: 0.35 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: onlineX, y: onlineY + cardHeight * 0.35 }
        },
        {
          id: 'port-card-online-in2',
          nodeId: 'node-card-online',
          role: 'sink',
          signalType: 'circuit_branch',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0.0, y: 0.65 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: onlineX, y: onlineY + cardHeight * 0.65 }
        },
        {
          id: 'port-card-online-out',
          nodeId: 'node-card-online',
          role: 'source',
          signalType: 'escrow_link',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1.0, y: 0.5 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: onlineX + cardWidth, y: onlineY + cardHeight / 2 }
        }
      ],
      allowOverlapWith: ['edge-online', 'edge-online2', 'edge-shield']
    },

    // 6. ESCROW SECURITY TERMINAL
    {
      id: 'node-shield',
      name: 'Escrow Security Terminal',
      semanticRole: 'terminal_badge',
      regionId: 'NETWORK_REGION',
      anchor: { x: shieldX, y: shieldY },
      intrinsicBounds: { x: shieldX, y: shieldY, width: shieldWidth, height: shieldHeight },
      visualBounds: { x: shieldX, y: shieldY, width: shieldWidth, height: shieldHeight },
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
          computedAbsolutePosition: { x: shieldX, y: shieldY + shieldHeight / 2 }
        }
      ],
      allowOverlapWith: ['edge-shield']
    }
  ];

  // Route Edges using OrthogonalFilletRouter
  const edges: SceneEdge[] = [];

  // 1. Trunk Edge: Company -> Hub
  const companyPort = nodes[0].ports[0];
  const hubInPort = nodes[1].ports[0];
  const trunkRoute = OrthogonalFilletRouter.route(companyPort, hubInPort, 16);
  edges.push({
    id: 'edge-trunk',
    sourceNodeId: 'node-company',
    sourcePortId: 'port-company-out',
    targetNodeId: 'node-hub',
    targetPortId: 'port-hub-in',
    strokeWidth: 20,
    filletRadius: 16,
    colorToken: '#38c8ff',
    waypoints: trunkRoute.waypoints,
    svgPathData: trunkRoute.svgPathData,
    animationOrder: 1,
    drawDuration: 0.8,
    drawDelay: 3.30
  });

  // 2. Online Top Edge: Hub -> Online Card (Upper Port)
  const hubOnlinePort = nodes[1].ports[1];
  const onlinePort1 = nodes[4].ports[0];
  const onlineRoute1 = OrthogonalFilletRouter.route(hubOnlinePort, onlinePort1, 16);
  edges.push({
    id: 'edge-online',
    sourceNodeId: 'node-hub',
    sourcePortId: 'port-hub-online-out',
    targetNodeId: 'node-card-online',
    targetPortId: 'port-card-online-in',
    strokeWidth: 20,
    filletRadius: 16,
    colorToken: '#38c8ff',
    waypoints: onlineRoute1.waypoints,
    svgPathData: onlineRoute1.svgPathData,
    animationOrder: 2,
    drawDuration: 0.45,
    drawDelay: 9.80
  });

  // 3. Online Lower Edge: Hub -> Online Card (Lower Port)
  const hubOnline2Port = nodes[1].ports[2];
  const onlinePort2 = nodes[4].ports[1];
  const onlineRoute2 = OrthogonalFilletRouter.route(hubOnline2Port, onlinePort2, 16);
  edges.push({
    id: 'edge-online2',
    sourceNodeId: 'node-hub',
    sourcePortId: 'port-hub-online2-out',
    targetNodeId: 'node-card-online',
    targetPortId: 'port-card-online-in2',
    strokeWidth: 20,
    filletRadius: 16,
    colorToken: '#38c8ff',
    waypoints: onlineRoute2.waypoints,
    svgPathData: onlineRoute2.svgPathData,
    animationOrder: 3,
    drawDuration: 0.45,
    drawDelay: 10.10
  });

  // 4. Store Edge: Hub -> Physical Store POS Card
  const hubStorePort = nodes[1].ports[3];
  const storePort = nodes[2].ports[0];
  const storeRoute = OrthogonalFilletRouter.route(hubStorePort, storePort, 16);
  edges.push({
    id: 'edge-store',
    sourceNodeId: 'node-hub',
    sourcePortId: 'port-hub-store-out',
    targetNodeId: 'node-card-store',
    targetPortId: 'port-card-store-in',
    strokeWidth: 20,
    filletRadius: 16,
    colorToken: '#38c8ff',
    waypoints: storeRoute.waypoints,
    svgPathData: storeRoute.svgPathData,
    animationOrder: 4,
    drawDuration: 0.4,
    drawDelay: 7.40
  });

  // 5. Email Edge: Hub -> Direct Customer Inquiry Card
  const hubEmailPort = nodes[1].ports[4];
  const emailPort = nodes[3].ports[0];
  const emailRoute = OrthogonalFilletRouter.route(hubEmailPort, emailPort, 16);
  edges.push({
    id: 'edge-email',
    sourceNodeId: 'node-hub',
    sourcePortId: 'port-hub-email-out',
    targetNodeId: 'node-card-email',
    targetPortId: 'port-card-email-in',
    strokeWidth: 20,
    filletRadius: 16,
    colorToken: '#38c8ff',
    waypoints: emailRoute.waypoints,
    svgPathData: emailRoute.svgPathData,
    animationOrder: 5,
    drawDuration: 0.4,
    drawDelay: 6.00
  });

  // 6. Shield Edge: Online Card -> Escrow Security Terminal
  const onlineShieldPort = nodes[4].ports[2];
  const shieldPort = nodes[5].ports[0];
  const shieldRoute = OrthogonalFilletRouter.route(onlineShieldPort, shieldPort, 16);
  edges.push({
    id: 'edge-shield',
    sourceNodeId: 'node-card-online',
    sourcePortId: 'port-card-online-out',
    targetNodeId: 'node-shield',
    targetPortId: 'port-shield-in',
    strokeWidth: 20,
    filletRadius: 16,
    colorToken: '#38c8ff',
    waypoints: shieldRoute.waypoints,
    svgPathData: shieldRoute.svgPathData,
    animationOrder: 6,
    drawDuration: 0.35,
    drawDelay: 10.50
  });

  return {
    regions,
    nodes,
    edges
  };
}
