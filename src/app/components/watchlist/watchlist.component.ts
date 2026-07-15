import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieService, Movie } from '../../services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-watchlist',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './watchlist.component.html',
  styleUrl: './watchlist.component.css'
})
export class WatchlistComponent implements OnInit {
  movies: Movie[] = [];
  newTitle = '';
  newDescription = '';

  // 1. We inject the ChangeDetectorRef (cdr) here
  constructor(
    private movieService: MovieService, 
    private router: Router,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe({
      next: (data) => {
        this.movies = data;
        // 2. Manually trigger the UI to redraw the moment the data arrives!
        this.cdr.detectChanges(); 
      },
      error: () => this.logout() 
    });
  }

  addMovie() {
    if (!this.newTitle) return;
    this.movieService.addMovie({ title: this.newTitle, description: this.newDescription })
      .subscribe(() => {
        this.newTitle = '';
        this.newDescription = '';
        this.loadMovies(); 
      });
  }

  toggleWatched(movie: Movie) {
    this.movieService.toggleWatched(movie.id, !movie.isWatched)
      .subscribe(() => this.loadMovies());
  }

  deleteMovie(id: string) {
    this.movieService.deleteMovie(id).subscribe(() => this.loadMovies());
  }

  rateMovie(movie: Movie, rating: number) {
      this.movieService.rateMovie(movie.id, rating).subscribe(() => this.loadMovies());
    }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
