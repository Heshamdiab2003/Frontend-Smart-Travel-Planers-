import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass, TitleCasePipe, DecimalPipe } from '@angular/common';
import { UserTrip } from '../../core/models';
import { TripService } from '../../core/services/trip.service';
import { ChatService } from '../../core/services/chat.service';
import { UnsplashService } from '../../core/services/unsplash.service';

const DAY_MS = 1000 * 60 * 60 * 24;

@Component({
  selector: 'app-my-trips',
  standalone: true,
  imports: [RouterLink, NgClass, TitleCasePipe, DecimalPipe],
  templateUrl: './my-trips.html',
  styleUrl: './my-trips.css',
})
export class MyTripsPage implements OnInit {
  private readonly tripService = inject(TripService);
  private readonly chatService = inject(ChatService);
  private readonly unsplash = inject(UnsplashService);

  readonly trips = signal<UserTrip[]>([]);
  readonly isLoading = signal(true);

  ngOnInit(): void {
    this.chatService.loadUserSessions().subscribe({
      next: () => this.loadTrips(),
      error: () => this.loadTrips(),
    });
  }

  private loadTrips(): void {
    this.tripService.getAllFromApi().subscribe({
      next: async (trips) => {
        const deleted = this.getDeletedIds();
        const filtered = trips.filter(t => !deleted.includes(t.id));

        // Fetch Unsplash photos for all trips in parallel
        const withImages = await Promise.all(
          filtered.map(async (trip) => {
            const coverImage = await this.unsplash.getDestinationPhoto(trip.destination);
            return { ...trip, coverImage };
          })
        );

        this.trips.set(withImages);
        this.isLoading.set(false);
      },
      error: () => {
        this.trips.set([]);
        this.isLoading.set(false);
      },
    });
  }

  removeTrip(tripId: string, event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    const deleted = this.getDeletedIds();
    if (!deleted.includes(tripId)) {
      deleted.push(tripId);
      localStorage.setItem('deletedTripIds', JSON.stringify(deleted));
    }
    this.trips.update(list => list.filter(t => t.id !== tripId));
  }

  private getDeletedIds(): string[] {
    const stored = localStorage.getItem('deletedTripIds');
    return stored ? JSON.parse(stored) : [];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'upcoming': return 'badge-upcoming';
      case 'ongoing': return 'badge-ongoing';
      case 'completed': return 'badge-completed';
      default: return '';
    }
  }

  getBudgetPercent(trip: UserTrip): number {
    if (trip.totalBudget === 0) return 0;
    return Math.round((trip.spentBudget / trip.totalBudget) * 100);
  }

  getDaysCount(trip: UserTrip): number {
    const start = new Date(trip.departureDate).getTime();
    const end = new Date(trip.returnDate).getTime();
    return Math.max(0, Math.ceil((end - start) / DAY_MS));
  }

  formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}