import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CarsModule } from './cars/cars-module';
import { provideHttpClient } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';
import { SharedModule } from './shared/shared-module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarsModule,
    // HttpClientModule,
    RouterOutlet,
    RouterLink,
    SharedModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Uywamy teraz providers zamiast HttpClientModule
    provideHttpClient()
  ],
  bootstrap: [App]
})
export class AppModule { }
