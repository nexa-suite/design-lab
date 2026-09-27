<div align="center">

# Nexa Design Lab Monorepo

**Universal Design Authority for the Nexa Suite: Web, Mobile, and Website (Nexafy).**

![Architecture](https://img.shields.io/badge/Architecture-Monorepo%20Triad-2563EB?style=flat-square)
![Web](https://img.shields.io/badge/web--style-Angular%2022-DD0031?style=flat-square)
![Mobile](https://img.shields.io/badge/mobile--style-Android%20%2F%20Flutter-10B981?style=flat-square)
![Website](https://img.shields.io/badge/website--style-Nexafy%20Living%20Geometry-082846?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)

</div>

---

## 1. Monorepo Architecture Overview

Nexa Design Lab is the centralized source of truth for design guidelines, design tokens, component specifications, and living interactive systems across the three pillars of the Nexa Suite:

```
design-lab/
├── web-style/                 # 🌐 Port 4200: Web Applications Design System
│   ├── projects/nexa-ui/      # Reusable Angular UI component library
│   ├── src/                   # Angular 22 documentation lab & component explorer
│   ├── tokens/                # DTCG design tokens (primitives, semantics, components)
│   └── Dockerfile             # Standalone production container (port 4200)
│
├── mobile-style/              # 📱 Port 4201: Native Mobile Guidelines & Simulator
│   ├── src/components/        # Hardware phone simulator (Android Pixel 8 / iPhone 15)
│   │   ├── simulator/         # Operations (Android Compose) & Buyer (Flutter) specs
│   │   └── spec/              # 48dp touch targets, 8dp grid, M3 surface elevations
│   └── Dockerfile             # Standalone production container (port 4201)
│
├── website-style/             # 🚀 Port 4321: Marketing & Landing Living Geometry (Nexafy)
│   ├── src/components/        # Nexafy Living Geometry Engine & 28px vascular conduits
│   │   ├── engine/            # Interactive drag-and-drop workbench & collision avoidance
│   │   ├── nexafy/            # Modular living artifacts (Hub, Cards, Ledgers, Shields)
│   │   └── guidelines/        # Pure solid colorimetry (#082846 & #38c8ff), 0 gradients
│   ├── src/pages/             # Workbench (/), Artifacts (/artifacts), Landing Specs (/landing-spec)
│   └── Dockerfile             # Standalone production container (port 4321)
│
├── gateway/                   # 🧭 Port 8090: Style Monorepo Hub & Gateway
│   ├── index.html             # Unified landing portal to access all three environments
│   └── nginx.conf             # Unified reverse proxy routes (/web/, /mobile/, /website/)
│
├── shared/                    # 💎 Shared Monorepo Resources & Design Tokens
│   ├── tokens/                # Canonical DTCG design tokens (JSON source of truth)
│   ├── brand/                 # Canonical vector SVG logos and wordmarks
│   └── README.md              # Shared asset synchronization guide
│
└── docker-compose.yml         # Multi-service container orchestration
```

---

## 2. Independent Execution (Local Development)

Each package can be developed and run independently with dedicated ports:

### Web Style Guidelines (`web-style`)
```bash
# Start Web Style Guidelines & nexa-ui library
npm run dev:web
# -> Open http://localhost:4200
```

### Mobile Style Guidelines (`mobile-style`)
```bash
# Start Mobile Guidelines & Hardware Device Simulator
npm run dev:mobile
# -> Open http://localhost:4201
```

### Website Style Guidelines & Nexafy (`website-style`)
```bash
# Start Nexafy Living Geometry Engine Workbench & Landing Specs
npm run dev:website
# -> Open http://localhost:4321
```

---

## 3. Docker Containerization

Run all three environments together or spin up any service individually:

### Run Everything (All 3 Styles + Central Hub):
```bash
# Build and run containers in background
docker compose up -d --build

# Open the Central Hub Portal
# -> http://localhost:8080

# Or access each service directly on its dedicated port:
# -> Web Style:     http://localhost:4200
# -> Mobile Style:  http://localhost:4201
# -> Website Style: http://localhost:4321
```

### Run a Single Container Separately:
```bash
# Only run Web Style
docker compose up -d web-style

# Only run Mobile Style
docker compose up -d mobile-style

# Only run Website Style (Nexafy)
docker compose up -d website-style
```

### Stop Containers:
```bash
docker compose down
```

---

## 4. Pillar Specifications

### 🌐 `web-style`
* **Technology**: Angular v22, TypeScript, SCSS, PrimeIcons.
* **Component Library**: `projects/nexa-ui` public exports.
* **Coverage**: Complete component catalog, form patterns, dense data tables, responsive layouts, and contrast gates.

### 📱 `mobile-style`
* **Technology**: Astro v5, TypeScript, Material 3 tokens.
* **Simulator**: Interactive Pixel 8 frame with dynamic status bar, gesture bar, and theme switcher.
* **Specs**:
  * **48dp Ergonomics**: Minimum touch bounding box for buttons, app bars, and filter chips.
  * **8dp Spatial Grid**: Margin, gutters, and radii specifications.
  * **Dual Code Generator**: Production-ready code snippets in both **Android Jetpack Compose** (Kotlin) and **Flutter** (Dart).

### 🚀 `website-style` (Nexafy)
* **Technology**: Astro v5, GSAP 3, TypeScript.
* **Rules**: Solid Nexa Dark Blue (`#082846`), Celeste (`#38c8ff`), **0 degradados**, conductos vasculares gruesos de 28px con uniones tipo fillet.
* **Living Engine**: Interactive workbench with node dragging, continuous collision avoidance, OKLCH vision bar palette shifts, and decomposed modular cards.
* **Pages**:
  * `/`: Master Living Engine Workbench & Style Guidelines.
  * `/artifacts`: Modular Living Artifacts Catalog (Hub, Store cards, Inquiries, SaaS Ledgers, Escrow Shields).
  * `/landing-spec`: Technical specifications for Hero architecture, Bento 4-column distribution, and sculpted footers.

---

## 5. Global Validation & Quality Gates

Run all checks across the monorepo:

```bash
# Build all packages
npm run build:all

# Validate tokens
npm run validate:tokens
```

---

*Owner: Diego Y. Sandoval · Nexa Suite Design Authority*
