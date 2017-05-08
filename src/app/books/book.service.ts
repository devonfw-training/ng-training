import {Injectable} from '@angular/core';
import {Book} from './book';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {assign, cloneDeep} from 'lodash';
import {Http, Response} from '@angular/http';

@Injectable()
export class BookService {

  constructor(private http: Http) {
  }

  findAll(): Observable<Book[]> {
    return this.http.get('services/rest/books')
      .map((response: Response) => response.json())
      .map((booksFromServer: BookFromBackend[]) => {
        const books = [];
        booksFromServer.forEach((currentBook: BookFromBackend) => {
          books.push(this.fromBackend(currentBook));
        });
        return cloneDeep(books);
      });
  }

  findOne(id: number): Observable<Book> {
    return this.http.get('services/rest/book/' + id)
      .map((response: Response) => response.json())
      .map((bookFromBackend: BookFromBackend) => this.fromBackend(bookFromBackend));
  }

  save(bookToSave: Book): Observable<Book> {
    return this.http.post('services/rest/book', this.toBackend(bookToSave))
      .map((response: Response) => response.json())
      .map((bookFromBackend: BookFromBackend) => this.fromBackend(bookFromBackend));
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
