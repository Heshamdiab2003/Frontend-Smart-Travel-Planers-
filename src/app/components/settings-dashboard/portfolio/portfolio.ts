import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio {
  @Input() userProfile = {
    firstName: 'Mohamed',
    lastName: 'Elhosinii',
    email: 'mohamed@example.com',
    phone: '+20 123 456 7890',
    country: 'Egypt',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'
  };

  @Output() saveProfile = new EventEmitter<any>();
  @Output() triggerAlert = new EventEmitter<{ type: 'success' | 'danger'; message: string }>();

  onSubmit() {
    if (!this.userProfile.firstName.trim() || !this.userProfile.lastName.trim()) {
      this.triggerAlert.emit({ type: 'danger', message: 'First Name and Last Name are required.' });
      return;
    }
    this.saveProfile.emit(this.userProfile);
    this.triggerAlert.emit({ type: 'success', message: 'Personal information updated successfully!' });
  }

  onAvatarFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          this.userProfile.avatarUrl = e.target.result as string;
          this.triggerAlert.emit({ type: 'success', message: 'Profile photo updated locally!' });
        }
      };
      reader.readAsDataURL(file);
    }
  }
}
