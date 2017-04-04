import {Resolve} from '@angular/router';
import {Book} from '../book';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {BookService} from '../book.service';

@Injectable()
export class BookOverviewResolver implements Resolve<Book[]> {
  constructor(private bookService: BookService) {
  }

  resolve(): Observable<Book[]> {
    return this.bookService.findAll();
  }
}
