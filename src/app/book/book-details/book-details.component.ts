import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Book } from '../book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent {
  @Input()
  book: Book;

  @Output()
  bookChange = new EventEmitter<Book>();

  submit(newAuthor: string, newTitle: string) {
    this.bookChange.emit({
      ...this.book,
      title: newTitle,
      author: newAuthor
    });
  }
}
