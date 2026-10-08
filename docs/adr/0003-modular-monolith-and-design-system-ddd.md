# ADR 0003: Modular Monolith & Platform Bounded Contexts with Shared Kernel (Design System DDD)

## Status

Accepted for v1.5.0 release architecture convergence.

## Context

The Nexa Design System originated as an Angular-focused component library (`web-style`). As the ecosystem expanded to support multi-platform operational clients—including Android rugged handhelds, cross-platform B2B buyer apps, iOS reference implementations, and a marketing landing—the codebase required a unified, robust architectural structure.

We investigated whether **Domain-Driven Design (DDD)** or a **Modular Monolith** should govern this ecosystem.

### Architectural Investigation: DDD vs. Modular Monolith in Design Systems

1. **Transactional Enterprise DDD vs. Design System Realities:**
   - Classical enterprise DDD focuses on transactional business domains (Orders, Invoices, Ledgers) using Aggregates, Repositories, Entities, and Domain Events.
   - Forcing transactional DDD into a Design System creates artificial ceremony (e.g. attempting to model a Button or Color as an Aggregate Root).
   - However, **Strategic DDD (Eric Evans)** provides the exact principles required for multi-platform design systems:
     - **Ubiquitous Language:** The W3C Design Tokens Community Group (DTCG) specification establishes a single vocabulary shared identically across all engineering teams (`--nexa-color-brand-primary`, 8px spatial grid, 48/56dp hit targets, 3 elevation levels).
     - **Shared Kernel:** A single, strictly upstream source of truth containing design tokens and brand assets that all platform consumers depend on without circularity.
     - **Bounded Contexts:** Each target platform (Web DOM, Android M3, Flutter Widget Tree, iOS SwiftUI, Editorial Astro) represents a distinct bounded context with its own compilation constraints, memory lifecycles, and interaction paradigms.

2. **Modular Monolith as the Delivery Vehicle:**
   - Rather than fragmenting into multiple uncoordinated repositories (Polyrepo) where design tokens inevitably drift out of sync, a **Modular Monolith** maintains all platform bounded contexts within a single monorepo.
   - Atomic versioning guarantees that all platforms build against the exact same token definitions and visual rules at release time (e.g., v1.5.0).
   - Independent Docker containerization provides isolated runtimes for each platform without cross-contamination.

## Decision

We adopt a **Modular Monolith with Platform Bounded Contexts and a Shared Token Kernel**, organized into 4 distinct top-level platform contexts plus the shared kernel:

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

### Mobile Tri-Stack Separation

Within `mobile-style`, code and specifications are strictly decoupled into three dedicated native stacks:
1. **Kotlin / Jetpack Compose (`compose/`):**
   - Targets Zebra TC58 and industrial rugged handhelds.
   - Enforces 56dp oversized touch targets for sub-zero glove operation.
   - Integrates with `:core:designsystem` and hardware barcode scanners (SE4720).
2. **Flutter / Dart (`flutter/`):**
   - Targets the B2B Wholesale Buyer Mobile App (*Restaurantes del Mar*).
   - Maps tokens via `NexaThemeExtension` extending Flutter's `ThemeData`.
   - Enforces 48dp touch targets and WCAG 2.2 AAA high-contrast modes.
3. **SwiftUI (`swiftui/`):**
   - Provides the canonical reference contract for Apple iOS platforms.
   - Conforms to Apple Human Interface Guidelines (HIG), Dynamic Type, VoiceOver, and squircle continuous corners.

## Architectural Invariants (Enforced Rules)

1. **Shared Kernel Unidirectional Flow:**
   `shared/` is strictly upstream. It never imports from any platform folder. Platform folders import from `shared/`, never from each other.
2. **Platform Context Isolation:**
   `web-style` cannot import from `mobile-style` or `website-style`. Each platform has its own `package.json`, isolated build pipeline, and dedicated Docker container.
3. **Zero Asset Duplication:**
   Brand geometry (SVG logos, glyphs) and color tokens reside in the Shared Kernel and the agnostic Hub. No platform creates duplicate, ad-hoc palette definitions.
4. **Visual Design Preservation:**
   Architectural refactoring strictly preserves all accepted UI components, layout geometry, typography scales, and colorimetry.

## Consequences

- **Developer Velocity:** Teams working on Flutter, Jetpack Compose, Angular, or Astro work in dedicated directories without merge conflicts.
- **Zero Token Drift:** When token values are updated in `shared/tokens/`, all platforms update deterministically upon next build.
- **Release Integrity:** Releases (e.g., v1.5.0) are atomic across all 4 containers and verifiable via automated gates (`validate:tokens`, `validate:architecture`, `astro check`).
