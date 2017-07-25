import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { MoviesProvider } from "../../providers/movies.provider"
import { Trailer } from "../../models/trailer.model";

@Component({
  templateUrl: 'modal-page.html'
})
export class ModalPage {
  private id: string;
  private trailer: Trailer = new Trailer();
  private isLoad: boolean = false;
  private qualitesLength: number;

  constructor(
    public viewCtrl: ViewController,
    private params: NavParams,
    private moviesProvider: MoviesProvider
  ) {
    this.id = params.get('id');
    this.moviesProvider.getTrailer(this.id)
      .subscribe((data: Trailer) => {
      this.trailer = data;
      this.isLoad = true;
      this.qualitesLength = data.qualities.length
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  launchByQality(url) {
    this.trailer.videoURL = url
  }
}
