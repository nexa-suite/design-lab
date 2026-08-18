import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NexaButton, NexaPageHeader, NexaStatusChip, NexaSurface } from '../shared/ui-contracts';

@Component({
  selector: 'nexa-portal-home-reference',
  imports: [NexaButton, NexaPageHeader, NexaStatusChip, NexaSurface, RouterLink],
  templateUrl: './portal-home-reference.html',
  styleUrl: './portal-home-reference.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NexaPortalHomeReference {}
