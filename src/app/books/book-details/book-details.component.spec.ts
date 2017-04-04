import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {BookDetailsComponent} from './book-details.component';
import {FormsModule} from '@angular/forms';
import {BookService} from '../book.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('BookDetailsComponent', () => {
  let component: BookDetailsComponent;
  let fixture: ComponentFixture<BookDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookDetailsComponent],
      imports: [FormsModule, RouterTestingModule],
      providers: [BookService]
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
});
