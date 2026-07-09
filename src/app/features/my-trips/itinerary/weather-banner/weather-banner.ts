import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weather } from '../../../../core/models';

/** Banner showing trip forecast list and packing tips. */
@Component({
  selector: 'app-weather-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-banner.html',
  styleUrl: './weather-banner.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WeatherBanner {
  @Input() weather: Weather | null | undefined = null;
  @Input() weatherList: Weather[] | null | undefined = null;
  @Input() destination: string | undefined = '';
  @Input() country: string | undefined = '';
  @Input() selectedDayIndex = 0;
  @Input() isGenerating = false;
  @Output() daySelected = new EventEmitter<number>();

  get currentSelectedWeather(): Weather | null {
    if (!this.weatherList || this.weatherList.length === 0) return null;
    return this.weatherList[this.selectedDayIndex] || this.weatherList[0];
  }

  get lastUpdatedTime(): string {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    return `${hours}:${minutes} ${ampm}`;
  }

  toFahrenheit(celsius: number): number {
    return Math.round((celsius * 9) / 5 + 32);
  }

  round(val: number | undefined): number {
    if (val === undefined) return 0;
    return Math.round(val);
  }

  selectDay(index: number): void {
    this.daySelected.emit(index);
  }

  getAiTip(w: Weather | null): string {
    if (!w) return '';
    const c = (w.condition || '').toLowerCase();
    const max = w.tempMax;
    const min = w.tempMin;
    
    if (c.includes('rain') || c.includes('drizzle') || c.includes('storm')) {
      return 'Rain expected. Bring an umbrella and plan indoor activities!';
    }
    if (c.includes('snow') || c.includes('ice') || c.includes('freeze')) {
      return 'Snowy/icy conditions. Bundle up and watch your step!';
    }
    if (max > 30) {
      return 'Hot day ahead! Stay hydrated, wear sunscreen, and seek shade during midday.';
    }
    if (min < 10) {
      return 'Chilly weather expected. Dress in warm layers and grab a warm beverage!';
    }
    if (c.includes('clear') || c.includes('sunny')) {
      return 'Beautiful clear skies! Ideal for outdoor sightseeing and photography.';
    }
    if (c.includes('cloud') || c.includes('overcast') || c.includes('mist')) {
      return 'Overcast skies today. Great weather for museums, cafes, and indoor tours.';
    }
    return 'Pleasant weather today. Perfect for walking around and exploring!';
  }

  /** Theme class derived from the weather condition string. */
  getWeatherClass(condition: string | undefined): string {
    if (!condition) return 'weather-default';
    const c = condition.toLowerCase();
    if (c.includes('sunny') || c.includes('hot') || c.includes('clear')) return 'weather-sunny';
    if (c.includes('cloud') || c.includes('overcast') || c.includes('mist')) return 'weather-cloudy';
    if (c.includes('rain') || c.includes('drizzle') || c.includes('storm')) return 'weather-rainy';
    return 'weather-default';
  }
}
