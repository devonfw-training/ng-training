import {Resolve, ActivatedRouteSnapshot, Router} from '@angular/router';
import {Book} from '../book';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {BookService} from '../book.service';
import {Injectable} from '@angular/core';

@Injectable()
export class BookDetailsResolver implements Resolve<Book> {
  constructor(private bookService: BookService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Book> {
    const id = parseInt(route.params.id, 10);

    if (isNaN(id)) {
      return this.navigateToNewBookDialog();
    } else {
      return this.bookService.findOne(id).catch(() => {
        return this.navigateToNewBookDialog();
      });
    }
  }

  private navigateToNewBookDialog() {
    this.router.navigate(['/book-app/book']);
    return Observable.throw('Book could not be found');
  }
}
