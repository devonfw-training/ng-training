import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookDetailsComponent } from './book-details/book-details.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [BookDetailsComponent, BookOverviewComponent],
  exports: [
    BookDetailsComponent, BookOverviewComponent
  ],
  imports: [
    CommonModule, RouterModule
  ]
})
export class BookModule {
}
