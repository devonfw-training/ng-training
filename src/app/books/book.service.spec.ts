import { TestBed } from '@angular/core/testing';
import { BookService } from './book.service';
import { Book } from './book';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('BookService', () => {

  let httpMock: HttpTestingController;
  let bookService: BookService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BookService]
    });

    httpMock = TestBed.get(HttpTestingController);
    bookService = TestBed.get(BookService);
  });

  it('should find all books', () => {
    // given
    const mockResponse = [
      {
        id: 1,
        title: 'title1',
        authors: 'authors1'
      },
      {
        id: 2,
        title: 'title2',
        authors: 'authors2'
      }
    ];

    // when
    bookService.findAll().subscribe({
      next: function (books) {
        // then
        expect(books).toBeDefined();
        expect(books.length).toBe(2);
        expect(books[0].title).toBe('title1');
        expect(books[1].title).toBe('title2');
      }
    });

    httpMock.expectOne('services/rest/books').flush(mockResponse);
  });

  it('should find single book', () => {
    // given
    const bookId = 1;
    const mockResponse = {
      id: bookId,
      title: 'title1',
      authors: 'authors1'
    };

    //when
    bookService.findOne(bookId).subscribe(book => {
      // then
      expect(book).toBeDefined();
      expect(book.id).toBe(bookId);
      expect(book.title).toBe(mockResponse.title);
      expect(book.authors).toBe(mockResponse.authors);
    });

    httpMock.expectOne(`services/rest/book/${bookId}`);
  });

  it('should save book', () => {
    // given
    const bookToSave = Book.from('authors', 'title');

    // when
    bookService.save(bookToSave).subscribe(book => {
      // then
      expect(book.authors).toBe(bookToSave.authors);
      expect(book.title).toBe(bookToSave.title);
    });

    httpMock.expectOne('services/rest/book');
  });

  afterEach(() => httpMock.verify());
});
