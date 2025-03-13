import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = environment.apiUrl;

  cities = signal<City[]>([]); 
  loading = signal<boolean>(false); 
  error = signal<string | null>(null); 

  constructor(private http: HttpClient) {}

  loadCities(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<{ data: City[] }>(this.apiUrl).subscribe({
      next: (response) => {
        this.cities.set(response.data); 
        this.loading.set(false);
      },
      error: (err) => {
        this.error.set('Ошибка загрузки городов');
        this.loading.set(false);
      },
    });
  }
}
