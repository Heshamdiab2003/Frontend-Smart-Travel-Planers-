import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, timer, forkJoin } from 'rxjs';
import { catchError, concatMap, first, take, map, switchMap } from 'rxjs/operators';
import {
  ConfirmDestinationResponse,
  ResolveDestinationResponse,
  TripCreateDto,
  TripPlanDto,
  TripStatus,
  UserTrip,
  TripSummaryDto,
} from '../models';
import { mapTripPlanDtoToUserTrip } from '../../features/my-trips/travel-plan/travel-plan';
import { ENDPOINTS } from '../config/endpoints';

/** Narrows an arbitrary backend status string to the app's `TripStatus`. */
function toTripStatus(raw: string | null | undefined): TripStatus {
  switch ((raw ?? '').toLowerCase()) {
    case 'upcoming':
      return 'upcoming';
    case 'completed':
      return 'completed';
    case 'ongoing':
    default:
      return 'ongoing';
  }
}

@Injectable({ providedIn: 'root' })
export class TripService {
  private readonly http = inject(HttpClient);

  /**
   * Fetch all trips for the authenticated user from the backend.
   */
  getAllFromApi(): Observable<UserTrip[]> {
    return this.http.get<TripSummaryDto[]>(ENDPOINTS.trip.base).pipe(
      map(dtos => dtos.map(dto => ({
        id: dto.id,
        destination: dto.destination,
        country: dto.country || '',
        from: dto.originCity,
        departureDate: dto.startDate,
        returnDate: dto.endDate,
        coverImage: dto.coverImage || 'assets/images/default-trip.jpg', // Provide a fallback cover image
        totalBudget: dto.budgetTotal,
        spentBudget: dto.budgetSpent,
        travelStyle: dto.travelStyle,
        days: [], // Day details are not fetched in the summary
        status: toTripStatus(dto.status),
      } as UserTrip)))
    );
  }

  createQuickPlan(dto: TripCreateDto): Observable<{ tripId?: string; message?: string }> {
    return this.http.post<{ tripId?: string; message?: string }>(
      ENDPOINTS.trip.quickPlan,
      dto,
    );
  }

  getPlan(tripId: string): Observable<TripPlanDto> {
    return this.http.get<TripPlanDto>(ENDPOINTS.chat.plan(tripId));
  }

  pollPlan(tripId: string, intervalMs = 3000, maxAttempts = 20): Observable<TripPlanDto> {
    return timer(0, intervalMs).pipe(
      take(maxAttempts),
      concatMap(() =>
        this.getPlan(tripId).pipe(
          catchError((err: HttpErrorResponse) =>
            err.status === 404 ? of(null) : throwError(() => err),
          ),
        ),
      ),
      first((plan): plan is TripPlanDto => !!plan && plan.days.length > 0),
    );
  }

  resolveDestination(query: string): Observable<ResolveDestinationResponse> {
    return this.http.post<ResolveDestinationResponse>(ENDPOINTS.places.resolve, { query });
  }

  confirmDestination(destId: string, resolvedName: string): Observable<ConfirmDestinationResponse> {
    return this.http.post<ConfirmDestinationResponse>(ENDPOINTS.places.confirm, { destId, resolvedName });
  }
}