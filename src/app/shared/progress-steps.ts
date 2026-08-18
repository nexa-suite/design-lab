import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

export interface NexaStep {
  readonly id: string;
  readonly label: string;
  readonly helper?: string;
}

@Component({
  selector: 'nexa-progress-steps',
  template: `<ol class="steps" aria-label="Workflow progress">
    @for (step of steps(); track step.id; let index = $index) {
      <li [class.current]="index === current()" [class.complete]="index < current()">
        <button
          type="button"
          [attr.aria-current]="index === current() ? 'step' : null"
          (click)="stepChange.emit(index)"
        >
          <span class="step-marker"
            ><span>{{ index < current() ? '✓' : index + 1 }}</span></span
          ><span class="step-copy"
            ><strong>{{ step.label }}</strong>
            @if (step.helper) {
              <small>{{ step.helper }}</small>
            }
          </span>
        </button>
        @if (index < steps().length - 1) {
          <span class="step-line" aria-hidden="true"></span>
        }
      </li>
    }
  </ol>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      :host {
        display: block;
      }
      .steps {
        display: flex;
        align-items: start;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      li {
        display: flex;
        align-items: start;
        flex: 1;
        min-width: 0;
      }
      li:last-child {
        flex: 0 1 auto;
      }
      button {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: max-content;
        padding: 0;
        border: 0;
        background: transparent;
        color: var(--nexa-color-text-secondary);
        font: inherit;
        text-align: left;
        cursor: pointer;
      }
      button:focus-visible {
        outline: none;
        box-shadow: var(--nexa-focus-ring);
        border-radius: var(--nexa-radius-pill);
      }
      .step-marker {
        display: grid;
        place-items: center;
        width: 32px;
        height: 32px;
        flex: 0 0 32px;
        border: 1px solid var(--nexa-color-border-strong);
        border-radius: 50%;
        background: var(--nexa-surface-card);
        font-weight: 700;
      }
      .step-copy {
        display: grid;
        gap: 2px;
      }
      .step-copy strong {
        font-size: 13px;
      }
      .step-copy small {
        color: var(--nexa-color-text-muted);
        font-size: 11px;
      }
      .current button,
      .complete button {
        color: var(--nexa-color-primary-700);
      }
      .current .step-marker {
        border-color: var(--nexa-color-primary-600);
        background: var(--nexa-color-primary-600);
        color: white;
      }
      .complete .step-marker {
        border-color: var(--nexa-color-success-700);
        background: var(--nexa-surface-success);
        color: var(--nexa-color-success-700);
      }
      .step-line {
        height: 1px;
        flex: 1;
        margin: 16px 12px 0;
        background: var(--nexa-color-border-default);
      }
      .complete .step-line {
        background: var(--nexa-color-primary-300);
      }
      @media (max-width: 640px) {
        .steps {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 4px;
          padding-bottom: 4px;
        }
        li,
        li:last-child {
          display: block;
          min-width: 0;
        }
        button {
          width: 100%;
          min-width: 0;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          text-align: center;
        }
        .step-copy {
          min-width: 0;
        }
        .step-copy strong {
          overflow: hidden;
          width: 100%;
          font-size: 11px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .step-copy small,
        .step-line {
          display: none;
        }
      }
    `,
  ],
})
export class NexaProgressSteps {
  readonly steps = input.required<readonly NexaStep[]>();
  readonly current = input(0);
  readonly stepChange = output<number>();
}
