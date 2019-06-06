import { Component } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../services/book.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  // book: Book;
  book$: Observable<Book>;
  private currentBookId;

  constructor(
    route: ActivatedRoute,
    private readonly bookService: BookService) {
    this.book$ = route.params
      .pipe(
        map(params => +params.bookId),
        switchMap(bookId => bookService.getOne(bookId)),
        tap(book => this.currentBookId = book.id)
      );
  }

  submit(newAuthor: string, newTitle: string) {
    console.log({
      id: this.currentBookId,
      title: newTitle,
      author: newAuthor
    });
  }
}
