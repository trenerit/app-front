import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {

  private apiUrl = 'http://localhost:3000/auth';

  constructor(private readonly http: HttpClient, private readonly router: Router) {}

  login(credentials: {login: string, password: string}): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) =>{
        if(response && response.access_token) {
          sessionStorage.setItem('access_token', response.access_token);
        }
      })
    )
  }

  logout(): void {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  } 

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('access_token');
    return !!token;
   
  }

  // private apiUrl ='http://localhost:3000';

  // constructor(private readonly http: HttpClient) {
  //   // console.log('test constructor');
  //   // this.login('pkania', 'Tebik1234').subscribe((res) => {console.log(res)});
  // }

  // login(login: string, password: string): Observable<{access_token: string}> {
  //   console.log(login, password);
  //   return this.http.post<{access_token: string}>(`${this.apiUrl}/auth/login`, {login, password}).pipe(
  //     tap(res => {
  //       sessionStorage.setItem('session_token', res.access_token);
  //     })
  //   );
  // }

  // logout() {
  //   sessionStorage.removeItem('session_token');
  // }

  getToken() {
    return sessionStorage.getItem('access_token');
  }

  // isLoggedIn(): boolean {
  //   const token = this.getToken();
  //     if(!token) {
  //       return false;
  //     }

  //     try {
  //       const payload = jwtDecode<JwtPayload>(token);
  //       if(payload.exp && Date.now() >= payload.exp * 1000) {
  //         this.logout();
  //         return false;
  //       }
  //       return true;
  //     } catch {
  //       return false;
  //     }
  // }

  // getCurrentUserFromToken(): JwtPayload | false {
  //   const token = this.getToken();
  //   if(!token) return false;

  //   try {
  //     return jwtDecode<JwtPayload>(token); 
  //   } catch {
  //     return false;
  //   }
  // }

  // getUserRoles(): string | null {
  //   const user = this.getCurrentUserFromToken();
  //   if(user != null) {
  //     return user.role;
  //   }
  //   return null; 
  // }

  
}
