export type DocumentationKind =
  | 'overview'
  | 'principles'
  | 'foundation'
  | 'component'
  | 'pattern'
  | 'quality'
  | 'engineering';

export type DocumentationStatus = 'FROZEN' | 'CANDIDATE' | 'EXPERIMENTAL' | 'DEPRECATED';
export type DocumentationAdoption = 'PUBLIC COMPONENT' | 'DOCUMENTED NATIVE PATTERN' | 'COMPOSITION PATTERN' | 'LAB EVIDENCE ONLY' | 'DEFERRED / NOT PRODUCT READY';

export interface DocumentationPageMetadata {
  readonly id: string;
  readonly path: string;
  readonly label: string;
  readonly icon: string;
  readonly group: string;
  readonly kind: DocumentationKind;
  readonly status: DocumentationStatus;
  readonly searchText: string;
  readonly relatedPageIds?: readonly string[];
}

export interface DocumentationPageContent {
  readonly id: string;
  readonly label: string;
  readonly icon: string;
  readonly group: string;
  readonly kind: DocumentationKind;
  readonly eyebrow: string;
  readonly title: string;
  readonly intro: string;
  readonly summary: string;
  readonly keywords: readonly string[];
  readonly decision: string;
  readonly foundation: string;
  readonly angularContract: string;
  readonly adoptionMapping: string;
  readonly status?: DocumentationStatus;
}

export interface DocumentationPage extends DocumentationPageContent {
  readonly path: string;
  readonly status: DocumentationStatus;
  readonly adoption: DocumentationAdoption;
  readonly searchText: string;
  readonly relatedPageIds?: readonly string[];
}

export interface DocumentationGroup {
  readonly label: string;
  readonly items: readonly DocumentationPageMetadata[];
}
