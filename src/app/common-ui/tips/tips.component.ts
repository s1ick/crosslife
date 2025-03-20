import { Component, Input, Output, EventEmitter } from '@angular/core';
import { City } from '../../models/city.model'; 
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent {
  @Input() tips: City[] = []; 
  @Output() removeTagEvent = new EventEmitter<City>();
  removeTag(tag: City): void {
    this.removeTagEvent.emit(tag);
  }
}