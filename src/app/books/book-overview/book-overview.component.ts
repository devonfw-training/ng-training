import {Component, OnInit} from '@angular/core';
import {Book} from '../book';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {
  public books: Book[];
  public selectedBook: Book;

  constructor() {
    this.books = [];
  }

  isBookSelected(book: Book): boolean {
    return this.selectedBook === book;
  }

  selectBook(book: Book): void {
    this.selectedBook = book;
  }

  ngOnInit() {
    this.books.push(Book.from('John Example', 'Some Book'));
    this.books.push(Book.from('Joe Smith', 'Another Book'));
  }

}
