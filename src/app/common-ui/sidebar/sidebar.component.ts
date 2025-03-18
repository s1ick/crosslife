import { Component } from '@angular/core';
import { ListComponent, ListItem } from '../../components/list/list.component';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/city.model';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ListComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  isExpanded: boolean = true;

  menuItems: MenuItem[] = [
    { route: '/home', labelRoute: 'Главная', icon: 'home' },
    { route: '/regions', labelRoute: 'Регионы', icon: 'location_city' },
  ];

  onMenuItemClick(item: ListItem): void {
    console.log('Выбран пункт меню:', item);
  }
}