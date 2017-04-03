import {Component, Input, EventEmitter, Output} from '@angular/core';
import {Book} from '../book';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  private _book: Book;

  @Output()
  bookUpdate: EventEmitter<Book> = new EventEmitter<Book>();

  @Input()
  set book(value: Book) {
    this._book = cloneDeep(value);
  }

  get book(): Book {
    return this._book;
  }

  apply(): void {
    this.bookUpdate.emit(this._book);
  }
}
