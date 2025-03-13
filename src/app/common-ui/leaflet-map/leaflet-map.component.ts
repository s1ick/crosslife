import { Component, Input, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-leaflet-map',
  standalone: true,
  template: '<div id="map" style="height: 300px; width: 100%;"></div>',
})
export class LeafletMapComponent implements AfterViewInit {
  private map: any;

  @Input() lat: number = 0;
  @Input() lng: number = 0;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map').setView([this.lat, this.lng], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    L.marker([this.lat, this.lng]).addTo(this.map);
  }
}