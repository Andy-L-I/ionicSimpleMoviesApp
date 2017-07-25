import { Injectable } from '@angular/core';
import { Http, RequestOptions, URLSearchParams, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class ApiProvider {
  token: string = '1d6dee1b-6bd0-4b59-a088-89616fefefdb';
  url: string = `http://www.myapifilms.com`;


  constructor(public http: Http) {
  }

  get(endpoint: string, params?: any, options?: RequestOptions): Observable<any> {
    if (!options) {
      options = new RequestOptions();
    }

    // Support easy query params for GET requests
    if (params) {
      let p = new URLSearchParams();
      for (let k in params) {
        p.set(k, params[k]);
      }
      // Set the search field if we have params and don't already have
      // a search field set in options.
      options.search = !options.search && p || options.search;
    }

    return this.http.get(this.url + '/' + endpoint  +'?'+ params +`&token=${this.token}&format=json&data=1`)
      .map((res: Response) => res.json());
  }
}
