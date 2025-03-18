import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LeafletMapComponent } from '../leaflet-map/leaflet-map.component';
import { City } from '../../models/city.model';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { ButtonsComponent } from '../../components/buttons/buttons.component';

@Component({
  selector: 'app-region-details-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    LeafletMapComponent,
    CommonModule,
    MatIconModule,
    ButtonsComponent, 
  ],
  templateUrl: './region-details-modal.component.html',
  styleUrls: ['./region-details-modal.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class RegionDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<RegionDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: City
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}