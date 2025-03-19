import { Component, Input, OnInit } from '@angular/core';
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
export class SidebarComponent implements OnInit {
  @Input() isExpanded: boolean = true; 
  activeItem: MenuItem | null = null; 
  menuItems: MenuItem[] = [
    { id: 1, route: '/home', labelRoute: 'Главная', icon: 'home' },
    { id: 2, route: '/regions', labelRoute: 'Регионы', icon: 'location_city' },
  ];
ngOnInit(): void {
  this.activeItem = this.menuItems[0];
}
  onItemClick(item: MenuItem): void {
    this.activeItem = item; 
    console.log('Выбран элемент:', item);
  }

}