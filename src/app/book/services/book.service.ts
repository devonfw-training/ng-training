import { Injectable } from '@angular/core';
import { Book } from '../book';
import { Observable, of } from 'rxjs';
import { Subscriber } from 'rxjs/src/internal/Subscriber';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private seq = 0;

  private books: Book[] = [
    {
      id: this.seq++,
      author: 'Douglas Crockford',
      title: 'JavaScript. The good parts'
    }, {
      id: this.seq++,
      author: 'Kyle Simpson',
      title: 'You don\'t know JS'
    }];

  constructor() {
    console.log('from Constr');
  }

  getOne(bookId: number): Observable<Book | undefined> {
    const foundBook = this.books.find(
      book => book.id === bookId);
    return of(foundBook).pipe(delay(2000));
  }

  saveOne(book: Book): Observable<Book> {
    let updatedBook;
    const isNew = book.id == null;
    if (isNew) {
      const id = this.seq++;
      updatedBook = {...book, id};
      this.books.push(updatedBook);
    } else {
      this.books = this.books.map(
        currentBook => currentBook.id === book.id ? book : currentBook);
      updatedBook = book;
    }
    return of(updatedBook).pipe(delay(2000));
  }

  getAll(): Observable<Book[]> {
    return Observable.create((subscriber: Subscriber<Book[]>) => {
      setTimeout(() => {
        subscriber.next(this.books);
        subscriber.complete();
      }, 2000);
    });
    //
    // return of(this.books)
    //   .pipe(delay(2000));
  }
}
