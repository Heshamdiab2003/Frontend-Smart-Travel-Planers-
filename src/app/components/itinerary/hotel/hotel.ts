import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelInfo } from '../../../interfaces/hotel-info';

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel.html',
  styleUrl: './hotel.css'
})
export class Hotel {
  @Input() hotel: HotelInfo | null | undefined = null;

  getStars(count: number): number[] {
    return Array.from({ length: Math.max(0, count || 0) });
  }
}
