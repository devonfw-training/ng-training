import { TestBed, inject, async } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { BookService } from './book.service';
import { Book } from './book';
import {
  BaseRequestOptions, HttpModule, Http, Response, ResponseOptions
} from '@angular/http';

describe('BookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [BookService,
        {
          provide: Http,
          useFactory: (mockBackend: MockBackend, options: BaseRequestOptions) => {
            return new Http(mockBackend, options);
          },
          deps: [MockBackend, BaseRequestOptions]
        },
        MockBackend,
        BaseRequestOptions]
    });
  });

  it('should find all books', async(inject([BookService, MockBackend], (service: BookService, mockBackend: MockBackend) => {
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

    mockBackend.connections.subscribe((connection: any) => {
      connection.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify(mockResponse)
      })));
    });

    // when
    service.findAll().subscribe({
      next: function (books) {
        // then
        expect(books).toBeDefined();
        expect(books.length).toBe(2);
      }
    });
  })));

  it('should save a book', async(inject([BookService], (service: BookService) => {
    // given
    const book = new Book();
    book.authors = 'Test Author';
    book.title = 'Test Title';
    // when
    service.save(book).subscribe({
      next: function (savedBook: Book) {
        // then
        expect(savedBook).toBeDefined();
        expect(savedBook.authors).toBe('Test Author');
        expect(savedBook.title).toBe('Test Title');
      }
    });
  })));

  it('should save a book and find it', async(inject([BookService], (service: BookService) => {
    // given
    const book = new Book();
    book.authors = 'Test Author';
    book.title = 'Test Title';
    service.save(book).subscribe({
      next: function (savedBook: Book) {
        expect(savedBook).toBeDefined();
        // when
        service.findOne(savedBook.id).subscribe({
          next: function (foundBook: Book) {
            // then
            expect(foundBook).toBeDefined();
            expect(foundBook.authors).toBe('Test Author');
            expect(foundBook.title).toBe('Test Title');
          }
        });
      }
    });
  })));
});
