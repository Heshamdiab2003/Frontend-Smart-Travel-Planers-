import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {
  preferences = {
    emailTripReminders: true,
    emailMarketing: false,
    pushTravelAlerts: true,
    smsImportantUpdates: false
  };

  @Output() triggerAlert = new EventEmitter<{ type: 'success' | 'danger'; message: string }>();

  savePreferences() {
    // Simulate successful save
    this.triggerAlert.emit({ type: 'success', message: 'System preferences and notification settings updated!' });
  }
}
