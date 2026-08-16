export type ColdChain = 'Refrigerated' | 'Frozen' | 'Ambient';

export interface ReferenceProduct {
  readonly id: string;
  readonly name: string;
  readonly brand: string;
  readonly category: string;
  readonly presentation: string;
  readonly sku: string;
  readonly price: string;
  readonly availability: string;
  readonly coldChain: ColdChain;
  readonly image: string;
  readonly brandLogo?: string;
  readonly temperatureRange?: string;
  readonly coldType?: string;
  readonly availableUnits?: number;
  readonly stockStatus?: string;
}

export interface OrderRow {
  readonly id: string;
  readonly buyer: string;
  readonly created: string;
  readonly delivery: string;
  readonly status: string;
  readonly total: string;
}

export interface InventoryRow {
  readonly product: string;
  readonly sku: string;
  readonly lot: string;
  readonly expiry: string;
  readonly onHand: number;
  readonly reserved: number;
  readonly available: number;
  readonly attention: string;
}

export interface DispatchRow {
  readonly id: string;
  readonly order: string;
  readonly destination: string;
  readonly state: string;
  readonly departure: string;
  readonly pod: string;
  readonly exception: string;
}

/** Verified safe catalog seed values; workflow rows below are SYNTHETIC DEMO DATA. */
export const referenceProducts: readonly ReferenceProduct[] = [
  {
    id: 'PROD-0033',
    name: 'MANTEQUILLA CON SAL 20X10G',
    brand: 'Paysan Breton',
    category: 'Butter',
    presentation: '20X10G',
    sku: 'PROD-0033',
    price: 'S/ 14.00',
    availability: '87 UN avail.',
    coldChain: 'Refrigerated',
    image: '/catalog-items/paysan-breton-mantequilla-con-sal-20x10g.png',
    brandLogo: '/brand-logos/logo-paysan-breton.png',
    temperatureRange: '2°C - 6°C',
    coldType: 'Chilled',
    availableUnits: 87,
    stockStatus: 'Available',
  },
  {
    id: 'PROD-0034',
    name: 'MANTEQUILLA SIN SAL 20X10G',
    brand: 'Paysan Breton',
    category: 'Butter',
    presentation: '20X10G',
    sku: 'PROD-0034',
    price: 'S/ 14.00',
    availability: '58 UN avail.',
    coldChain: 'Refrigerated',
    image: '/catalog-items/paysan-breton-mantequilla-sin-sal-20x10g.png',
    brandLogo: '/brand-logos/logo-paysan-breton.png',
    temperatureRange: '2°C - 6°C',
    coldType: 'Chilled',
    availableUnits: 58,
    stockStatus: 'Available',
  },
  {
    id: 'PROD-0003',
    name: 'COPPA MOLDE 3KG',
    brand: 'Cavour',
    category: 'Charcuterie',
    presentation: 'MOLDE 3KG',
    sku: 'PROD-0003',
    price: 'S/ 390.00',
    availability: '58 UN avail.',
    coldChain: 'Refrigerated',
    image: '/catalog-items/cavour-coppa-molde-3kg.png',
    brandLogo: '/brand-logos/logo-cavour.png',
    temperatureRange: '0°C - 5°C',
    coldType: 'Chilled',
    availableUnits: 58,
    stockStatus: 'Available',
  },
  {
    id: 'CAT-0001',
    name: 'QUESO GRANA PADANO DOP 150G',
    brand: 'Agriform',
    category: 'Cheese',
    presentation: '150G',
    sku: 'QIAG-002-0',
    price: 'S/ 17.30',
    availability: '214 UN avail.',
    coldChain: 'Refrigerated',
    image: '/catalog-items/agriform-queso-grana-padano-dop-150g.png',
    brandLogo: '/brand-logos/logo-agriform.png',
    temperatureRange: '0°C - 5°C',
    coldType: 'Chilled',
    availableUnits: 214,
    stockStatus: 'Available',
  },
  {
    id: 'CAT-0002',
    name: 'QUESO PARMIGIANO REGGIANO DOP 150G',
    brand: 'Agriform',
    category: 'Cheese',
    presentation: '150G',
    sku: 'QIAG-003-0',
    price: 'S/ 20.50',
    availability: '137 UN avail.',
    coldChain: 'Refrigerated',
    image: '/catalog-items/agriform-queso-parmigiano-reggiano-dop-150g.png',
    brandLogo: '/brand-logos/logo-agriform.png',
    temperatureRange: '0°C - 5°C',
    coldType: 'Chilled',
    availableUnits: 137,
    stockStatus: 'Available',
  },
  {
    id: 'CAT-0004',
    name: 'MORTADELLA BOLOGNA IGP CON PISTACCHIO MOLDE 7.5KG',
    brand: 'Cavour',
    category: 'Charcuterie',
    presentation: 'MOLDE 7.5KG',
    sku: 'EICA-012-0',
    price: 'S/ 690.00',
    availability: '8 UN avail.',
    coldChain: 'Refrigerated',
    image: '/catalog-items/cavour-mortadella-bologna-igp-con-pistacchio-molde-7-5kg.png',
    brandLogo: '/brand-logos/logo-cavour.png',
    temperatureRange: '0°C - 5°C',
    coldType: 'Chilled',
    availableUnits: 8,
    stockStatus: 'Low stock',
  },
  {
    id: 'CAT-0013',
    name: 'QUESO DANISH BLUE 100G',
    brand: 'Green Island',
    category: 'Cheese',
    presentation: '100G',
    sku: 'GIBL-001-0',
    price: 'S/ 18.90',
    availability: '95 UN avail.',
    coldChain: 'Refrigerated',
    image: '/catalog-items/green-island-queso-danish-blue-100g.png',
    brandLogo: '/brand-logos/logo-green-island.png',
    temperatureRange: '0°C - 5°C',
    coldType: 'Chilled',
    availableUnits: 95,
    stockStatus: 'Available',
  },
  {
    id: 'CAT-0018',
    name: 'MANTEQUILLA CON SAL 20 X 10G',
    brand: 'Paysan Breton',
    category: 'Dairy',
    presentation: '20 X 10G',
    sku: 'PBMA-020-0',
    price: 'S/ 14.80',
    availability: '52 UN avail.',
    coldChain: 'Refrigerated',
    image: '/catalog-items/paysan-breton-mantequilla-con-sal-20x10g.png',
    brandLogo: '/brand-logos/logo-paysan-breton.png',
    temperatureRange: '2°C - 6°C',
    coldType: 'Chilled',
    availableUnits: 52,
    stockStatus: 'Available',
  },
  {
    id: 'CAT-0024',
    name: 'QUESO MANCHEGO DOP 12 MESES CORTE',
    brand: 'Sancho Panza',
    category: 'Cheese',
    presentation: 'CORTE',
    sku: 'SPMA-012-1',
    price: 'S/ 82.00',
    availability: '24 UN avail.',
    coldChain: 'Refrigerated',
    image: '/catalog-items/sancho-panza-queso-manchego-dop-12-meses-corte.png',
    brandLogo: '/brand-logos/logo-sancho-panza.png',
    temperatureRange: '0°C - 5°C',
    coldType: 'Chilled',
    availableUnits: 24,
    stockStatus: 'Available',
  },
];

