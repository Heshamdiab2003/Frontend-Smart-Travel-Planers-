import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError, timer, forkJoin } from 'rxjs';
import { catchError, concatMap, first, take, map, switchMap } from 'rxjs/operators';
import { TripCreateDto, TripPlanDto, UserTrip } from '../models';
import { mapTripPlanDtoToUserTrip } from '../../features/my-trips/travel-plan/travel-plan';

const CHAT_API_BASE = '/api/Chat';
const TRIP_API_BASE = '/api/Trip';

@Injectable({ providedIn: 'root' })
export class TripService {
  private readonly http = inject(HttpClient);

  /**
   * جيب كل trips اليوزر من الـ API عن طريق الـ tripIds
   * المحفوظة في localStorage من الـ sessions.
   */
  getAllFromApi(): Observable<UserTrip[]> {
    const stored = localStorage.getItem('userTripIds');
    const tripIds: string[] = stored ? JSON.parse(stored) : [];

    if (tripIds.length === 0) return of([]);

    const requests = tripIds.map(id =>
      this.getPlan(id).pipe(
        map(dto => mapTripPlanDtoToUserTrip(dto)),
        catchError(() => of(null))
      )
    );

    return forkJoin(requests).pipe(
      map(results => results.filter((t): t is UserTrip => t !== null))
    );
  }

  createQuickPlan(dto: TripCreateDto): Observable<{ tripId?: string; message?: string }> {
    return this.http.post<{ tripId?: string; message?: string }>(
      `${TRIP_API_BASE}/quick-plan`,
      dto,
    );
  }

  getPlan(tripId: string): Observable<TripPlanDto> {
    return this.http.get<TripPlanDto>(`${CHAT_API_BASE}/plan/${tripId}`);
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
}