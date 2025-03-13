import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'select-component',
  standalone: true,
  imports: [
    FormsModule, CommonModule, MatCheckboxModule,
    MatFormFieldModule, MatIconModule, MatInputModule,
    CdkDrag, CdkDropList
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent {
  @Input() items: any[] = [];
  @Input() isMultiple: boolean = false;
  @Input() selectedItems: any[] = []; 

  @Output() selectedItemsChange = new EventEmitter<any[]>();
  @Output() goBackEvent = new EventEmitter<void>(); 

  searchTerm: string = ''; 

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
      this.selectedItems = [item]; 
    }
    this.selectedItemsChange.emit([...this.selectedItems]); 
  }

  goBack(): void {
    this.goBackEvent.emit(); 
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.items, event.previousIndex, event.currentIndex);
  }
}
