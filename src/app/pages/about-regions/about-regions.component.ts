import { Component, OnInit, ViewChild } from '@angular/core';
import { CityService } from '../../../../services/city.service';
import { City, MenuItem } from '../../models/city.model';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CardComponent } from '../../components/card/card.component';
import { ListComponent } from '../../components/list/list.component';
import { ListSectionComponent } from '../../common-ui/list-section/list-section.component';
import { LeafletMapComponent } from '../../common-ui/leaflet-map/leaflet-map.component';

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
    ListSectionComponent,
    LeafletMapComponent,
  ],
  templateUrl: './about-regions.component.html',
  styleUrls: ['./about-regions.component.scss'],
})
export class AboutRegionsComponent implements OnInit {
  regions: City[] = [];
  selectedCity: City | null = null;
  isExpanded: boolean = true;
  activeItem: MenuItem | null = null;

  // Добавляем ссылку на компонент карты
  @ViewChild(LeafletMapComponent) leafletMapComponent!: LeafletMapComponent;

  constructor(public cityService: CityService) {}

  ngOnInit(): void {
    this.cityService.loadCities(); // Загружаем данные
    this.regions = this.cityService.cities(); // Получаем данные

    // Выбираем Москву по умолчанию (id = 1)
    const defaultCity = this.regions.find((city) => city.id === 1);
    if (defaultCity) {
      this.selectedCity = defaultCity;
      this.activeItem = this.createMenuItem(defaultCity); // Устанавливаем активный элемент
    }
  }

  /**
   * Выбор региона по пункту меню.
   * @param item - Выбранный пункт меню.
   */
  selectRegion(item: MenuItem): void {
    const city = this.regions.find((c) => c.id === item.id);
    if (city) {
      this.selectedCity = city;
      this.activeItem = this.createMenuItem(city); // Обновляем активный элемент
      console.log('Выбран регион:', city);

      // Блокируем карту при выборе региона
      if (this.leafletMapComponent) {
        this.leafletMapComponent.lockMap();
      }
    }
  }

  /**
   * Преобразование списка городов в пункты меню.
   */
  getListItems(): MenuItem[] {
    return this.regions.map((city: City) => this.createMenuItem(city));
  }

  /**
   * Создание пункта меню для города.
   * @param city - Город.
   */
  private createMenuItem(city: City): MenuItem {
    return {
      id: city.id,
      labelRoute: city.name,
      icon: 'location_city',
      label: city.name,
    };
  }

  onImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'https://placehold.co/400x300/ff0000/ffffff?text=404+Not+Found';
    imgElement.alt = 'Изображение недоступно';
  }
}