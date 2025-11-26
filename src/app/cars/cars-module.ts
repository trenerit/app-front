import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainCars } from './main-cars/main-cars';
import { AppRoutingModule } from "../app-routing-module";
import { ViewCar } from './view-car/view-car';



@NgModule({
  declarations: [MainCars, ViewCar],
  imports: [
    CommonModule,
    AppRoutingModule
]
})
export class CarsModule { }
