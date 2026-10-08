# Nexa Design Lab Architecture

## 1. System Overview: Modular Monolith & Design System DDD

Nexa Design Lab is structured as a **Modular Monolith** driven by **Strategic Domain-Driven Design (Strategic DDD)** principles. 

While classical transactional DDD (entities, repositories, aggregates) does not apply to stateless UI components, Strategic DDD establishes:
- **Ubiquitous Language:** Standardized across all platforms via the W3C Design Tokens Community Group (DTCG) specification.
- **Shared Kernel (`shared/`):** Upstream single source of truth containing design tokens, JSON schemas, and shared brand assets.
- **Platform Bounded Contexts:** Four decoupled runtimes each honoring platform-native paradigms, memory models, and compilation toolchains.

*(See [ADR 0003](file:///Users/diegosandoval284/Developer/nexa-suite/design-lab/docs/adr/0003-modular-monolith-and-design-system-ddd.md) for detailed architecture decisions).*

```text
nexa-design-lab/
├── shared/                         # Upstream Shared Kernel (Tokens W3C DTCG + Assets)
│   ├── tokens/design-tokens.json   # Single Source of Truth
│   └── schemas/                    # Token validation schemas
├── gateway/                        # Bounded Context: Central Hub (Port 18090)
│   ├── index.html                  # Framework-agnostic Switchboard, Surfaces Workbench,
│   └── nginx.conf                  # Typography Caliper & Contrast Lab
├── web-style/                      # Bounded Context: Web Suite (Port 14200)
│   ├── src/app/                    # Angular 19+ Standalone documentation & lab
│   └── projects/nexa-ui/           # Reusable Angular Component Library
├── mobile-style/                   # Bounded Context: Mobile Multi-Runtime (Port 14201)
│   ├── src/components/compose/     # 1. Kotlin / Jetpack Compose M3 (:core:designsystem)
│   ├── src/components/flutter/     # 2. Flutter / Dart 3.5 (ThemeData + NexaThemeExtension)
│   ├── src/components/swiftui/     # 3. SwiftUI / iOS HIG Reference Contract
│   └── src/components/simulator/   # Interactive multi-device simulator & offline lab
├── website-style/                  # Bounded Context: Marketing Website (Port 14321)
│   ├── src/pages/                  # Astro 5 + GSAP Living Geometry
│   └── src/components/             # High-performance editorial components
└── docker-compose.yml              # Local orchestration across all 4 bounded contexts
```

---

## 2. Bounded Context Specifications

### A. Central Hub (`gateway/` · Port 18090)
- **Role:** Framework-agnostic governance portal and orchestrator.
- **Core Modules:**
  - **Switchboard:** Universal routing gateway connecting Web, Mobile, and Website.
  - **Surfaces Workbench:** Multi-layer elevation and surface tester with CSS grid control.
  - **Typography Caliper:** Interactive type specimen tester (font family, weight, line-height, live padding).
  - **Contrast Verification Lab:** WCAG 2.2 AA / AAA contrast validation matrix.
  - **Brand Geometry:** Vector-accurate SVG brand identity specifications.

### B. Web Context (`web-style/` · Port 14200)
- **Role:** Enterprise web applications and reusable component library.
- **Stack:** Angular 19+ (Standalone components, Signals, Typed forms), SCSS.
- **Structure:**
  - `projects/nexa-ui/`: Production-ready, tree-shakable component package (`@nexa/ui`).
  - `src/app/shell/`: Shell navigation and layout.
  - `src/app/documentation/`: Foundations, components, patterns, and accessibility evidence.
  - `src/app/lab/`: Evaluation modes, state sequences, and contrast benchmarks.

### C. Mobile Context (`mobile-style/` · Port 14201)
- **Role:** Multi-runtime mobile laboratory with dedicated native stacks.
- **Stack:** Astro 5.x container hosting three native sub-systems:
  1. **Kotlin / Jetpack Compose (`compose/`):**
     - Target: Zebra TC58 & rugged logistics handhelds.
     - Contracts: `:core:designsystem`, 56dp oversized touch targets for glove use, high-contrast M3 themes, Room offline database.
  2. **Flutter / Dart (`flutter/`):**
     - Target: Nexa Buyer Mobile App (*Restaurantes del Mar*).
     - Contracts: Dart 3.5, `ThemeData` augmented with `NexaThemeExtension`, 48dp touch targets, reactive B2B wholesale catalog.
  3. **SwiftUI (`swiftui/`):**
     - Target: iOS native reference contract.
     - Contracts: Apple HIG compliance, Swift 6, `NexaButtonStyle`, squircle continuous corners, Dynamic Type, and VoiceOver.

### D. Website Context (`website-style/` · Port 14321)
- **Role:** Public marketing and brand showcase.
- **Stack:** Astro 5.x + GSAP 3.12.
- **Contracts:** Living Geometry animation engine, zero-JS baseline rendering, responsive typography rhythm.

---

## 3. Dependency & Ownership Laws

1. **Unidirectional Flow:**
   `shared/` is strictly upstream. It never imports from any platform folder. Platform folders import from `shared/`, never from each other.
2. **Context Isolation:**
   `web-style` cannot import from `mobile-style` or `website-style`. Each platform has its own `package.json`, isolated build pipeline, and dedicated Docker container.
3. **Design System vs. Lab Boundary:**
   `projects/nexa-ui` exposes only reusable candidates through an explicit `public-api.ts`. Documentation, simulators, and evidence-only code remain Lab-owned and are never bundled into the distributable library.
4. **Token Authority:**
   Primitive -> Semantic -> Component token hierarchy is strictly preserved in `shared/tokens/design-tokens.json`. Generated runtime styles (`_tokens-*.scss`) must never be edited manually.

---

## 4. Verification Boundary

The repository enforces deterministic automated quality gates:
- `validate:tokens`: Verifies 0 duplicate declarations, 0 unresolved references, and 0 cyclical dependencies.
- `validate:architecture`: Enforces package boundaries, geometry constraints, and forbidden CSS.
- `validate:colors`: Validates WCAG color resolution through documented tokens.
- `validate:icons`: Audits approved PrimeIcons and bans unapproved glyphs.
- `validate:public-api`: Guarantees zero internal leakage from `@nexa/ui`.
- `build:mobile`: Executes `astro check` and static bundling across all 45 mobile components with 0 errors and 0 warnings.
