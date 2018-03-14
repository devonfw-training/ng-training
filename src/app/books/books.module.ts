import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './book-details/book-details.component';
import {BookOverviewComponent} from './book-overview/book-overview.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BookService} from './book.service';
import {BookDetailsResolver} from './book-details/book-details.resolver';
import {BookOverviewResolver} from './book-overview/book-overview.resolver';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [BookDetailsComponent, BookOverviewComponent],
  exports: [BookDetailsComponent, BookOverviewComponent],
  providers: [BookService, BookDetailsResolver, BookOverviewResolver]
})
export class BooksModule {
}
