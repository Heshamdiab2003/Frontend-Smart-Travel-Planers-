import { Component, HostListener, Input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  @Input() lightBg: boolean = false;

  isScrolled = false;
  isDropdownOpen = false;
  isMenuOpen = false;

  constructor(public authService: AuthService) {}

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > 60;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-menu')) {
      this.isDropdownOpen = false;
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
    console.log('User signed out.');
    this.authService.logout();
    this.isDropdownOpen = false;
  }
}

