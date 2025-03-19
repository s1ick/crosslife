import { Component, Input } from '@angular/core';
import { ListComponent } from '../../components/list/list.component';
import { CommonModule } from '@angular/common';
import { MenuItem } from '../../models/city.model';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [ListComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  animations: [
    trigger('fadeText', [
      state('visible', style({
        opacity: 1,
      })),
      state('hidden', style({
        opacity: 0,
      })),
      transition('visible <=> hidden', animate('300ms ease-in-out')),
    ]),
  ],
})
export class SidebarComponent {
  @Input() isExpanded: boolean = true; // Добавляем @Input()

  menuItems: MenuItem[] = [
    { route: '/home', labelRoute: 'Главная', icon: 'home' },
    { route: '/regions', labelRoute: 'Регионы', icon: 'location_city' },
  ];


}