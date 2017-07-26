import { Pipe, PipeTransform } from '@angular/core';

import { Movie } from '../models/movie.model';

@Pipe({ name: 'isFavoritePipe' })
export class FavoritePipe implements PipeTransform {
  transform(movies: Movie[]) {
    if(movies) return movies.filter(m => m.isFavorite)
  }
}
