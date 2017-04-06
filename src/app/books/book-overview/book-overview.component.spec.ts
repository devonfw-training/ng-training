import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookOverviewComponent} from './book-overview.component';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {ReactiveFormsModule} from '@angular/forms';
import {BookService} from '../book.service';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {Book} from '../book';

describe('BookOverviewComponent', () => {
  let component: BookOverviewComponent;
  let fixture: ComponentFixture<BookOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookOverviewComponent, BookDetailsComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        BookService,
        { // we mock the ActivatedRoute
          provide: ActivatedRoute, useValue: {
          data: Observable.of(
            {books: [Book.from('Test Author', 'Test Title')]})
        }
        }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // shallow test involving routes based on Victor Savkin's book "Angular Router: The Complete Authoritative Reference"
  it('should render a table containing a book row', () => {
    const compiled = fixture.debugElement.nativeElement;
    const tableRows = compiled.querySelectorAll('table tr');
    const bookRow = tableRows[1]; // tableRows[0] is the header row
    const bookCells = bookRow.querySelectorAll('td');
    expect(bookCells[0].textContent).toBe('Test Author');
    expect(bookCells[1].textContent).toBe('Test Title');
  });
});
