import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BookOverviewComponent} from './book-overview.component';
import {BookDetailsComponent} from '../book-details/book-details.component';
import {FormsModule} from '@angular/forms';

describe('BookOverviewComponent', () => {
  let component: BookOverviewComponent;
  let fixture: ComponentFixture<BookOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BookOverviewComponent, BookDetailsComponent],
      imports: [FormsModule]
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
});
