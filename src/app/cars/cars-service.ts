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

  ngOnInit() {
    this.authService.login('pkania', 'Tebik1234').subscribe((res) => {console.log(res)});
  }

  getCars(): Observable<CarModel[]> {

    return this.http.get<CarModel[]>(`${this.apiUrl}`, {headers: {Authorization:  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImxvZ2luIjoicGthbmlhIiwicm9sZSI6InVzZXIiLCJpYXQiOjE3NjUzNDUwMTMsImV4cCI6MTc2NTM0ODYxM30.HQoiyIIiIyMbBuYsCiljjfX9VrPxV9XSljrHrbjppyc"}});
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
