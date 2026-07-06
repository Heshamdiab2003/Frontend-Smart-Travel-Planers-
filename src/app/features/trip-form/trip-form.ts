import { Component } from '@angular/core';
import { Navbar } from '../../layout/navbar/navbar';
import { TripPlannerForm } from '../../shared/trip-planner-form/trip-planner-form';

/**
 * Full-page trip planner (route `/plan`).
 *
 * A thin wrapper around the shared {@link TripPlannerForm}; the planning logic
 * lives entirely in that reusable component so the page, the landing embed, and
 * the navbar modal all stay in sync.
 */
@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [Navbar, TripPlannerForm],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.css',
})
export class TripFormPage {}
