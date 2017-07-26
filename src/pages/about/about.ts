import {Component, OnInit, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Chart } from 'chart.js';
import { Storage } from '@ionic/storage';
import { MoviesProvider } from '../../providers/movies.provider';
import { Movie } from "../../models/movie.model";

class ChartDataItem {
  label: string;
  count: number;
  constructor(label, count) {
    this.label = label;
    this.count = count;
  }
}

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})

export class AboutPage implements OnInit {

  @ViewChild('doughnutCanvas') doughnutCanvas;
  doughnutChart: any;

  private movies: Movie[];
  private isLoad: boolean = false;

  private chartData: ChartDataItem[] = [];
  private chartLabels: string[] = [];

  constructor(
    public navCtrl: NavController,
    private moviesProvider: MoviesProvider,
    private storage: Storage
    ) {}

  ngOnInit() {
    return  Promise.resolve()
      .then(() =>
        this.storage.get('top20').then((data) => {
          if (data != null) {
            this.movies = JSON.parse(data);
            this.isLoad = true
          }
          else this.getBunch();
        })
      )
      .then(() =>
          this.movies.forEach((i: Movie) => {
            let p = i.year.slice(0, -1) + '0s';
            if (this.chartLabels.indexOf(p) == -1) {
              this.chartLabels.push(p);
              this.chartData.push(new ChartDataItem(p, 1))
            } else {
              let c = this.chartData.filter((i) => i.label === p);
              c[0].count += 1;
            }
          })
      )
      .then(() => this.cahartBuild())
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

  cahartBuild() {
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
    type: 'doughnut',
    data: {
      labels: this.chartLabels,
      datasets: [{
        label: '# of Votes',
        data: this.getCount(),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#FF6384",
          "#36A2EB",
          "#FFCE56"
        ]
      }]
    }
    });
  }

  getCount() {
    let a: number[] = [];
    this.chartData.forEach((i) => a.push(i.count));
    return a;
  }

}
