import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { NexaActionMenu, type NexaActionMenuItem } from '../../../design-system/action-menu/nexa-action-menu';
import { NexaButton } from '../../../design-system/button/nexa-button';
import { NexaStatusChip, type NexaStatusEmphasis, type NexaStatusTone } from '../../../design-system/status/nexa-status-chip';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type MovementState = 'idle' | 'moving' | 'completed';
interface DispatchCard {
  readonly id: string;
  readonly buyer: string;
  readonly destination: string;
  readonly status: string;
  readonly tone: NexaStatusTone;
  readonly emphasis?: NexaStatusEmphasis;
  readonly eta: string;
  readonly next: string;
}

@Component({
  selector: 'nexa-dispatch-board-page',
  imports: [NexaActionMenu, NexaButton, NexaDocumentationFrame, NexaStatusChip],
  templateUrl: './dispatch-board-page.html',
  styleUrl: './dispatch-board-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaDispatchBoardPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly dispatchSelection = signal('DSP-204');
  protected readonly movementState = signal<MovementState>('idle');
  protected readonly dispatchNotice = signal('Choose a card or command to inspect the accessible movement path.');
  protected readonly dispatchColumns: readonly { id: string; label: string; cards: readonly DispatchCard[] }[] = [
    { id: 'orders', label: 'Orders', cards: [{ id: 'DSP-204', buyer: 'La Cava Fría', destination: 'Lima · North', status: 'Ready for review', tone: 'info', eta: 'Candidate ETA', next: 'Review documents' }] },
    { id: 'preparation', label: 'Ready / preparation', cards: [{ id: 'DSP-198', buyer: 'Andino Food Service', destination: 'Callao · Hub', status: 'Documents pending', tone: 'warning', eta: 'Candidate ETA', next: 'Resolve checklist' }] },
    { id: 'distribution', label: 'In distribution', cards: [{ id: 'DSP-191', buyer: 'Frío Norte SAC', destination: 'Chiclayo · Route', status: 'Critical exception', tone: 'danger', emphasis: 'strong', eta: 'Candidate ETA', next: 'Open exception' }] },
    { id: 'delivered', label: 'Delivered', cards: [{ id: 'DSP-183', buyer: 'Mercado Central', destination: 'Lima · South', status: 'Completed', tone: 'success', eta: 'Closed', next: 'View record' }] },
    { id: 'exception', label: 'Exception / returned', cards: [{ id: 'DSP-176', buyer: 'Distribuciones Sur', destination: 'Arequipa · Hub', status: 'Blocked', tone: 'danger', eta: 'Needs decision', next: 'Review safely' }] },
    { id: 'handoff', label: 'Awaiting handoff', cards: [] },
  ];
  protected readonly dispatchMenuItems: readonly NexaActionMenuItem[] = [
    { id: 'open', label: 'Open candidate detail', icon: 'pi-external-link', shortcut: 'Enter' },
    { id: 'review', label: 'Review next safe action', icon: 'pi-check-circle' },
    { id: 'move', label: 'Move to candidate column', icon: 'pi-arrow-right', separatorBefore: true },
    { id: 'blocked', label: 'Critical command', icon: 'pi-ban', destructive: true },
    { id: 'disabled', label: 'Unresolved transition', icon: 'pi-lock', disabled: true },
  ];

  protected selectDispatch(id: string): void {
    this.dispatchSelection.set(id);
    this.movementState.set('idle');
    this.dispatchNotice.set(`${id} selected. Candidate transition permissions remain unresolved.`);
  }

  protected dispatchCommand(id: string): void {
    if (id === 'move') {
      this.beginMovement();
      return;
    }
    this.dispatchNotice.set(`Candidate command “${id}” inspected. No domain transition was executed.`);
  }

  protected beginMovement(): void {
    this.movementState.set('moving');
    this.dispatchNotice.set('Movement source and destination are explicit. No domain transition was executed.');
  }

  protected completeMovement(): void {
    this.movementState.set('completed');
    this.dispatchNotice.set('Candidate movement completed visually. Persisted domain state remains out of scope.');
  }
}
