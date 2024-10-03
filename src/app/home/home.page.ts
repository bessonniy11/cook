import {Component, CUSTOM_ELEMENTS_SCHEMA, inject} from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  InfiniteScrollCustomEvent,
  IonList,
  IonItem,
  IonSkeletonText,
  IonAvatar,
  IonAlert, IonLabel, IonBadge, IonInfiniteScroll, IonInfiniteScrollContent
} from '@ionic/angular/standalone';
import {MovieService} from '../services/movie.service';
import {catchError, finalize} from 'rxjs/operators';
import {MovieResult} from '../services/interfaces';
import {DatePipe, NgFor, NgIf} from '@angular/common';
import {NavigationService} from '../services/navigation.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonSkeletonText,
    IonAvatar,
    NgIf,
    NgFor,
    IonAlert,
    IonLabel,
    DatePipe,
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage {
  movieService = inject(MovieService);
  navigationService = inject(NavigationService);
  currentPage = 1;
  error: null | string = null;
  isLoading = false;
  moves: MovieResult[] = [];
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  public dummyArray = new Array(10);

  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;

    if (!event) {
      this.isLoading = true;
    }

    this.movieService.getTopRatedMovies(this.currentPage).pipe(
      finalize(() => {
        this.isLoading = false;
        if (event) {
          event.target.complete();
        }
      }),
      catchError((err: any) => {
        console.log('err', err);
        this.error = err.error.status_message;
        return [];
      })
    ).subscribe({
      next: (res) => {
        console.log('res', res);
        this.moves.push(...res.results);
        if (event) {
          event.target.disabled = res.total_pages === this.currentPage;
        }
      }
    })
  }

  trackByFn(index: number, item: any): number {
    return index; // Используем индекс как уникальный ключ
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

  goToDetail(item: any) {
    console.log('item', item);
    this.navigationService.goTo(`/details/${item.id}`);
  }
}
