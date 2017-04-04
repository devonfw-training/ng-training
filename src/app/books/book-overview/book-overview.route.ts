import {Route} from '@angular/router';
import {BookOverviewComponent} from './book-overview.component';
import {BookOverviewResolver} from './book-overview.resolver';

export const bookOverviewRoute: Route = {
  path: 'books',
  component: BookOverviewComponent,
  resolve: {
    books: BookOverviewResolver
  }
};
