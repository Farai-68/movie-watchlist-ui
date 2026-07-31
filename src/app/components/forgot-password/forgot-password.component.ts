import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

  onSubmit() {
    if (this.email) {
      this.successMessage = 'If an account exists, a reset link has been sent.';
      this.errorMessage = '';
    } else {
      this.errorMessage = 'Please enter a valid email address.';
    }
  }
}
