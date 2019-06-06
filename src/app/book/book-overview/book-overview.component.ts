import { Component, OnInit } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit {
  books: Book[];
  selectedBook: Book;

  constructor() {
    this.books = [];
  }

  ngOnInit() {
    this.books.push({
      id: 0,
      author: 'Douglas Crockford',
      title: 'JavaScript. The good parts'
    });
    this.books.push({
      id: 1,
      author: 'Kyle Simpson',
      title: 'You don\'t know JS'
    });
  }

  selectBook(book: Book) {
    this.selectedBook = book;
    console.log(this.selectedBook);
  }

  isBookSelected(book: Book) {
    return this.selectedBook === book;
  }
}
