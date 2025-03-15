import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { City } from '../models/city.model';
import { environment } from '../environment/environment';
import { catchError, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = environment.apiUrl;

  cities = signal<City[]>([]); 
  loading = signal<boolean>(false); 
  error = signal<string | null>(null); 

  constructor(private http: HttpClient) {}

  loadCities() {
    this.loading.set(true);  
    return this.http.get<{ data: City[] }>(this.apiUrl).pipe(
      map(response => {
        if (response && response.data) {
          this.cities.set(response.data);
        } else {
          this.error.set('Ошибка загрузки городов');
        }
        this.loading.set(false); 
      }),
      catchError(err => {
        this.error.set('Ошибка загрузки городов');
        this.loading.set(false);  
        return of([]);  
      })
    );
  }
}
