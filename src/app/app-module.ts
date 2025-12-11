import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { CarsModule } from './cars/cars-module';
import { provideHttpClient, HTTP_INTERCEPTORS, withInterceptors } from '@angular/common/http';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SharedModule } from './shared/shared-module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { jwtInterceptor } from './auth/jwt.interceptor';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CarsModule,
    RouterOutlet,
    RouterLink,
    SharedModule,
    NgbModule,
    FormsModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    // Uywamy teraz providers zamiast HttpClientModule
    provideHttpClient(withInterceptors([jwtInterceptor]))
  ],
  bootstrap: [App]
})
export class AppModule { }
