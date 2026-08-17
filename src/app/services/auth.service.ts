import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private apiUrl = 'https://nest-movie-watchlist.onrender.com'; 

  constructor(private http: HttpClient) {}

 
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

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

  
  // PROFILE & ACCOUNT MANAGEMENT
  
  getProfile() {
    return this.http.get(`${this.apiUrl}/auth/profile`, { headers: this.getAuthHeaders() });
  }

  deleteAccount() {
    return this.http.delete(`${this.apiUrl}/auth/account`, { headers: this.getAuthHeaders() });
  }
}
