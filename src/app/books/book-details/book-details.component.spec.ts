import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookDetailsComponent } from './book-details.component';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a current book initialized', async(() => {
    const currentBook = component.currentBook;
    expect(currentBook).toBeDefined();
    expect(currentBook.authors).toContain('John Example');
    expect(currentBook.title).toContain('Example Book');
  }));

  it('should render labels and values of the current book', async(() => {
    const bookDetailsElement = fixture.debugElement.nativeElement;
    expect(bookDetailsElement.querySelector('label[for="authors"]').textContent).toContain('Authors:');
    expect(bookDetailsElement.querySelector('div#authors').textContent).toContain('John Example');
    expect(bookDetailsElement.querySelector('label[for="title"]').textContent).toContain('Title:');
    expect(bookDetailsElement.querySelector('div#title').textContent).toContain('Example Book');
  }));
});
