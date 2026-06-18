import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlightInfo } from '../../../interfaces/flight-info';

@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './flight.html',
  styleUrl: './flight.css'
})
export class Flight {
  @Input() flight: FlightInfo | null | undefined = null;
}
