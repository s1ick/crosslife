export interface City {
  route?: string | any[] | null | undefined;
  icon?: string;
  label?: string; 
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

export interface MenuItem {
  id?: number; // Добавляем id (опционально, если не всегда используется)
  route?: string | any[] | null | undefined; // Опционально, если не используется для навигации

  labelRoute?: string; // Опционально
  label?: string; // Опционально
  icon: string;
}