import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  email = '';
  successMessage = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (!this.email) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.authService.forgotPassword(this.email).subscribe({
      next: () => {
        this.isLoading = false; 
        this.successMessage = 'If an account exists, a reset link will be sent to it shortly.';
      },
      error: () => {
        this.isLoading = false; 
        this.errorMessage = 'Something went wrong. Please check your connection and try again.';
      }
    });
  }
}
