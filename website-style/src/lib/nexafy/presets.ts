/**
 * Nexafy Geometry Lab — Shared Parametric Presets
 * INTERNAL SANDBOX TOOL — NOT PRODUCTION PRODUCT
 * 
 * High-authority reconstruction presets matching observed Flecto 2022 stages.
 */

import type { NexafyShapeConfig } from './types';

export const NEXAFY_PRESETS: Record<string, NexafyShapeConfig> = {
  DORMANT: {
    id: 'DORMANT',
    name: 'Hero / Dormant Canvas',
    description: 'Initial dormant state with collapsed shoulders and subtle perimeter framing.',
    width: 1440,
    height: 820,
    baseRadius: 36,
    crown: {
      enabled: false,
      width: 0,
      height: 0,
      radius: 36,
      filletRadius: 36
    },
    shelf: {
      enabled: false,
      width: 0,
      height: 0,
      radius: 36,
      filletRadius: 36
    },
    colors: {
      background: '#004737',
      mintAccent: '#57f09e',
      surface: '#ffffff'
    }
  },

  CHANNELS: {
    id: 'CHANNELS',
    name: 'Hero Chapter 01 / Channels & Security',
    description: 'Canonical Bürocratik Awwwards SOTD sculpted frame with top canopy notch and bottom shelf.',
    width: 1440,
    height: 820,
    baseRadius: 36,
    crown: {
      enabled: true,
      x: 426,
      width: 568,
      height: 105,
      radius: 36,
      filletRadius: 36
    },
    shelf: {
      enabled: true,
      x: 150,
      width: 888,
      height: 85,
      radius: 36,
      filletRadius: 36
    },
    colors: {
      background: '#004737',
      mintAccent: '#57f09e',
      surface: '#ffffff'
    }
  },

  SAAS: {
    id: 'SAAS',
    name: 'Hero Chapter 02 / SaaS Platform Morph',
    description: 'Shared-stage morph state supporting the white enterprise software workbench and active channels.',
    width: 1440,
    height: 820,
    baseRadius: 32,
    crown: {
      enabled: true,
      x: 360,
      width: 720,
      height: 90,
      radius: 32,
      filletRadius: 32
    },
    shelf: {
      enabled: true,
      x: 240,
      width: 960,
      height: 60,
      radius: 28,
      filletRadius: 28
    },
    colors: {
      background: '#004737',
      mintAccent: '#57f09e',
      surface: '#ffffff'
    }
  },

  PAYMENT: {
    id: 'PAYMENT',
    name: 'Safe Renting / Payment Flow',
    description: 'Framing for iOS lockscreen, floating payment chips, and confetti celebration.',
    width: 1200,
    height: 720,
    baseRadius: 36,
    crown: {
      enabled: true,
      x: 300,
      width: 600,
      height: 80,
      radius: 32,
      filletRadius: 32
    },
    shelf: {
      enabled: false,
      width: 0,
      height: 0,
      radius: 36,
      filletRadius: 36
    },
    colors: {
      background: '#052018',
      mintAccent: '#57f09e',
      surface: '#ffffff'
    }
  },

  INSURANCE: {
    id: 'INSURANCE',
    name: 'Insurance / Safe Protection Stage',
    description: 'Asymmetric sculpted stage with elevated headline canopy and guarantee badge shelf.',
    width: 1200,
    height: 680,
    baseRadius: 36,
    crown: {
      enabled: true,
      x: 200,
      width: 800,
      height: 85,
      radius: 36,
      filletRadius: 36
    },
    shelf: {
      enabled: true,
      x: 350,
      width: 500,
      height: 70,
      radius: 32,
      filletRadius: 32
    },
    colors: {
      background: '#033a2e',
      mintAccent: '#57f09e',
      surface: '#ffffff'
    }
  },

  SUSTAINABILITY: {
    id: 'SUSTAINABILITY',
    name: 'Sustainability / Terraced Aerial Canvas',
    description: 'Sculpted dark-forest container overlaying drone aerial photography with metrics shelf.',
    width: 1440,
    height: 760,
    baseRadius: 36,
    crown: {
      enabled: false,
      width: 0,
      height: 0,
      radius: 36,
      filletRadius: 36
    },
    shelf: {
      enabled: true,
      x: 180,
      width: 720,
      height: 95,
      radius: 36,
      filletRadius: 36
    },
    colors: {
      background: '#004737',
      mintAccent: '#57f09e',
      surface: '#ffffff'
    }
  },

  ACCESS_CHANNELS: {
    id: 'ACCESS_CHANNELS',
    name: 'Access Channels / Market Bento Stage',
    description: 'Iconic warm beige (#FDFAE7) container housing the Flecto Market and online store distribution bento grid.',
    width: 1440,
    height: 980,
    baseRadius: 36,
    crown: {
      enabled: false,
      width: 0,
      height: 0,
      radius: 36,
      filletRadius: 36
    },
    shelf: {
      enabled: false,
      width: 0,
      height: 0,
      radius: 36,
      filletRadius: 36
    },
    colors: {
      background: '#FDFAE7',
      mintAccent: '#3dd598',
      surface: '#004737'
    }
  },

  FOOTER_BEIGE: {
    id: 'FOOTER_BEIGE',
    name: 'Global Footer / Sculpted Beige Silhouette',
    description: 'Bürocratik sculpted beige (#FDFAE7) container with asymmetrical top canopy shoulder and demo tab cutout.',
    width: 1440,
    height: 520,
    baseRadius: 36,
    crown: {
      enabled: true,
      x: 180,
      width: 920,
      height: 75,
      radius: 36,
      filletRadius: 36
    },
    shelf: {
      enabled: false,
      width: 0,
      height: 0,
      radius: 36,
      filletRadius: 36
    },
    colors: {
      background: '#FDFAE7',
      mintAccent: '#3dd598',
      surface: '#004737'
    }
  }
};

