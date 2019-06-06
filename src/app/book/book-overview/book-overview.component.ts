import { Component, OnDestroy, OnInit } from '@angular/core';
import { Book } from '../book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit, OnDestroy {
  books: Book[];
  selectedBook: Book;

  private subscription;

  constructor(private readonly bookService: BookService) {
    this.books = [];
  }

  ngOnInit() {
    this.subscription = this.bookService.getAll()
      .subscribe(books => this.books = books);
  }

  selectBook(book: Book) {
    this.selectedBook = book;
    console.log(this.selectedBook);
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }

  updateBook(newBook: Book) {
    this.selectedBook = newBook;
    this.books = this.books
      .map(
        book => book.id === newBook.id ? newBook : book);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
