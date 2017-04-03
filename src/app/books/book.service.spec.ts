import {TestBed, inject, async} from '@angular/core/testing';

import {BookService} from './book.service';
import {Book} from './book';

describe('BookService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BookService]
    });
  });

  it('should find all books', async(inject([BookService], (service: BookService) => {
    service.findAll().subscribe({
      next: function (books) {
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
