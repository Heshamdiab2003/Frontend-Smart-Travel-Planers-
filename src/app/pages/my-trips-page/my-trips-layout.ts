import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-my-trips-layout',
  standalone: true,
  imports: [RouterOutlet, Navbar],
  template: `
    <app-navbar [lightBg]="true"></app-navbar>
    <div style="padding-top: 65px;">
      <router-outlet></router-outlet>
    </div>
  `
})
export class MyTripsLayout {}
