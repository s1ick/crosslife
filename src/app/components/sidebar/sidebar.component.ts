import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  @Input() isExpanded: boolean = true; 

  menuItems = [
    { icon: 'home', label: 'Home', route: '/home' },
    { icon: 'contacts', label: 'Контакты', route: '/contacts' },
    { icon: 'list', label: 'Формы', route: '/forms' },
  ];
}