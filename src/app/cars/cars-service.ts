import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../models/car-model';
import { Auth } from '../auth/auth';

@Injectable({
  providedIn: 'root',
})
export class CarsService {

  apiUrl = 'http://localhost:3000/car';
  
  constructor(
    private readonly http: HttpClient, private readonly authService: Auth
  ) {}

  getCars(): Observable<CarModel[]> {

    return this.http.get<CarModel[]>(`${this.apiUrl}`, {headers: {Authorization:  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImxvZ2luIjoicGthbmlhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjUzNjc1NzgsImV4cCI6MTc2NTM3MTE3OH0.DMg8YYqlbaGp8MZaPTJGDw9RiOyKE4B4tMKM4t2cy8M"}});
  }
  
  getCar(id: number): Observable<CarModel> {
    return this.http.get<CarModel>(`${this.apiUrl}/${id}`);
  }

  searchCars(search: object): Observable<CarModel[]> {
    return this.http.post<CarModel[]>(`${this.apiUrl}/search`, search);
  }

  addCar(car: CarModel): Observable<CarModel> {
    return this.http.post<CarModel>(`${this.apiUrl}`, car);
  }
  
  modCar(idCar: number, car: CarModel): Observable<CarModel> {
    return this.http.patch<CarModel>(`${this.apiUrl}/${idCar}`, car);
  }
  
  modCarStatus(idCar: number, is_rented: number): Observable<CarModel> {
    return this.http.put<CarModel>(`${this.apiUrl}/${idCar}`, {is_rented});
  }

  delCar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }


  
}
