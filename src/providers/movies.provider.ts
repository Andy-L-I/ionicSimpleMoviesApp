import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { ApiProvider } from './api.provider';
import { Movie } from '../models/movie.model';

@Injectable()
export class MoviesProvider {

  constructor(private apiProvider: ApiProvider) {
  }

  getTopBunch(count: number): Observable<[Movie]> {
    return this.apiProvider.get('imdb/top', `end=${count}`)
      .map(data => data.data.movies);
  }

  getTrailer(id) {
    let p = `idIMDB=${id}&trailers=1`;
    return this.apiProvider.get('imdb/idIMDB', p).map(data => data.data.movies[0].trailer)
  }

}
