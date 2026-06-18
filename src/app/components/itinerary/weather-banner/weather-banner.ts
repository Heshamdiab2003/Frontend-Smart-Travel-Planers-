import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Weather } from '../../../interfaces/weather';

@Component({
  selector: 'app-weather-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather-banner.html',
  styleUrl: './weather-banner.css'
})
export class WeatherBanner {
  @Input() weather: Weather | null | undefined = null;

  getWeatherClass(condition: string): string {
    if (!condition) return 'weather-default';
    const c = condition.toLowerCase();
    if (c.includes('sunny') || c.includes('hot')) return 'weather-sunny';
    if (c.includes('cloud')) return 'weather-cloudy';
    if (c.includes('rain')) return 'weather-rainy';
    return 'weather-default';
  }
}
