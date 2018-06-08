import {Injectable} from '@angular/core';
import {Book} from './book';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {assign, cloneDeep} from 'lodash';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<Book[]> {
    return this.http.get('services/rest/books').pipe(
      map((booksFromServer: BookFromBackend[]) => booksFromServer.map(this.fromBackend)),
      map((books: Book[]) => cloneDeep(books))
    );
  }

  findOne(id: number): Observable<Book> {
    return this.http.get('services/rest/book/' + id).pipe(
      map(this.fromBackend)
    );
  }

  save(bookToSave: Book): Observable<Book> {
    return this.http.post('services/rest/book', this.toBackend(bookToSave)).pipe(
      map(this.fromBackend)
    );
  }

  toBackend(book: Book): BookFromBackend {
    return {
      id: book.id,
      authors: book.authors,
      title: book.title
    };
  }

  fromBackend(bookfromBackend: BookFromBackend): Book {
    const book: Book = new Book();
    book.id = bookfromBackend.id;
    book.authors = bookfromBackend.authors;
    book.title = bookfromBackend.title;

    return book;
  }
}

interface BookFromBackend {
  id: number;
  authors: string;
  title: string;
}
