import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false; 
  errorMessage = '';
  isLoading = false; 
  showPassword = false; // Added to toggle password visibility

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.isLoading = true; 
    this.errorMessage = ''; 

    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/watchlist']);
      },
      error: (err) => {
        this.isLoading = false; 
        this.errorMessage = 'Incorrect email or password. Please check your details and try again.';
      }
    });
  }
}
