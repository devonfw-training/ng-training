import { Component } from '@angular/core';
import { Book } from '../book';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../services/book.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  book$: Observable<Book>;
  private currentBookId;

  constructor(
    route: ActivatedRoute,
    private readonly router: Router,
    private readonly bookService: BookService) {
    this.book$ = route.data
      .pipe(
        map(data => data.book),
        tap(book => this.currentBookId = book && book.id)
      );
  }

  submit(newAuthor: string, newTitle: string) {
    this.bookService.saveOne({
      id: this.currentBookId,
      title: newTitle,
      author: newAuthor
    }).subscribe(() => this.router.navigate(['/books']));
  }
}
