import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ButtonsComponent } from './components/buttons/buttons.component'; // Импортируйте вашу кнопку

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    SidebarComponent,
    ButtonsComponent, // Добавьте вашу кнопку сюда
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