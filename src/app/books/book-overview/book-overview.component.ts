import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {Book} from '../book';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {
  public books: Book[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.books = [];
  }

  selectBook(book: Book): void {
    this.router.navigate(['/book-app/book', book.id]);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: { books: Book[] }) => {
      this.books = data.books;
    });
  }
}
