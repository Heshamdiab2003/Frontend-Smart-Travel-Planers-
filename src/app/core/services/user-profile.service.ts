import { Injectable, signal, inject } from '@angular/core';
import { UserProfile } from '../models';
import { AuthService } from './auth.service';

const DEFAULT_PROFILE: UserProfile = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  country: '',
  currentPlan: 'Loading...'
};

/**
 * Owns the signed-in user's profile. Interacts with AuthService to fetch and update.
 */
@Injectable({ providedIn: 'root' })
export class UserProfileService {
  private readonly auth = inject(AuthService);
  private readonly _profile = signal<UserProfile>(DEFAULT_PROFILE);

  /** The current profile (read-only signal). */
  readonly profile = this._profile.asReadonly();

  loadFromApi(): void {
    this.auth.getCurrentUser().subscribe(dto => {
      if (dto) {
        this._profile.set({
          firstName: dto.firstName,
          lastName: dto.lastName,
          email: dto.email,
          phone: dto.phoneNumber || '',
          country: dto.country || '',
          currentPlan: dto.currentPlan,
          emailConfirmed: dto.emailConfirmed
        });
      }
    });
  }

  /** Persist a full profile update to backend. */
  update(profile: UserProfile): void {
    const next = { ...profile };
    this._profile.set(next);
    
    this.auth.updateProfile({
      firstName: next.firstName,
      lastName: next.lastName,
      phoneNumber: next.phone,
      country: next.country
    }).subscribe();
  }
}
