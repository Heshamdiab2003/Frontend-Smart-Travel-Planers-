import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Settings } from '../../components/settings-dashboard/settings/settings';

@Component({
  selector: 'app-settings-page',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Settings
  ],
  templateUrl: './settings-page.html',
  styleUrl: './settings-page.css'
})
export class SettingsPage {
  successMessage: string = '';
  errorMessage: string = '';

  private alertTimeout: any;

  onAlert(event: { type: 'success' | 'danger'; message: string }) {
    this.clearAlerts();
    if (event.type === 'success') {
      this.successMessage = event.message;
    } else {
      this.errorMessage = event.message;
    }

    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
    this.alertTimeout = setTimeout(() => {
      this.successMessage = '';
      this.errorMessage = '';
    }, 4000);
  }

  private clearAlerts() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}
