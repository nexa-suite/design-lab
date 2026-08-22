import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NexaButton, NexaStatusChip, type NexaStatusTone } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { NexaDocumentationSection } from '../../layout/documentation-section';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type MapMode = 'ready' | 'no-geolocation' | 'provider-unavailable' | 'address-fallback';
type LocationStop = 'origin' | 'destination';

interface LocationEvidence {
  readonly label: string;
  readonly detail: string;
  readonly purpose: string;
  readonly address: string;
  readonly next: string;
}

interface MapModeDefinition {
  readonly label: string;
  readonly title: string;
  readonly explanation: string;
  readonly tone: NexaStatusTone;
}

const LOCATION_EVIDENCE: Readonly<Record<LocationStop, LocationEvidence>> = {
  origin: {
    label: 'Cold-chain warehouse',
    detail: 'Cold-chain warehouse · Lima',
    purpose: 'Dispatch origin',
    address: 'Av. Argentina 1020 · Lima',
    next: 'Review departure context',
  },
  destination: {
    label: 'ICISA Distribuciones',
    detail: 'ICISA Distribuciones · Av. Argentina 1240',
    purpose: 'Delivery destination',
    address: 'Av. Argentina 1240 · Lima',
    next: 'Review POD',
  },
};

const MAP_MODE_DEFINITIONS: Readonly<Record<MapMode, MapModeDefinition>> = {
  ready: {
    label: 'Location ready',
    title: 'Location context is available',
    explanation: 'Origin and destination remain visible with a text equivalent below.',
    tone: 'info',
  },
  'no-geolocation': {
    label: 'No geolocation',
    title: 'Device location is unavailable',
    explanation: 'The specimen does not request permission. Address evidence remains usable.',
    tone: 'warning',
  },
  'provider-unavailable': {
    label: 'Provider unavailable',
    title: 'Map provider is unavailable',
    explanation: 'The visual surface is unavailable; the location list remains the source of truth.',
    tone: 'warning',
  },
  'address-fallback': {
    label: 'Address fallback',
    title: 'Use the written address',
    explanation: 'The address and purpose carry the location meaning without map rendering.',
    tone: 'info',
  },
};

@Component({
  selector: 'nexa-map-location-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaDocumentationSection, NexaStatusChip],
  templateUrl: './map-location-page.html',
  styleUrls: ['../pattern-foundation.scss', './map-location-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaMapLocationPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly selectedStop = signal<LocationStop>('destination');
  protected readonly mapMode = signal<MapMode>('ready');
  protected readonly directionNotice = signal('No directions action selected.');
  protected readonly mapModes: readonly MapMode[] = Object.keys(MAP_MODE_DEFINITIONS) as MapMode[];
  protected readonly stops: readonly LocationStop[] = ['origin', 'destination'];
  protected readonly location = computed(() => LOCATION_EVIDENCE[this.selectedStop()]);
  protected readonly mapModeDefinition = computed(() => MAP_MODE_DEFINITIONS[this.mapMode()]);

  protected locationFor(stop: LocationStop): LocationEvidence {
    return LOCATION_EVIDENCE[stop];
  }

  protected mapModeLabel(mode: MapMode): string {
    return MAP_MODE_DEFINITIONS[mode].label;
  }

  protected selectStop(stop: LocationStop): void {
    this.selectedStop.set(stop);
    this.directionNotice.set(`${LOCATION_EVIDENCE[stop].label} selected.`);
  }

  protected setMapMode(mode: MapMode): void {
    this.mapMode.set(mode);
    this.directionNotice.set(`${MAP_MODE_DEFINITIONS[mode].label} selected.`);
  }

  protected openDirections(): void {
    this.directionNotice.set(`Directions kept local for this specimen: ${this.location().address}.`);
  }
}
