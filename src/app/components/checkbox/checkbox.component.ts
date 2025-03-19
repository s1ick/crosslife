import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-checkbox',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() checked: boolean = false;
  @Output() checkedChange = new EventEmitter<boolean>();
  @Input() label: boolean = true; 

  toggle() {
    this.checked = !this.checked;
    console.log('Checkbox toggled:', this.checked); 
    this.checkedChange.emit(this.checked);
  }
}