import {Component, OnInit} from '@angular/core';
import { NavController , Platform} from 'ionic-angular';
import { ModalController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { MoviesProvider } from '../../providers/movies.provider';
import { Movie } from "../../models/movie.model";
import { ModalPage } from "../modal/modal-page";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  private movies: Movie[];
  private resUrl: string = 'http://www.imdb.com';
  private isLoad: boolean = false;

  constructor(
    public navCtrl: NavController,
    private moviesProvider: MoviesProvider,
    private platform: Platform,
    private storage: Storage,
    private modalCtrl: ModalController
  ) {
    this.platform = platform;
  }

  ngOnInit() {
    this.storage.get('top20').then((data) => {
      if (data != null) {
        this.movies = JSON.parse(data);
        this.isLoad = true
      }
      else this.getBunch();
    })
  }

  getBunch() {
    this.moviesProvider.getTopBunch(20)
      .subscribe(data =>
        {
          this.movies = data;
          this.storage.set('top20',JSON.stringify(data));
        },
        () => {

        },
        () => {
          this.isLoad = true;
        });
  }

  launch(id) {
    window.open(this.resUrl +'/name/' + id, '_system', 'location=yes');
    return false
  }

  openTrailerModal(id) {
    let videoModal = this.modalCtrl.create(ModalPage, { 'id': id });
    videoModal.present();
  }

  toggleFavorite(m: Movie) {
    m.isFavorite = !m.isFavorite;
    this.storage.set('top20',JSON.stringify(this.movies));
  }

}
