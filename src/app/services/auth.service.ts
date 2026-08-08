import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'https://nest-movie-watchlist.onrender.com'; 

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  register(email: string, password: string) {
    
    return this.http.post(`${this.apiUrl}/auth/register`, { email, password });
  }
  forgotPassword(email: string) {
      return this.http.post(`${this.apiUrl}/auth/forgot-password`, { email });
    }
  
    resetPassword(password: string, token: string) {
      return this.http.post(`${this.apiUrl}/auth/reset-password`, { password, token });
    }
}
