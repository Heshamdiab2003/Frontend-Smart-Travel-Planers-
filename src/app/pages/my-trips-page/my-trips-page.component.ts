import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, TitleCasePipe, DecimalPipe } from '@angular/common';
import { UserTrip } from '../../interfaces/user-trip';

@Component({
  selector: 'app-my-trips-page',
  standalone: true,
  imports: [RouterLink, NgClass, TitleCasePipe, DecimalPipe],
  templateUrl: './my-trips-page.component.html',
  styleUrl: './my-trips-page.component.css'
})
export class MyTripsPageComponent {

  /** Mock trip data — swap with an API service later */
  trips: UserTrip[] = [
    {
      id: 'trip-1',
      destination: 'Paris, France',
      from: 'Cairo, Egypt',
      departureDate: '2026-07-15',
      returnDate: '2026-07-22',
      coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80',
      totalBudget: 5000,
      spentBudget: 3200,
      travelStyle: ['CULTURAL', 'FOODIE'],
      days: [],
      status: 'upcoming'
    },
    {
      id: 'trip-2',
      destination: 'Dubai, UAE',
      from: 'Cairo, Egypt',
      departureDate: '2026-06-01',
      returnDate: '2026-06-08',
      coverImage: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80',
      totalBudget: 8000,
      spentBudget: 7500,
      travelStyle: ['LUXURY', 'ADVENTURE'],
      days: [],
      status: 'completed'
    },
    {
      id: 'trip-3',
      destination: 'Rome, Italy',
      from: 'Cairo, Egypt',
      departureDate: '2026-08-10',
      returnDate: '2026-08-17',
      coverImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&q=80',
      totalBudget: 6000,
      spentBudget: 0,
      travelStyle: ['CULTURAL', 'FOODIE', 'NATURE'],
      days: [],
      status: 'upcoming'
    }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'upcoming':  return 'badge-upcoming';
      case 'ongoing':   return 'badge-ongoing';
      case 'completed': return 'badge-completed';
      default: return '';
    }
  }

  getBudgetPercent(trip: UserTrip): number {
    if (trip.totalBudget === 0) return 0;
    return Math.round((trip.spentBudget / trip.totalBudget) * 100);
  }

  getDaysCount(trip: UserTrip): number {
    const start = new Date(trip.departureDate);
    const end   = new Date(trip.returnDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  }

  formatDate(dateStr: string): string {
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  }
}
