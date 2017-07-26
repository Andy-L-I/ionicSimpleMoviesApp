import {Component, OnInit} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Movie } from "../../models/movie.model";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {
  private movies: Movie[];
  private isLoad: boolean = false;

  constructor(
    public navCtrl: NavController,
    private storage: Storage
  ) {
  }

  ngOnInit() {
    this.storage.get('top20').then((data) => {
      if (data != null) {
        return Promise.resolve()
          .then(() =>   this.movies = JSON.parse(data))
          .then(() =>   this.isLoad = true)
      }
    })
  }

  toggleFavorite(m: Movie) {
    m.isFavorite = !m.isFavorite;
    this.movies = this.movies.splice(this.movies.indexOf(m), 1);
  }

}
