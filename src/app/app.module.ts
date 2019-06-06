import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BookModule } from './book/book.module';
import { ResolveEnd, ResolveStart, Router, RouterModule } from '@angular/router';
import { BookOverviewComponent } from './book/book-overview/book-overview.component';
import { BookDetailsComponent } from './book/book-details/book-details.component';
import { BookDetailsResolver } from './book/services/book-details.resolver';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BookModule,
    RouterModule.forRoot([
      {path: '', pathMatch: 'full', redirectTo: '/books'},
      {
        path: 'books',
        component: BookOverviewComponent
      },
      {
        path: 'book',
        component: BookDetailsComponent
      },
      {
        path: 'book/:bookId',
        component: BookDetailsComponent,
        resolve: {
          book: BookDetailsResolver
        }
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) {
    router.events.subscribe(event => {
      if (event instanceof ResolveStart) {
        console.log('ResolveStart');
      }
      if (event instanceof ResolveEnd) {
        console.log('ResolveEnd');
      }
    });
  }
}
