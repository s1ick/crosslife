import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { signal } from '@angular/core';

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
export class SelectComponent implements OnInit {
  @Input() items: any[] = [];
  @Input() isMultiple: boolean = false;
  @Input() selectedItems: any[] = [];

  @Output() selectedItemsChange = new EventEmitter<any[]>();
  @Output() goBackEvent = new EventEmitter<void>();

  searchTerm: string = '';
  sortedItems = signal<any[]>([]);
  userDefinedOrder = signal<number[]>([]); // Порядок, установленный пользователем

  ngOnInit(): void {
    const sorted = [...this.items].sort((a, b) => a.name.localeCompare(b.name));
    this.sortedItems.set(sorted);
    this.userDefinedOrder.set(sorted.map((_, index) => index)); // Инициализируем порядок
  }

  filteredItems() {
    const filtered = this.sortedItems().filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return this.userDefinedOrder()
      .map(index => this.sortedItems()[index]) // Применяем порядок, установленный пользователем
      .filter(item => filtered.includes(item)); // Фильтруем
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
    const currentOrder = [...this.userDefinedOrder()];
    moveItemInArray(currentOrder, event.previousIndex, event.currentIndex);
    this.userDefinedOrder.set(currentOrder);
  }
}