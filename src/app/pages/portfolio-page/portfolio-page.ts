import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';
import { Portfolio } from '../../components/settings-dashboard/portfolio/portfolio';
import { SecurityPassword } from '../../components/settings-dashboard/security-password/security-password';

@Component({
  selector: 'app-portfolio-page',
  standalone: true,
  imports: [
    CommonModule,
    Navbar,
    Portfolio,
    SecurityPassword
  ],
  templateUrl: './portfolio-page.html',
  styleUrl: './portfolio-page.css'
})
export class PortfolioPage {
  activeTab: 'personal' | 'security' = 'personal';

  successMessage: string = '';
  errorMessage: string = '';

  userProfile = {
    firstName: 'Mohamed',
    lastName: 'Elhosinii',
    email: 'mohamed@example.com',
    phone: '+20 123 456 7890',
    country: 'Egypt',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop'
  };

  private alertTimeout: any;

  setActiveTab(tab: 'personal' | 'security') {
    this.activeTab = tab;
    this.clearAlerts();
  }

  onProfileSaved(updatedProfile: any) {
    this.userProfile = { ...updatedProfile };
  }

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
