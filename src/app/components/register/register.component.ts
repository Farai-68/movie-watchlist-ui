import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  errorMessage = '';
  isLoading = false; // Added loading state
  showPassword = false; // Added to toggle password visibility

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.email, this.password).subscribe({
      next: () => {
        this.isLoading = false;
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = 'Registration failed. Please try a different email or try again later.';
      }
    });
  }
}
