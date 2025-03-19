import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './common-ui/sidebar/sidebar.component'; // Импортируем SidebarComponent
import { ButtonsComponent } from './components/buttons/buttons.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    SidebarComponent, // Добавляем SidebarComponent в imports
    ButtonsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isDrawerOpen = false;

  toggleDrawer(): void {
    this.isDrawerOpen = !this.isDrawerOpen;
  }
}