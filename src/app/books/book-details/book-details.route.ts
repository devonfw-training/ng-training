import {Route} from '@angular/router';
import {BookDetailsComponent} from './book-details.component';
import {BookDetailsResolver} from './book-details.resolver';

export const bookDetailsRoute: Route = {
  path: 'book/:id',
  component: BookDetailsComponent,
  resolve: {
    book: BookDetailsResolver
  }
};

export const newBookRoute: Route = {
  path: 'book',
  component: BookDetailsComponent
};
