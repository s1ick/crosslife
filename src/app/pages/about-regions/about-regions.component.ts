import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city.service';
import { City } from '../../models/city.model';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-about-regions',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './about-regions.component.html',
  styleUrls: ['./about-regions.component.scss'],
animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ 
          opacity: 0, 
          transform: 'translateY(20px) scale(0.95)' 
        }),
        animate('300ms 300ms ease-out', style({ 
          opacity: 1, 
          transform: 'translateY(0) scale(1)'
        })),
      ]),
    ]),
  ],
})
export class AboutRegionsComponent implements OnInit {
  regions: City[] = []; 
  selectedCity: City | null = null;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.cityService.loadCities().subscribe(() => {
      this.regions = this.cityService.cities();

      if (this.regions.length > 0) {
        this.selectedCity = this.regions[0];
      }
    });
  }

  selectRegion(city: City): void {
    console.log('Выбран регион:', city);
    this.selectedCity = city;
  }

  getRegions(): City[] {
    return this.regions;
  }
  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://via.placeholder.com/400x300.png/ff0000/ffffff?text=404+Not+Found';
  }
}