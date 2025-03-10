import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'select-component',
  standalone: true,
  imports: [
    FormsModule, CommonModule, MatCheckboxModule,
    MatFormFieldModule, MatIconModule, MatInputModule
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() items: any[] = [];
  @Input() isMultiple: boolean = false;
  @Output() selectedItemsChange = new EventEmitter<any[]>();

  searchTerm: string = ''; 
  selectedItems: any[] = [];
  selectedItem: any = null;

  filteredItems() {
    return this.items.filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onItemSelect(item: any) {
    if (this.isMultiple) {
      this.selectedItems.includes(item)
        ? this.selectedItems = this.selectedItems.filter(i => i !== item)
        : this.selectedItems.push(item);
    } else {
      this.selectedItem = this.selectedItem === item ? null : item;
    }
    this.selectedItemsChange.emit(this.isMultiple ? this.selectedItems : [this.selectedItem]);
  }
  @Output() goBackEvent = new EventEmitter<void>(); 

  goBack(): void {
    this.goBackEvent.emit(); 
  }
}
