import { TestBed, inject, async } from '@angular/core/testing';
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

    httpMock.verify();
  });
});
