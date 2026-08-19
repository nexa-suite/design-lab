import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { NexaButton, NexaStatusChip, type NexaStatusTone } from 'nexa-ui';
import { NexaDocumentationFrame } from '../../layout/documentation-page';
import { injectDocumentationRouteContext } from '../../layout/page-context';

type StateMode = 'first-use' | 'no-results' | 'filtered' | 'loading' | 'progress' | 'partial' | 'unavailable' | 'permission' | 'conflict' | 'warning' | 'error' | 'success' | 'cancelled' | 'read-only' | 'disabled';
interface StateDefinition { readonly label: string; readonly title: string; readonly explanation: string; readonly next: string; readonly icon: string; readonly tone: NexaStatusTone; readonly action?: string; }

const STATE_DEFINITIONS: Readonly<Record<StateMode, StateDefinition>> = {
  'first-use': { label: 'First use', title: 'Start with a buyer request', explanation: 'Nothing has been created in this workspace yet.', next: 'Create the first request when the buyer context is known.', icon: 'pi-inbox', tone: 'info', action: 'Create request' },
  'no-results': { label: 'No results', title: 'No requests match this search', explanation: 'The current query returned no records.', next: 'Clear the query or broaden the visible scope.', icon: 'pi-search', tone: 'info', action: 'Clear search' },
  filtered: { label: 'Filtered empty', title: 'No requests in this filter', explanation: 'The workspace has data, but none belongs to the selected filter.', next: 'Change the filter without implying that the workspace is empty.', icon: 'pi-filter', tone: 'info', action: 'Clear filter' },
  loading: { label: 'Loading', title: 'Loading purchase requests', explanation: 'The current context remains visible while data is retrieved.', next: 'Wait for the response; do not replace the page with a blank skeleton.', icon: 'pi-spin pi-spinner', tone: 'info' },
  progress: { label: 'Determinate', title: 'Preparing request documents', explanation: 'Known progress communicates how much work remains.', next: 'Keep the task available while preparation continues.', icon: 'pi-spin pi-spinner', tone: 'info' },
  partial: { label: 'Partial data', title: 'Some documents are available', explanation: 'The response is useful but incomplete.', next: 'Review available items and retry only the missing scope.', icon: 'pi-list', tone: 'warning', action: 'Retry missing' },
  unavailable: { label: 'Unavailable', title: 'The request service is unavailable', explanation: 'The system cannot provide current data at this moment.', next: 'Retry later without losing the current scope.', icon: 'pi-exclamation-triangle', tone: 'warning', action: 'Try again' },
  permission: { label: 'Permission denied', title: 'Access is not available here', explanation: 'The current context does not grant access to this information.', next: 'Contact the workspace owner or return to an allowed task.', icon: 'pi-lock', tone: 'danger', action: 'Return safely' },
  conflict: { label: 'Conflict', title: 'A newer request version exists', explanation: 'Another change arrived before this action completed.', next: 'Review the latest version before continuing.', icon: 'pi-exclamation-triangle', tone: 'warning', action: 'Review latest' },
  warning: { label: 'Warning', title: 'Documents need attention', explanation: 'The task can continue, but a condition should be understood first.', next: 'Review the warning before confirming the next action.', icon: 'pi-flag', tone: 'warning', action: 'Review warning' },
  error: { label: 'Retryable error', title: 'Requests could not load', explanation: 'The failure is recoverable and the current context remains available.', next: 'Retry locally; do not expose provider diagnostics.', icon: 'pi-exclamation-circle', tone: 'danger', action: 'Retry' },
  success: { label: 'Success', title: 'Request submitted', explanation: 'The current action completed successfully.', next: 'Sales owns the next review step.', icon: 'pi-check-circle', tone: 'success', action: 'View queue' },
  cancelled: { label: 'Cancelled', title: 'Operation cancelled', explanation: 'The operation stopped and no further automatic work will occur.', next: 'Start again only through an explicit action.', icon: 'pi-ban', tone: 'danger', action: 'Start again' },
  'read-only': { label: 'Read-only', title: 'This context is view-only', explanation: 'The information remains available but mutation is not allowed.', next: 'Return to an editable context if a change is required.', icon: 'pi-eye', tone: 'info' },
  disabled: { label: 'Disabled', title: 'Continue is unavailable', explanation: 'A prerequisite has not been met yet.', next: 'Complete the required step before continuing.', icon: 'pi-minus-circle', tone: 'neutral' },
};

@Component({
  selector: 'nexa-empty-loading-error-page',
  imports: [NexaButton, NexaDocumentationFrame, NexaStatusChip],
  templateUrl: './empty-loading-error-page.html',
  styleUrls: ['../pattern-foundation.scss', './empty-loading-error-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaEmptyLoadingErrorPage {
  protected readonly context = injectDocumentationRouteContext();
  protected readonly mode = signal<StateMode>('first-use');
  protected readonly modes: readonly StateMode[] = Object.keys(STATE_DEFINITIONS) as StateMode[];
  protected readonly stateDefinition = computed(() => STATE_DEFINITIONS[this.mode()]);
  protected stateDefinitionFor(state: StateMode): StateDefinition { return STATE_DEFINITIONS[state]; }
  protected setMode(mode: StateMode): void { this.mode.set(mode); }
  protected retry(): void { this.mode.set('loading'); window.setTimeout(() => this.mode.set('success'), 320); }
  protected activateAction(): void {
    const action = this.stateDefinition().action;
    if (action === 'Retry' || action === 'Try again' || action === 'Retry missing') this.retry();
    else if (action === 'Start again') this.mode.set('first-use');
    else if (action === 'Clear search' || action === 'Clear filter') this.mode.set('no-results');
    else if (action === 'View queue' || action === 'Return safely') this.mode.set('read-only');
    else this.mode.set('success');
  }
}
