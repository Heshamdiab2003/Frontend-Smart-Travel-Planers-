import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPasswordPage {
  email: string = '';
  isSubmitted: boolean = false;
  errorMessage: string = '';

  sendResetLink() {
    if (!this.email.trim()) {
      this.errorMessage = 'Please enter a valid email address.';
      return;
    }
    
    // Simple email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Please enter a valid email address format.';
      return;
    }

    this.errorMessage = '';
    this.isSubmitted = true;
    console.log('Sending recovery password reset link to:', this.email);
  }
}
