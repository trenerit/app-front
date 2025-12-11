import { Component } from '@angular/core';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  constructor(private readonly authService: Auth) {}

  logout() {
    this.authService.logout();
  }
}
