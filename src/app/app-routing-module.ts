import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainCars } from './cars/main-cars/main-cars';
import { ViewCar } from './cars/view-car/view-car';
import { Login } from './users/login/login';
import { authGuard } from './auth/auth.guard';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: Login},
  {path: 'main-cars', component: MainCars, canActivate:[authGuard]},
  {path: 'view-car/:id', component: ViewCar, canActivate:[authGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
