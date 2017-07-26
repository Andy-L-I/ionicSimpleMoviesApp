interface Director {
  id: string;
  name: string;
}

export class Movie {
  idIMDB: string;
  title: string;
  trailer: string;
  rating: string;
  countries: string[];
  urlPoster: string;
  year: string;
  directors: Director[];
  isFavorite: boolean;
}

