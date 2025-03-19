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
import { ListSectionComponent } from '../../common-ui/list-section/list-section.component';

@Component({
  selector: 'app-about-regions',
  standalone: true,
  imports: [
    CommonModule,
    MatDividerModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CardComponent,
    ListComponent,
    ListSectionComponent
  ],
  templateUrl: './about-regions.component.html',
  styleUrls: ['./about-regions.component.scss'],
})
export class AboutRegionsComponent implements OnInit {
  regions: City[] = [];
  selectedCity: City | null = null;
  isExpanded: boolean = true;
  activeItem: MenuItem | null = null; 
  constructor(public cityService: CityService) {}

  ngOnInit() {
    this.cityService.loadCities(); // Загружаем данные
    this.regions = this.cityService.cities(); // Получаем данные

    if (this.regions.length > 0) {
      this.selectedCity = this.regions[0]; // Выбираем первый город по умолчанию
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

  getActiveItem(): MenuItem | null {
    if (!this.selectedCity) return null;
    return {
      id: this.selectedCity.id, 
      labelRoute: this.selectedCity.name,
      icon: 'location_city',
      label: this.selectedCity.name,
    };
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://placehold.co/400x300/ff0000/ffffff?text=404+Not+Found';
    imgElement.alt = 'Изображение недоступно';
  }
}