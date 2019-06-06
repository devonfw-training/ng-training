import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Book } from '../book';
import { Injectable } from '@angular/core';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class BookDetailsResolver implements Resolve<Book> {
  constructor(private readonly bookService: BookService) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<Book> {
    const bookId = +route.params.bookId;
    return this.bookService.getOne(bookId);
  }
}
