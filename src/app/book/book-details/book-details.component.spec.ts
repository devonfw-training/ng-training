import { BookDetailsComponent } from './book-details.component';
import { async, TestBed } from '@angular/core/testing';

describe('BookDetailsComponent', function () {
  describe('(class)', function () {
    it('does not provide current book upon creation', function () {
      // given
      const component = new BookDetailsComponent();
      // then
      expect(component.book).toBeUndefined();
    });
  });

  describe('(DOM)', function () {
    let fixture;

    beforeEach(async(function () {
      TestBed.configureTestingModule({
        declarations: [BookDetailsComponent]
      }).compileComponents();
      fixture = TestBed.createComponent(BookDetailsComponent);
    }));

    it('is created', async(function () {
      // then
      expect(fixture.componentInstance).toBeDefined();
    }));

    it('renders nothing when no book provided', async(function () {
      // given
      const element: HTMLElement = fixture.nativeElement;
      // when
      const authorElement = element.querySelector('#author');
      // then
      expect(authorElement).not.toBeNull();
      expect(authorElement.textContent).toBe('');
    }));

    it('renders books\'s author', async(function () {
      // given
      const component = fixture.componentInstance;
      component.book = {
        id: 0,
        author: 'Douglas Crockford',
        title: 'JavaScript. The good parts'
      };
      fixture.detectChanges();
      const element: HTMLElement = fixture.nativeElement;
      // when
      const authorElement = element.querySelector('#author');
      // then
      expect(authorElement).not.toBeNull();
      expect(authorElement.textContent).toBe('Douglas Crockford');
    }));
  });
});


