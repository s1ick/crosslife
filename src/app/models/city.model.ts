export interface City {
  id: number;
  name: string;
  population: number;
  latitude: number;
  longitude: number;
  photoUrl: string;
  shortDescription: string;
  fullDescription: string;
  topEducationalInstitutions: Array<{
    name: string;
    rank: number;
    description: string;
  }>;
  topSportsVenues: Array<{
    name: string;
    capacity: number;
    description: string;
  }>;
  funFacts: string[];
  keyHistoricalEvents: Array<{
    year: number;
    event: string;
  }>;
  touristEvents: Array<{
    name: string;
    date: string;
    description: string;
  }>;
}
