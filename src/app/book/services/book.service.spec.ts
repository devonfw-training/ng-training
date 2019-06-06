import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BookService } from './book.service';

fdescribe('BookService', () => {
  describe('(class)', () => {
    it('provides all books', fakeAsync(() => {
      // given
      const service = new BookService();
      // when
      service.getAll().subscribe(books => {
        // then
        expect(books).toBeDefined();
        expect(books.length).toBe(2);
      });
      tick(2000);
    }));
  });

  describe('(service)', () => {
    beforeEach(() => TestBed.configureTestingModule({
      providers: []
    }));

    it('should be created', () => {
      const service: BookService = TestBed.get(BookService);
      expect(service).toBeTruthy();
    });
  });
});