export const syntheticOrders: readonly OrderRow[] = [
  {
    id: 'SO-2026-0418',
    buyer: 'Hotel Andino Food Service',
    created: '15 Aug 2026',
    delivery: '18 Aug · AM',
    status: 'Awaiting review',
    total: 'PEN 8,420.00',
  },
  {
    id: 'SO-2026-0417',
    buyer: 'Catering Miraflores Kitchen',
    created: '15 Aug 2026',
    delivery: '17 Aug · PM',
    status: 'In preparation',
    total: 'PEN 3,860.50',
  },
  {
    id: 'SO-2026-0416',
    buyer: 'Market Gourmet San Isidro',
    created: '14 Aug 2026',
    delivery: '16 Aug · AM',
    status: 'Ready for dispatch',
    total: 'PEN 12,140.00',
  },
  {
    id: 'SO-2026-0415',
    buyer: 'La Cava Fría Restaurant Group',
    created: '14 Aug 2026',
    delivery: '16 Aug · PM',
    status: 'Delivered',
    total: 'PEN 2,980.00',
  },
];

export const inventoryRows: readonly InventoryRow[] = [
  {
    product: 'QUESO MANCHEGO DOP 12 MESES CORTE',
    sku: 'SPMA-012-1',
    lot: 'LOT-26-0812-A',
    expiry: '22 Aug 2026',
    onHand: 48,
    reserved: 24,
    available: 24,
    attention: 'FEFO soon',
  },
  {
    product: 'MORTADELLA BOLOGNA IGP CON PISTACCHIO MOLDE 7.5KG',
    sku: 'EICA-012-0',
    lot: 'LOT-26-0809-C',
    expiry: '02 Sep 2026',
    onHand: 8,
    reserved: 4,
    available: 4,
    attention: 'Low stock',
  },
  {
    product: 'QUESO GRANA PADANO DOP 150G',
    sku: 'QIAG-002-0',
    lot: 'LOT-26-0814-B',
    expiry: '18 Nov 2026',
    onHand: 214,
    reserved: 62,
    available: 152,
    attention: 'Normal',
  },
];

export const dispatchRows: readonly DispatchRow[] = [
  {
    id: 'DSP-2026-021',
    order: 'SO-2026-0416',
    destination: 'Market Gourmet · San Isidro',
    state: 'Staged',
    departure: 'Today · 14:30',
    pod: 'Pending',
    exception: 'None',
  },
  {
    id: 'DSP-2026-020',
    order: 'SO-2026-0415',
    destination: 'La Cava Fría · Miraflores',
    state: 'Delivered',
    departure: '14 Aug · 16:00',
    pod: 'Received',
    exception: 'None',
  },
  {
    id: 'DSP-2026-019',
    order: 'SO-2026-0413',
    destination: 'Hotel Andino · Surco',
    state: 'Attention',
    departure: '14 Aug · 10:00',
    pod: 'Pending',
    exception: 'Delivery window changed',
  },
];
