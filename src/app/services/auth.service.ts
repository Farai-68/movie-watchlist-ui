import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Use one consistent name
  private apiUrl = 'https://nest-movie-watchlist.onrender.com';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    // Corrected to /auth/login
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.access_token);
      })
    );
  }

  register(email: string, password: string) {
    // Corrected to use this.apiUrl
    return this.http.post(`${this.apiUrl}/auth/register`, { email, password });
  }
}
