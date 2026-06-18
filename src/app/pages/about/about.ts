import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../components/navbar/navbar';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class AboutPage {}
