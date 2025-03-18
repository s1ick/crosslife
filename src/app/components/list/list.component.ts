import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router'; 
import { City,  MenuItem} from '../../models/city.model';

export type ListItem = City | MenuItem;

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
  @Output() itemClick = new EventEmitter<MenuItem>();

  onItemClick(item: MenuItem): void {
    this.itemClick.emit(item);
  }
}