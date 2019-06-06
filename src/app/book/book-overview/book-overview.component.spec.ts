import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { BookOverviewComponent } from './book-overview.component';
import { BookDetailsComponent } from '../book-details/book-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';


fdescribe('BookOverviewComponent', () => {
  describe('(DOM)', function () {
    let component: BookOverviewComponent;
    let fixture: ComponentFixture<BookOverviewComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [BookOverviewComponent, BookDetailsComponent]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(BookOverviewComponent);
      component = fixture.componentInstance;
    });

    it('is created', () => {
      fixture.detectChanges();
      expect(component).toBeTruthy();
    });

    it('renders Douglas\' book a 1st table row', fakeAsync(function () {
      fixture.detectChanges();
      tick(2000);
      fixture.detectChanges();
      // given
      const rowElements = fixture.nativeElement.querySelectorAll(
        'table tbody tr');
      // then
      expect(rowElements.length).toBe(2);
      const firstRowElement = rowElements.item(0);
      const authorNameElement = firstRowElement.querySelector('td');
      expect(authorNameElement.textContent).toBe('Douglas Crockford');
    }));

    it('navigates to book details dialog upon row click', fakeAsync(function () {
      // given
      const router = TestBed.get(Router);
      const navigateSpy = spyOn(router, 'navigate');
      fixture.detectChanges();
      tick(2000);
      fixture.detectChanges();
      const rowElements: HTMLElement = fixture.nativeElement.querySelector(
        'table tbody tr');
      // when
      rowElements.click();
      fixture.detectChanges();
      // then
      expect(navigateSpy).toHaveBeenCalled();
    }));
  });
});
