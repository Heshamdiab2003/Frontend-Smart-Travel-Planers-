import { Component, OnInit, signal, computed, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserTrip } from '../../interfaces/user-trip';
import { DayPlan } from '../../interfaces/day-plan';
import { Activity } from '../../interfaces/activity';
import { MOCK_TRIP_PLAN } from '../../data/mock-trip.data';

// Child components import (no "component" in filenames)
import { Flight } from '../../components/itinerary/flight/flight';
import { Hotel } from '../../components/itinerary/hotel/hotel';
import { WeatherBanner } from '../../components/itinerary/weather-banner/weather-banner';
import { InteractiveMap } from '../../components/itinerary/interactive-map/interactive-map';

@Component({
  selector: 'app-travel-plan-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    Flight,
    Hotel,
    WeatherBanner,
    InteractiveMap
  ],
  templateUrl: './travel-plan-page.html',
  styleUrl: './travel-plan-page.css'
})
export class TravelPlanPage implements OnInit {
  trip = signal<UserTrip | null>(null);
  selectedDayIndex = signal<number>(0);
  isBrowser: boolean;

  currentDayPlan = computed(() => {
    const t = this.trip();
    if (!t || !t.days || t.days.length === 0) return null;
    return t.days[this.selectedDayIndex()] || null;
  });

  currentDayActivities = computed(() => {
    return this.currentDayPlan()?.activities || [];
  });

  currentDayWeather = computed(() => {
    return this.currentDayPlan()?.weather || null;
  });

  constructor(
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Read trip ID from route param. Since it is a sandbox demo, we default to our MOCK_TRIP_PLAN.
    const id = this.route.snapshot.paramMap.get('id');
    // Simulate loading data
    setTimeout(() => {
      this.trip.set(MOCK_TRIP_PLAN);
    }, 100);
  }

  selectDay(index: number): void {
    this.selectedDayIndex.set(index);
  }

  getCategoryClass(category: string): string {
    if (!category) return 'cat-attraction';
    const map: Record<string, string> = {
      food: 'cat-food',
      attraction: 'cat-attraction',
      leisure: 'cat-leisure',
      hotel: 'cat-hotel',
      transport: 'cat-transport',
    };
    return map[category] ?? 'cat-attraction';
  }

  async exportToPDF(): Promise<void> {
    if (!this.isBrowser) return;

    const t = this.trip();
    if (!t) return;

    try {
      // Dynamically load jsPDF to prevent Server Side Rendering issues
      const { default: jsPDF } = await import('jspdf');
      
      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      // Styling parameters
      const primaryColor = [181, 67, 4]; // #B54304
      const darkColor = [38, 24, 20]; // #261814
      const mutedColor = [107, 107, 107]; // #6B6B6B

      // Page Title
      doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.rect(0, 0, 210, 40, 'F');

      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(22);
      doc.text(`SMART TRAVEL ITINERARY`, 20, 18);

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(13);
      doc.text(`${t.destination}, ${t.country} — ${t.departureDate} to ${t.returnDate}`, 20, 28);

      let yOffset = 55;

      // Flight & Hotel details summary section
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(14);
      doc.text('Summary Information', 20, yOffset);
      yOffset += 8;

      doc.setDrawColor(232, 221, 214);
      doc.line(20, yOffset - 3, 190, yOffset - 3);

      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(10);

      if (t.flight) {
        doc.setFont('Helvetica', 'bold');
        doc.text('Flight Details:', 20, yOffset);
        doc.setFont('Helvetica', 'normal');
        doc.text(`${t.flight.airline} (${t.flight.flightNumber}) | ${t.flight.departure} -> ${t.flight.arrival} | ${t.flight.departureTime} - ${t.flight.arrivalTime}`, 25, yOffset + 5);
        yOffset += 13;
      }

      if (t.hotel) {
        doc.setFont('Helvetica', 'bold');
        doc.text('Hotel Stay:', 20, yOffset);
        doc.setFont('Helvetica', 'normal');
        doc.text(`${t.hotel.name} | ${t.hotel.address} | Rating: ${t.hotel.rating}/10`, 25, yOffset + 5);
        yOffset += 15;
      }

      // Add Days
      t.days.forEach((day, index) => {
        // Page boundary check
        if (yOffset > 240) {
          doc.addPage();
          yOffset = 25;
        }

        doc.setFillColor(248, 244, 238); // Cream bg for day heading
        doc.rect(20, yOffset, 170, 10, 'F');

        doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(11);
        doc.text(`Day ${day.dayNumber}: ${day.title} (${day.date})`, 24, yOffset + 6.5);
        yOffset += 16;

        day.activities.forEach((act) => {
          if (yOffset > 270) {
            doc.addPage();
            yOffset = 25;
          }

          // Activity marker time
          doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
          doc.setFont('Helvetica', 'bold');
          doc.setFontSize(9.5);
          doc.text(act.time, 20, yOffset);

          // Activity title & description
          doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
          doc.text(`${act.icon} ${act.locationName}`, 42, yOffset);

          doc.setTextColor(mutedColor[0], mutedColor[1], mutedColor[2]);
          doc.setFont('Helvetica', 'normal');
          doc.setFontSize(8.5);
          const descLines = doc.splitTextToSize(act.description, 140);
          doc.text(descLines, 42, yOffset + 4.5);
          
          yOffset += (descLines.length * 4.5) + 6;
        });

        yOffset += 6;
      });

      doc.save(`Itinerary_${t.destination.replace(/\s+/g, '_')}.pdf`);
    } catch (error) {
      console.error('Failed to export PDF:', error);
    }
  }
}
