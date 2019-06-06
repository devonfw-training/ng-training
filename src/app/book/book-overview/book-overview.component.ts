import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit, OnDestroy {
  books: Book[];

  private subscription;

  constructor(private readonly bookService: BookService,
              private readonly router: Router) {
    this.books = [];
  }

  ngOnInit() {
    this.subscription = this.bookService.getAll()
      .subscribe(books => this.books = books);
  }

  goToBookDetails(book: Book) {
    this.router.navigate(['/book', book.id]);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
