import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookOverviewComponent } from './book-overview.component';
import { BookDetailsComponent } from '../book-details/book-details.component';

describe('BookOverviewComponent', () => {
  describe('(DOM)', function () {
    let component: BookOverviewComponent;
    let fixture: ComponentFixture<BookOverviewComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ BookOverviewComponent, BookDetailsComponent ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BookOverviewComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('is created', () => {
      expect(component).toBeTruthy();
    });

    it ('renders Douglas\' book a 1st table row', function () {
      // given
      const rowElements = fixture.nativeElement.querySelectorAll(
        'table tbody tr');
      // then
      expect(rowElements.length).toBe(2);
      const firstRowElement = rowElements.item(0);
      const authorNameElement = firstRowElement.querySelector('td');
      expect(authorNameElement.textContent).toBe('Douglas Crockford');
    });

    it ('renders details upon row click', function () {
      // given
      const rowElements: HTMLElement = fixture.nativeElement.querySelector(
        'table tbody tr');
      // when
      rowElements.click();
      fixture.detectChanges();
      // then
      const bookDetailsElement = fixture.nativeElement.querySelector(
        'app-book-details');
      expect(component.selectedBook.author).toBe('Douglas Crockford');
      expect(bookDetailsElement).not.toBeNull();
      expect(bookDetailsElement.querySelector('#author').textContent)
        .toBe('Douglas Crockford');
    });
  });
});
