import type { DocumentationPageContent } from '../models/documentation-page';

export const START_HERE_CONTENT: readonly DocumentationPageContent[] = [
  {
    id: 'overview', label: 'Overview', icon: 'pi-th-large', group: 'START HERE', kind: 'overview',
            eyebrow: '00 / START HERE', title: 'A visual Nexa design system laboratory',
            intro: 'Live specimens, state transitions and quality evidence make each design decision inspectable.',
            summary: 'Navigate from frozen foundations to candidate components, patterns and quality gates.',
            keywords: ['design system', 'documentation', 'visual evidence', 'v0.10'],
            decision: 'v0.10 converges the evidence-first lab with a consumable library boundary, truthful state semantics and release gates.',
            foundation: 'Cool light canvas, white structural surfaces, controlled Nexa blue and slate hierarchy.',
            angularContract: 'Standalone lazy routes, strict templates and signal-first specimens.',
            adoptionMapping: 'Page anatomy maps to Overview, Anatomy, Variants, States and Quality sections.',
  },
  {
    id: 'principles', label: 'Principles', icon: 'pi-compass', group: 'START HERE', kind: 'principles',
            eyebrow: '01 / PRINCIPLES', title: 'Operational clarity with a human visual voice',
            intro: 'Nexa visual decisions protect domain meaning, hierarchy and trust before styling begins.',
            summary: 'Use the smallest language that helps people make the next correct cold-chain decision.',
            keywords: ['principles', 'clarity', 'hierarchy', 'trust'],
            decision: 'Context, action, status and recovery remain visible together.',
            foundation: 'Quiet borders, deliberate padding, restrained elevation and readable state cues.',
            angularContract: 'Encode principles as semantic tokens, native semantics and interaction tests.',
            adoptionMapping: 'Principle cards become reusable review criteria, not production components.',
  },
  {
    id: 'maturity', label: 'Maturity / Freeze', icon: 'pi-bookmark', group: 'START HERE', kind: 'overview',
            eyebrow: '02 / MATURITY', title: 'A visible boundary between frozen direction and exploration',
            intro: 'Maturity tells reviewers what should stay stable, what can evolve and what is intentionally deferred.',
            summary: 'Frozen is human direction, not production certification.',
            keywords: ['maturity', 'freeze', 'candidate', 'experimental', 'deferred'],
            decision: 'Sidebar, text field language, typography families, blue identity, light appearance and canonical logo usage are frozen.',
            foundation: 'Component candidates prove behavior before any production package is approved.',
            angularContract: 'Each candidate owns a focused API, tests user behavior and stays independently reusable.',
            adoptionMapping: 'Maturity maps to library status and open review questions; no library is published here.',
            status: 'FROZEN',
  },
];
