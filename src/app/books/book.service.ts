import {Injectable} from '@angular/core';
import {Book} from './book';
import {Observable, Observer} from 'rxjs';
import {cloneDeep, assign} from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[];

  constructor() {
    this.books = [];
    this.books.push(Book.from('John Example', 'Some Book'));
    this.books.push(Book.from('Joe Smith', 'Another Book'));
  }

  findAll(): Observable<Book[]> {
    return new Observable((observer: Observer<Book[]>) => {
      observer.next(cloneDeep(this.books));
      observer.complete();
    });
  }

  findOne(id: number): Observable<Book> {
    let bookCopy: Book;
    const originalBook = this.books.find(book => book.id === id);
    if (originalBook) {
      bookCopy = cloneDeep(originalBook);
    }

    return new Observable((observer: Observer<Book>) => {
      if (bookCopy) {
        observer.next(bookCopy);
        observer.complete();
      } else {
        observer.error(`book with id: ${id} not found`);
      }
    });
  }

  save(bookToSave: Book): Observable<Book> {
    let savedBook: Book;
    if (bookToSave.id) {
      savedBook = this.books.find(book => book.id === bookToSave.id);
      if (savedBook) {
        assign(savedBook, bookToSave);
      }
    } else {
      savedBook = Book.from(bookToSave.authors, bookToSave.title);
      this.books.push(savedBook);
    }

    return this.findOne(savedBook.id);
  }
}
