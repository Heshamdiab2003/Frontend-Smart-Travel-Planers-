export interface Activity {
  time: string;
  title: string;
  locationName: string;
  lat: number;
  lng: number;
  description: string;
  type: 'sightseeing' | 'food' | 'transport' | 'hotel' | 'activity';
  category: 'food' | 'attraction' | 'hotel' | 'transport' | 'leisure';
  icon: string;
  cost?: number;
}
