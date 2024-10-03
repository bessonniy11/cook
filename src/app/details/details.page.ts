import {Component, inject, Input, OnInit, signal, WritableSignal} from '@angular/core';
import {CommonModule, CurrencyPipe, DatePipe, NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonAlert,
  IonAvatar, IonBackButton, IonBadge, IonButtons, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle,
  IonContent,
  IonHeader, IonIcon, IonInfiniteScroll, IonInfiniteScrollContent,
  IonItem, IonLabel,
  IonList,
  IonSkeletonText, IonText,
  IonTitle,
  IonToolbar,
  IonCard
} from '@ionic/angular/standalone';
import {MovieService} from '../services/movie.service';
import {MovieResult} from '../services/interfaces';
import {cashOutline, calendarOutline} from "ionicons/icons";
import {addIcons} from "ionicons";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonText,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonItem,
    IonSkeletonText,
    IonAvatar,
    NgIf,
    NgFor,
    IonAlert,
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    CurrencyPipe,
    DatePipe
  ],
})
export class DetailsPage implements OnInit {
  movieService = inject(MovieService);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set id(movieId: string) {
    this.movieService.getMovieDetails(movieId).subscribe((movie) => {
      console.log('movie', movie);
      this.movie.set(movie);
    })
  }

  constructor() {
    addIcons({cashOutline, calendarOutline});
  }

  ngOnInit() {
  }

}
