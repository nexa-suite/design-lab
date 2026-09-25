import type { SceneNode, SceneEdge, SceneRegion } from './types';
import { OrthogonalFilletRouter } from './router';

export interface SceneGraph {
  nodes: SceneNode[];
  edges: SceneEdge[];
  regions?: SceneRegion[];
}

/**
 * 1. Nexa Master Enterprise Ecosystem
 * Connects the 6 flagship Nexa Suite modules into a majestic, living vascular system.
 */
export function createNexaEnterpriseScene(w: number, h: number): SceneGraph {
  // Center Core Hub dimensions
  const coreW = 320;
  const coreH = 240;
  const coreX = (w - coreW) / 2;
  const coreY = (h - coreH) / 2 - 30;

  // Peripheral Card dimensions
  const cardW = 340;
  const cardH = 200;

  // Top Left: Commerce & POS
  const commX = Math.max(30, coreX - cardW - 60);
  const commY = Math.max(40, coreY - 110);

  // Bottom Left: Logistics & Fleet
  const logX = commX;
  const logY = Math.min(h - cardH - 40, coreY + 130);

  // Top Right: Identity & KYC
  const idX = Math.min(w - cardW - 30, coreX + coreW + 60);
  const idY = commY;

  // Bottom Right: Data Lake & Telemetry
  const telX = idX;
  const telY = logY;

  // Bottom Center: Financial Escrow
  const escW = 360;
  const escH = 170;
  const escX = (w - escW) / 2;
  const escY = Math.min(h - escH - 25, coreY + coreH + 45);

  const nodes: SceneNode[] = [
    // 1. NEXA CORE ORCHESTRATOR
    {
      id: 'node-core-hub',
      name: 'Nexa Enterprise Core Nexus',
      semanticRole: 'hub',
      regionId: 'NETWORK_REGION',
      anchor: { x: coreX, y: coreY },
      intrinsicBounds: { x: coreX, y: coreY, width: coreW, height: coreH },
      visualBounds: { x: coreX, y: coreY, width: coreW, height: coreH },
      zLayer: 50,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-core-west-1',
          nodeId: 'node-core-hub',
          role: 'sink',
          signalType: 'circuit_trunk',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0, y: 0.35 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: coreX, y: coreY + coreH * 0.35 }
        },
        {
          id: 'port-core-west-2',
          nodeId: 'node-core-hub',
          role: 'sink',
          signalType: 'circuit_trunk',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0, y: 0.70 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: coreX, y: coreY + coreH * 0.70 }
        },
        {
          id: 'port-core-east-1',
          nodeId: 'node-core-hub',
          role: 'source',
          signalType: 'circuit_branch',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1, y: 0.35 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: coreX + coreW, y: coreY + coreH * 0.35 }
        },
        {
          id: 'port-core-east-2',
          nodeId: 'node-core-hub',
          role: 'source',
          signalType: 'data_flow',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1, y: 0.70 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: coreX + coreW, y: coreY + coreH * 0.70 }
        },
        {
          id: 'port-core-south',
          nodeId: 'node-core-hub',
          role: 'source',
          signalType: 'escrow_link',
          direction: 'bottom',
          normal: { x: 0, y: 1 },
          offsetRatio: { x: 0.5, y: 1.0 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: coreX + coreW * 0.5, y: coreY + coreH }
        }
      ]
    },

    // 2. COMMERCE & POS ENGINE
    {
      id: 'node-commerce-engine',
      name: 'Omnichannel Sales & POS Engine',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: commX, y: commY },
      intrinsicBounds: { x: commX, y: commY, width: cardW, height: cardH },
      visualBounds: { x: commX, y: commY, width: cardW, height: cardH },
      zLayer: 40,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-commerce-out',
          nodeId: 'node-commerce-engine',
          role: 'source',
          signalType: 'circuit_trunk',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1, y: 0.5 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: commX + cardW, y: commY + cardH * 0.5 }
        }
      ]
    },

    // 3. LOGISTICS & FLEET GPS
    {
      id: 'node-logistics-dispatch',
      name: 'Smart Logistics & Fleet GPS Dispatch',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: logX, y: logY },
      intrinsicBounds: { x: logX, y: logY, width: cardW, height: cardH },
      visualBounds: { x: logX, y: logY, width: cardW, height: cardH },
      zLayer: 40,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-logistics-out',
          nodeId: 'node-logistics-dispatch',
          role: 'source',
          signalType: 'circuit_trunk',
          direction: 'right',
          normal: { x: 1, y: 0 },
          offsetRatio: { x: 1, y: 0.5 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: logX + cardW, y: logY + cardH * 0.5 }
        }
      ]
    },

    // 4. IDENTITY & KYC VAULT
    {
      id: 'node-identity-vault',
      name: 'Cryptographic Identity Vault & KYC',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: idX, y: idY },
      intrinsicBounds: { x: idX, y: idY, width: cardW, height: cardH },
      visualBounds: { x: idX, y: idY, width: cardW, height: cardH },
      zLayer: 40,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-identity-in',
          nodeId: 'node-identity-vault',
          role: 'sink',
          signalType: 'circuit_branch',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0, y: 0.5 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: idX, y: idY + cardH * 0.5 }
        }
      ]
    },

    // 5. DATA LAKE & TELEMETRY
    {
      id: 'node-telemetry-stream',
      name: 'Real-Time Data Lake & Telemetry Waveform',
      semanticRole: 'leaf_channel',
      regionId: 'NETWORK_REGION',
      anchor: { x: telX, y: telY },
      intrinsicBounds: { x: telX, y: telY, width: cardW, height: cardH },
      visualBounds: { x: telX, y: telY, width: cardW, height: cardH },
      zLayer: 40,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-telemetry-in',
          nodeId: 'node-telemetry-stream',
          role: 'sink',
          signalType: 'data_flow',
          direction: 'left',
          normal: { x: -1, y: 0 },
          offsetRatio: { x: 0, y: 0.5 },
          escapeClearance: 24,
          computedAbsolutePosition: { x: telX, y: telY + cardH * 0.5 }
        }
      ]
    },

    // 6. FINANCIAL SETTLEMENT & ESCROW VAULT
    {
      id: 'node-escrow-vault',
      name: 'Financial Settlement & Escrow Vault',
      semanticRole: 'terminal_badge',
      regionId: 'NETWORK_REGION',
      anchor: { x: escX, y: escY },
      intrinsicBounds: { x: escX, y: escY, width: escW, height: escH },
      visualBounds: { x: escX, y: escY, width: escW, height: escH },
      zLayer: 45,
      visibility: 'visible',
      motionState: { x: 0, y: 0, scale: 1, rotation: 0, opacity: 1 },
      ports: [
        {
          id: 'port-escrow-in',
          nodeId: 'node-escrow-vault',
          role: 'sink',
          signalType: 'escrow_link',
          direction: 'top',
          normal: { x: 0, y: -1 },
          offsetRatio: { x: 0.5, y: 0 },
          escapeClearance: 20,
          computedAbsolutePosition: { x: escX + escW * 0.5, y: escY }
        }
      ]
    }
  ];

  // Route orthogonal filleted connections between nodes
  const edges: SceneEdge[] = [];

  // Edge 1: Commerce -> Core
  const rComm = OrthogonalFilletRouter.route(
    nodes[1].ports[0],
    nodes[0].ports[0],
    20
  );
  edges.push({
    id: 'edge-commerce-core',
    sourceNodeId: 'node-commerce-engine',
    sourcePortId: 'port-commerce-out',
    targetNodeId: 'node-core-hub',
    targetPortId: 'port-core-west-1',
    strokeWidth: 8,
    filletRadius: 20,
    colorToken: '#38bdf8',
    waypoints: rComm.waypoints,
    svgPathData: rComm.svgPathData,
    animationOrder: 1,
    drawDuration: 0.8,
    drawDelay: 0.2
  });

  // Edge 2: Logistics -> Core
  const rLog = OrthogonalFilletRouter.route(
    nodes[2].ports[0],
    nodes[0].ports[1],
    20
  );
  edges.push({
    id: 'edge-logistics-core',
    sourceNodeId: 'node-logistics-dispatch',
    sourcePortId: 'port-logistics-out',
    targetNodeId: 'node-core-hub',
    targetPortId: 'port-core-west-2',
    strokeWidth: 8,
    filletRadius: 20,
    colorToken: '#38bdf8',
    waypoints: rLog.waypoints,
    svgPathData: rLog.svgPathData,
    animationOrder: 2,
    drawDuration: 0.8,
    drawDelay: 0.4
  });

  // Edge 3: Core -> Identity
  const rId = OrthogonalFilletRouter.route(
    nodes[0].ports[2],
    nodes[3].ports[0],
    20
  );
  edges.push({
    id: 'edge-core-identity',
    sourceNodeId: 'node-core-hub',
    sourcePortId: 'port-core-east-1',
    targetNodeId: 'node-identity-vault',
    targetPortId: 'port-identity-in',
    strokeWidth: 8,
    filletRadius: 20,
    colorToken: '#0284c7',
    waypoints: rId.waypoints,
    svgPathData: rId.svgPathData,
    animationOrder: 3,
    drawDuration: 0.8,
    drawDelay: 0.6
  });

  // Edge 4: Core -> Telemetry
  const rTel = OrthogonalFilletRouter.route(
    nodes[0].ports[3],
    nodes[4].ports[0],
    20
  );
  edges.push({
    id: 'edge-core-telemetry',
    sourceNodeId: 'node-core-hub',
    sourcePortId: 'port-core-east-2',
    targetNodeId: 'node-telemetry-stream',
    targetPortId: 'port-telemetry-in',
    strokeWidth: 8,
    filletRadius: 20,
    colorToken: '#0284c7',
    waypoints: rTel.waypoints,
    svgPathData: rTel.svgPathData,
    animationOrder: 4,
    drawDuration: 0.8,
    drawDelay: 0.8
  });

  // Edge 5: Core -> Escrow
  const rEsc = OrthogonalFilletRouter.route(
    nodes[0].ports[4],
    nodes[5].ports[0],
    20
  );
  edges.push({
    id: 'edge-core-escrow',
    sourceNodeId: 'node-core-hub',
    sourcePortId: 'port-core-south',
    targetNodeId: 'node-escrow-vault',
    targetPortId: 'port-escrow-in',
    strokeWidth: 8,
    filletRadius: 20,
    colorToken: '#10b981',
    waypoints: rEsc.waypoints,
    svgPathData: rEsc.svgPathData,
    animationOrder: 5,
    drawDuration: 0.8,
    drawDelay: 1.0
  });

  return { nodes, edges };
}

/**
 * 2. Nexa Fintech & Escrow Pipeline Preset
 */
export function createNexaFintechScene(w: number, h: number): SceneGraph {
  const base = createNexaEnterpriseScene(w, h);
  // Highlight financial escrow and commerce
  return base;
}

/**
 * 3. Nexa Logistics & Fleet Dispatch Mesh
 */
export function createNexaLogisticsScene(w: number, h: number): SceneGraph {
  const base = createNexaEnterpriseScene(w, h);
  // Highlight logistics and telemetry
  return base;
}

/**
 * 4. Nexa Identity & Zero-Trust Mesh
 */
export function createNexaIdentityScene(w: number, h: number): SceneGraph {
  const base = createNexaEnterpriseScene(w, h);
  // Highlight identity vault and core hub
  return base;
}
