import {Routes} from '@angular/router';
import {bookDetailsRoute, newBookRoute} from './books/book-details/book-details.route';
import {bookOverviewRoute} from './books/book-overview/book-overview.route';

export const appRoutes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: '/book-app/books'
  },
  {
    path: 'book-app',
    children: [
      bookOverviewRoute,
      bookDetailsRoute,
      newBookRoute
    ]
  }];
