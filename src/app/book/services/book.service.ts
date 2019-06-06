import { Injectable } from '@angular/core';
import { Book } from '../book';
import { Observable, of } from 'rxjs';
import { Subscriber } from 'rxjs/src/internal/Subscriber';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books: Book[] = [
    {
      id: 0,
      author: 'Douglas Crockford',
      title: 'JavaScript. The good parts'
    }, {
      id: 1,
      author: 'Kyle Simpson',
      title: 'You don\'t know JS'
    }];

  constructor() {
  }

  getAll(): Observable<Book[]> {
    return Observable.create((subscriber: Subscriber<Book[]>) => {
      setTimeout(() => {
        subscriber.next(this.books);
        subscriber.complete();
      }, 2000);
    });

    // return of(this.books);
  }
}
