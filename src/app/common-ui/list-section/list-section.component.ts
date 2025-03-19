import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-list-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-section.component.html',
  styleUrls: ['./list-section.component.scss'],
})
export class ListSectionComponent {
  @Input() title: string = ''; 
  @Input() items: any[] = []; 
  @Input() itemTemplate!: TemplateRef<any>;
}