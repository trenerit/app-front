import { Component } from '@angular/core';
import { Auth } from '../../auth/auth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  constructor(private readonly authService: Auth) {}

  submitData(data: any) {

    console.log(data.value);

    this.authService.login(`${data.value.login}`, `${data.value.password}`).subscribe();

  }

}
