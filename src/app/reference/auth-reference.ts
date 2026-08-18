import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NexaButton, NexaStatusChip, NexaSurface } from '../shared/ui-contracts';

@Component({
  selector: 'nexa-auth-reference',
  imports: [NexaButton, NexaStatusChip, NexaSurface],
  templateUrl: './auth-reference.html',
  styleUrl: './auth-reference.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaAuthReference {
  private readonly route = inject(ActivatedRoute);
  protected readonly screen = this.route.snapshot.data['screen'] as string;
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly submitted = signal(false);
  protected readonly workspace = signal(false);
  protected isWorkspace(): boolean {
    return this.screen === 'auth-workspace';
  }
  protected isOrganization(): boolean {
    return this.screen === 'auth-organization-setup';
  }
  protected submit(): void {
    this.submitted.set(true);
  }
  protected chooseWorkspace(): void {
    this.workspace.set(true);
  }
}
