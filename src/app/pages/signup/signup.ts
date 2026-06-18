import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  loginWithGmail() {
    console.log('Gmail login clicked');
    this.authService.login();
    this.router.navigate(['/my-trips']);
  }
}
