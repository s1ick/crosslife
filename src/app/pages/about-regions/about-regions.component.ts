import { Component, OnInit } from '@angular/core';
import { CityService } from '../../services/city.service';
import { City, MenuItem } from '../../models/city.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { trigger, transition, style, animate } from '@angular/animations';
import { CardComponent } from '../../components/card/card.component';
import { ListComponent } from '../../components/list/list.component';

@Component({
  selector: 'app-about-regions',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CardComponent,
    ListComponent
  ],
  templateUrl: './about-regions.component.html',
  styleUrls: ['./about-regions.component.scss'],
  animations: [
    trigger('fadeInUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px) scale(0.95)' }),
        animate('300ms 300ms ease-out', style({ opacity: 1, transform: 'translateY(0) scale(1)' })),
      ]),
    ]),
  ],
})
export class AboutRegionsComponent implements OnInit {
  regions: City[] = [];
  selectedCity: City | null = null;
  isExpanded: boolean = true;

  constructor(private cityService: CityService) {}

  ngOnInit() {
    this.cityService.loadCities();
    this.regions = this.cityService.cities();

    if (this.regions.length > 0) {
      this.selectedCity = this.regions[0];
    }
  }

  selectRegion(item: MenuItem): void {
    const city = this.regions.find((c) => c.id === item.id); 
    if (city) {
      this.selectedCity = city; 
      console.log('Выбран регион:', city);
    }
  }

  getListItems(): MenuItem[] {
    return this.regions.map((city) => ({
      id: city.id, 
      labelRoute: city.name,
      icon: 'location_city',
      label: city.name,
    }));
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://placehold.co/400x300/ff0000/ffffff?text=404+Not+Found'; 
    imgElement.alt = 'Изображение недоступно';
  }
}