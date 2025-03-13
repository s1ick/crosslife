import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegionDetailsModalComponent } from '../region-details-modal/region-details-modal.component';
import { City } from '../../models/city.model'; // Импортируем интерфейс City
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent {
  @Input() tips: City[] = []; 
  @Output() removeTagEvent = new EventEmitter<City>();

  constructor(private dialog: MatDialog) {}

  openRegionDetailsModal(tip: City): void {
    this.dialog.open(RegionDetailsModalComponent, {
      height: '100%',
      width: '100vw',
      maxHeight: '100%',
      maxWidth: '100vw',
      data: tip,
    });
  }

  removeTag(tag: City): void {
    this.removeTagEvent.emit(tag);
  }
}