import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  userEmail: string = 'Loading...';
  isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getProfile().subscribe({
      next: (data: any) => {
        this.userEmail = data.email;
      },
      error: () => {
        this.userEmail = 'Error loading profile';
      }
    });
  }

  onDeleteAccount() {
    const isConfirmed = confirm('Are you absolutely sure you want to delete your account? This action cannot be undone and your watchlist will be lost forever.');
    
    if (isConfirmed) {
      this.isLoading = true;
      this.authService.deleteAccount().subscribe({
        next: () => {
          localStorage.removeItem('token'); 
          this.router.navigate(['/register']);
        },
        error: (err) => {
          this.isLoading = false;
          alert('Failed to delete account. Please try again.');
        }
      });
    }
  }
}
