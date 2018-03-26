import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Book } from '../book';
import { Observable } from 'rxjs/Observable';
import { BookService } from '../book.service';
import { Injectable } from '@angular/core';
import { _throw } from 'rxjs/observable/throw';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BookDetailsResolver implements Resolve<Book> {
  constructor(private bookService: BookService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const id = parseInt(route.params.id, 10);

    if (isNaN(id)) {
      return this.navigateToNewBookDialog();
    } else {
      return this.bookService.findOne(id).pipe(
        catchError(() => {
          return this.navigateToNewBookDialog();
        })
      );
    }
  }

  private navigateToNewBookDialog() {
    this.router.navigate(['/book-app/book']);
    return _throw('Book could not be found');
  }
}
