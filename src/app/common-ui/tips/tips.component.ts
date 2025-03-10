import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tips',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tips.component.html',
  styleUrls: ['./tips.component.scss'],
})
export class TipsComponent {
  @Input() tips: string[] = [];
  @Output() removeTagEvent = new EventEmitter<string>();

  removeTag(tag: string): void {
    this.removeTagEvent.emit(tag);
  }
}
