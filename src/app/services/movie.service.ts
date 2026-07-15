import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Movie {
  id: string;
  title: string;
  description?: string;
  isWatched: boolean;
  rating?: number; // 1. Added rating here!
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiUrl = 'https://nest-movie-watchlist.onrender.com/movies';

  constructor(private http: HttpClient) {}
private getHeaders() {
  const token = localStorage.getItem('token');
  console.log('Sending Token:', token); // Add this line
  
  if (!token) {
    console.error('No token found in localStorage!');
  }
  
  return new HttpHeaders().set('Authorization', `Bearer ${token}`);
}

  getMovies() {
    return this.http.get<Movie[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  addMovie(movie: { title: string; description: string }) {
    return this.http.post<Movie>(this.apiUrl, movie, { headers: this.getHeaders() });
  }

  toggleWatched(id: string, isWatched: boolean) {
    return this.http.patch<Movie>(`${this.apiUrl}/${id}`, { isWatched }, { headers: this.getHeaders() });
  }

  deleteMovie(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  // 2. Added the new rating function!
  rateMovie(id: string, rating: number) {
    return this.http.patch<Movie>(`${this.apiUrl}/${id}`, { rating }, { headers: this.getHeaders() });
  }
}
