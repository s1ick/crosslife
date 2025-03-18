import { Injectable, signal } from '@angular/core';
import { City } from '../models/city.model';
import * as data from './data.json';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private citiesData = (data as any).default.data;

  cities = signal<City[]>([]);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);

  constructor() {}

  loadCities() {
    this.loading.set(true);
    this.error.set(null);

    try {
      this.cities.set(this.citiesData);
    } catch (err) {
      this.error.set('Ошибка загрузки данных: ' + (err as Error).message);
    } finally {
      this.loading.set(false);
    }
  }
}