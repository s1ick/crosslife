// src/app/services/city.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'https://run.mocky.io/v3/f1b708f1-0162-4f9c-881f-002d35684cf5'; 

  constructor(private http: HttpClient) {}

  getCities(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
