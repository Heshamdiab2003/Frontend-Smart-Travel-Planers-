import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly AUTH_KEY = 'stp_is_logged_in';

  // Initialize isLoggedIn state from localStorage
  isLoggedIn = signal<boolean>(localStorage.getItem(this.AUTH_KEY) === 'true');

  login() {
    this.isLoggedIn.set(true);
    localStorage.setItem(this.AUTH_KEY, 'true');
  }

  logout() {
    this.isLoggedIn.set(false);
    localStorage.removeItem(this.AUTH_KEY);
  }
}
