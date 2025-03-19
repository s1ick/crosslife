import { Component, Input, Output, EventEmitter, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { InputComponent } from '../../components/input/input.component';
import { CheckboxComponent } from '../../components/checkbox/checkbox.component';
import { City } from '../../models/city.model';

7

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    CheckboxComponent,
    MatIconModule,
    CdkDrag,
    CdkDropList,
    InputComponent
  ],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  @Input() items: City[] = [];
  @Input() isMultiple: boolean = false;
  @Input() selectedItems: City[] = [];

  @Output() selectedItemsChange = new EventEmitter<City[]>();
  @Output() goBackEvent = new EventEmitter<void>();

  searchTerm: string = '';
  sortedItems = signal<City[]>([]);
  userDefinedOrder = signal<number[]>([]);

  ngOnInit(): void {
    this.updateSortedItems();
  }

  updateSortedItems(): void {
    const sorted = [...this.items].sort((a, b) => a.name.localeCompare(b.name));
    this.sortedItems.set(sorted);
    this.userDefinedOrder.set(sorted.map((_, index) => index));
  }
  shouldShowLabel(item: City): boolean {
    return !!item.name;
  }
  filteredItems(): City[] {
    const filtered = this.sortedItems().filter(item =>
      item.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    return this.userDefinedOrder()
      .map(index => this.sortedItems()[index])
      .filter(item => filtered.includes(item));
  }

  onItemSelect(item: any, isChecked: boolean): void {
    if (this.isMultiple) {
      if (isChecked) {
        this.selectedItems.push(item);
      } else {
        this.selectedItems = this.selectedItems.filter(i => i !== item);
      }
    } else {
      this.selectedItems = isChecked ? [item] : [];
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