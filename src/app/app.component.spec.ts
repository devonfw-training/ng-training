import {Location} from '@angular/common';
import {TestBed, async, fakeAsync, tick, ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {BooksModule} from './books/books.module';
import {RouterTestingModule} from '@angular/router/testing';
import {appRoutes} from './app-routing.module';
import {Router} from '@angular/router';
import {BookService} from './books/book.service';
import {Book} from './books/book';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      imports: [BooksModule, RouterTestingModule.withRoutes(appRoutes)]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should render navigation with links to dialogs', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    const navLinks = compiled.querySelectorAll('nav ul li a');
    expect(navLinks[0].textContent).toBe('Book Overview');
    expect(navLinks[1].textContent).toBe('New Book');
  }));

  // integration test involving routes based on Victor Savkin's book "Angular Router: The Complete Authoritative Reference"
  it('should navigate to book overview dialog', fakeAsync(() => {
    // given
    // get the router from the testing NgModule
    const router = TestBed.get(Router);
    // get the location from the testing NgModule,
    // which is a SpyLocation that comes from RouterTestingModule
    const location = TestBed.get(Location);
    // compile the root component of the app
    const fixture = TestBed.createComponent(AppComponent);
    // when
    router.navigateByUrl('/book-app/books');
    advance(fixture);
    // then
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-book-overview')).not.toBeNull();
    expect(location.path()).toEqual('/book-app/books');
    const bookService = TestBed.get(BookService);
    bookService.findAll().subscribe((books: Book[]) => {
      const table = compiled.querySelector('table');
      const tableRows = compiled.querySelectorAll('app-book-overview table tr');
      // check the first row
      const firstBookRow = tableRows[1];
      const authorAndTitleColumns = firstBookRow.querySelectorAll('td');
      expect(authorAndTitleColumns[0].textContent).toBe(books[0].authors);
      expect(authorAndTitleColumns[1].textContent).toBe(books[0].title);
    });
    tick(); // in case bookService.findAll() is asynchronous
  }));

  function advance(f: ComponentFixture<any>) {
    tick();
    f.detectChanges();
  }
});
