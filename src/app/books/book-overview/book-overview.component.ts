import {Component, OnInit} from '@angular/core';
import {Book} from '../book';
import {assign} from 'lodash';

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

  onBookUpdate(updatedBook: Book): void {
    const booksToUpdate = this.books.filter(function (currentBook: Book) {
      return currentBook.id === updatedBook.id;
    });
    if (booksToUpdate && booksToUpdate.length > 0) {
      const bookToUpdate = booksToUpdate[0];
      assign(bookToUpdate, updatedBook);
    }
  }

  ngOnInit() {
    this.books.push(Book.from('John Example', 'Some Book'));
    this.books.push(Book.from('Joe Smith', 'Another Book'));
  }

}
