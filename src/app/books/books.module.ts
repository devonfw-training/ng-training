import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookDetailsComponent} from './book-details/book-details.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [BookDetailsComponent, BookOverviewComponent],
  exports: [BookDetailsComponent, BookOverviewComponent]
})
export class BooksModule {
}
