import {Component, OnInit} from '@angular/core';
import {Book} from '../book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  currentBook: Book;

  constructor() {
    this.currentBook = new Book();
  }

  ngOnInit() {
    this.currentBook.authors = 'John Example';
    this.currentBook.title = 'Example Book';
  }
}
