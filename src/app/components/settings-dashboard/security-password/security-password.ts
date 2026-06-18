import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-security-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './security-password.html',
  styleUrl: './security-password.css'
})
export class SecurityPassword {
  security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  };

  @Output() triggerAlert = new EventEmitter<{ type: 'success' | 'danger'; message: string }>();

  // Visual Validation Getters
  get isNewPasswordLengthValid(): boolean {
    return this.security.newPassword.length >= 8;
  }

  get doPasswordsMatch(): boolean {
    return this.security.newPassword === this.security.confirmPassword && this.security.newPassword.length > 0;
  }

  get isSecurityFormValid(): boolean {
    return (
      this.security.currentPassword.length > 0 &&
      this.isNewPasswordLengthValid &&
      this.doPasswordsMatch
    );
  }

  changePassword() {
    if (!this.isSecurityFormValid) {
      this.triggerAlert.emit({ type: 'danger', message: 'Please fix the validation errors before submitting.' });
      return;
    }
    
    // Simulate successful save
    this.triggerAlert.emit({ type: 'success', message: 'Password updated successfully!' });
    this.security = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    };
  }
}
