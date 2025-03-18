import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { signal } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';

@Component({
  selector: 'app-select', // Изменил на app-select для лучшей практики
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatCheckboxModule,
    MatIconModule,
    CdkDrag,
    CdkDropList,
    InputComponent
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() items: any[] = []; // Замените any на конкретный тип, например, Item[]
  @Input() isMultiple: boolean = false;
  @Input() selectedItems: any[] = []; // Замените any на конкретный тип

  @Output() selectedItemsChange = new EventEmitter<any[]>(); // Замените any на конкретный тип
  @Output() goBackEvent = new EventEmitter<void>();

  searchTerm: string = '';
  sortedItems = signal<any[]>([]); // Замените any на конкретный тип
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

  onItemSelect(item: any): void { // Замените any на конкретный тип
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

  drop(event: CdkDragDrop<string[]>): void {
    const currentOrder = [...this.userDefinedOrder()];
    moveItemInArray(currentOrder, event.previousIndex, event.currentIndex);
    this.userDefinedOrder.set(currentOrder);
  }
}