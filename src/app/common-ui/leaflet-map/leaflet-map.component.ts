import { Component, Input, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  template: `<div [id]="mapId"></div>`, // Динамический id
})
export class LeafletMapComponent implements OnChanges, AfterViewInit {
  @Input() lat: number = 0;
  @Input() lng: number = 0;

  mapId: string = `map-${Math.random().toString(36).substring(7)}`; // Уникальный id
  private map: L.Map | null = null;
  private marker: L.Marker | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lat'] || changes['lng']) {
      this.updateMap();
    }
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private updateMap(): void {
    if (this.map) {
      this.map.setView([this.lat, this.lng], this.map.getZoom());

      if (this.marker) {
        this.marker.setLatLng([this.lat, this.lng]);
      } else {
        this.marker = L.marker([this.lat, this.lng]).addTo(this.map);
      }

      // Блокируем карту после обновления
      this.lockMap();
    }
  }

  private initMap(): void {
    if (document.getElementById(this.mapId)) {
      console.log('Инициализация карты'); // Логируем инициализацию

      // Указываем пути к иконке и тени маркера
      const iconRetinaUrl = 'assets/leaflet/marker-icon-2x.png';
      const iconUrl = 'assets/leaflet/marker-icon.png';
      const shadowUrl = 'assets/leaflet/marker-shadow.png';

      // Создаем кастомный икон
      const iconDefault = L.icon({
        iconRetinaUrl,
        iconUrl,
        shadowUrl,
        iconSize: [25, 41], // Размер иконки
        iconAnchor: [12, 41], // Точка привязки иконки
        popupAnchor: [1, -34], // Точка привязки всплывающего окна
        shadowSize: [41, 41], // Размер тени
      });

      // Устанавливаем кастомный икон по умолчанию
      L.Marker.prototype.options.icon = iconDefault;

      // Инициализируем карту
      this.map = L.map(this.mapId).setView([this.lat, this.lng], 13);

      // Добавляем слой карты
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
      }).addTo(this.map);

      // Добавляем маркер
      this.marker = L.marker([this.lat, this.lng]).addTo(this.map);

      // Блокируем карту при инициализации
      this.lockMap();

      // Разблокируем карту при клике
      this.map.on('click', () => {
        console.log('Карта разблокирована'); // Логируем событие
        this.unlockMap();
      });
    } else {
      console.error(`Элемент с id="${this.mapId}" не найден в DOM.`);
    }
  }

  /**
   * Блокирует карту (отключает взаимодействие).
   */
  lockMap(): void {
    if (this.map) {
      console.log('Карта заблокирована'); // Логируем блокировку
      this.map.dragging.disable();
      this.map.touchZoom.disable();
      this.map.doubleClickZoom.disable();
      this.map.scrollWheelZoom.disable();
      this.map.boxZoom.disable();
      this.map.keyboard.disable();

      const mapContainer = this.map.getContainer();
      mapContainer.style.cursor = 'pointer';
    }
  }

  /**
   * Разблокирует карту (включает взаимодействие).
   */
  unlockMap(): void {
    if (this.map) {
      console.log('Карта разблокирована'); // Логируем разблокировку
      this.map.dragging.enable();
      this.map.touchZoom.enable();
      this.map.doubleClickZoom.enable();
      this.map.scrollWheelZoom.enable();
      this.map.boxZoom.enable();
      this.map.keyboard.enable();

      const mapContainer = this.map.getContainer();
      mapContainer.style.cursor = 'grab';
    }
  }
}