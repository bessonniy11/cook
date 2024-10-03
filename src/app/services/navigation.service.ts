import {inject, Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Location} from '@angular/common';
import {NavController, Platform} from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class NavigationService {
  router = inject(Router);
  location = inject(Location);
  navController = inject(NavController);
  platform = inject(Platform);
  data: any;


  constructor() {}

  public back(fullBack = false) {}

  public goTo(url: string, opt = {}, replaceUrl = false, data = {}) {
    this.data = data;
    return this.navController.navigateForward([url], {queryParams: opt, state: data, replaceUrl});
  }

}
