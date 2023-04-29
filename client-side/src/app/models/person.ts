export interface Film {
  title: string;
  episode_id: number;
  director: string;
  release_date: string;
}

export interface Person {
  id: number;
  name: string;
  birth_year: string;
  gender: string;
  height: number;
  weight: number;
  films: Film[];
}
