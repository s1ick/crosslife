import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../models/city.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent {
  @Input() items: MenuItem[] = []; 
  @Input() isExpanded: boolean = true; 
  @Input() activeItem: MenuItem | null = null; 
  @Output() itemClick = new EventEmitter<MenuItem>(); 


  setActiveItem(item: MenuItem): void {
    this.activeItem = item; 
    this.itemClick.emit(item); 
  }
}