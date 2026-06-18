import { Activity } from './activity';
import { Weather } from './weather';

export interface DayPlan {
  dayNumber: number;
  date: string;
  title: string;
  activities: Activity[];
  weather?: Weather;
}
