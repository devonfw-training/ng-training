import { TestBed, inject } from '@angular/core/testing';

import { BookService } from './book.service';
import { Book } from './book';

describe('BookService', () => {

  let bookService: BookService;

  beforeEach(() => {
    // reset the book static id sequencer in order to have a pure, initial state before each test
    Book.idSeq = 1;

    TestBed.configureTestingModule({
      providers: [BookService]
    });

    // service under tests retrieval
    bookService = TestBed.get(BookService);

    // service without dependencies creation alternative (TestBed unnecessary):
    // bookService = new BookService();
  });

  // service under tests retrieval alternative (through inject function)
  it('should find all books', inject([BookService], (service: BookService) => {
    // given
    const expectedNumberOfBooks = 2;

    // when
    service.findAll().subscribe({
      // then
      next: function (books) {
        expect(books).toBeDefined();
        expect(books.length).toBe(expectedNumberOfBooks);
      },
      error: () => fail('should find all books')
    });
  }));

  it('should save a book', inject([BookService], (service: BookService) => {
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
  }));

  it('should save a book and find it', inject([BookService], (service: BookService) => {
    // given
    const book = new Book();
    book.authors = 'Test Author';
    book.title = 'Test Title';
    service.save(book).subscribe({
      next: function (savedBook: Book) {
        expect(savedBook).toBeDefined();
        // when
        service.findOne(savedBook.id).subscribe({
          next: (foundBook: Book) => {
            // then
            expect(foundBook).toBeDefined();
            expect(foundBook.authors).toBe('Test Author');
            expect(foundBook.title).toBe('Test Title');
          },
          error: () => ('finding saved book should not fail')
        });
      },
      error: () => fail('saving book should not fail')
    });
  }));

  it('should update an existing book', () => {
    // given
    const existingBookId = 1;
    const expectedNumberOfBooks = 2;
    const bookToUpdate = new Book();
    bookToUpdate.id = existingBookId;
    bookToUpdate.authors = 'updated';
    bookToUpdate.title = 'updated';

    // when
    bookService.save(bookToUpdate).subscribe(
      // then
      book => {
        expect(book).toBeDefined();
        expect(book).toEqual(bookToUpdate);

        // check if number of books is correct after update
        bookService.findAll().subscribe(
          books => expect(books.length).toBe(expectedNumberOfBooks),
          error => fail('should find all books after update')
        );
      },
      error => fail('updating a book should not fail')
    )
  })

  it('should find a book', () => {
    // given
    const existingBookId = 1;

    // when
    bookService.findOne(existingBookId).subscribe(
      book => {
        // then
        expect(book).toBeDefined();
        expect(book.id).toBe(existingBookId);
      },
      error => fail(`book with id: ${existingBookId} should be found.`));
  });

  it('should throw an error when book not found', () => {
    // given
    const notExistingBookId = -1;

    // when
    bookService.findOne(notExistingBookId).subscribe(
      () => fail('should not find a book'),
      // then
      error => expect(error).toBe(`book with id: ${notExistingBookId} not found`)
    );
  });
});
