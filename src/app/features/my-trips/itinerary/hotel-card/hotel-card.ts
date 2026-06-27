import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelInfo } from '../../../../core/models';

/** Compact summary card for a trip's accommodation. */
@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hotel-card.html',
  styleUrl: './hotel-card.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelCard {
  @Input() hotel: HotelInfo | null | undefined = null;

  /** Array sized to the (0–5 clamped) star rating, for rendering star icons. */
  getStars(count: number): number[] {
    return Array.from({ length: Math.min(5, Math.max(0, count || 0)) });
  }

  /** Format ISO/date string to readable format e.g. "Aug 10, 2026" */
  formatDate(dateStr: string): string {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }
}