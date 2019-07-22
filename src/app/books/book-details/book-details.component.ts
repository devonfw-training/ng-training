import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AbstractControl, NgForm} from '@angular/forms';

import {Book} from '../book';
import {BookService} from '../book.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {

  @ViewChild('bookForm', {static: true})
  currentForm: NgForm;

  book: Book;

  constructor(
    private bookService: BookService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.book = new Book();
  }

  private static createErrorMessage(errorObject: { [key: string]: any }): string {
    if (errorObject) {
      return Object.keys(errorObject).map(errorCode => {
        switch (errorCode) {
          case 'required':
            return 'Please provide a value';
          case 'maxlength':
            return 'The value is too long';
          default:
            return 'The value is wrong';
        }
      }).join(' ');
    }
  }

  getErrorMessageOfField(fieldName: string): string {
    if (this.isFieldInvalid(fieldName)) {
      const fieldControl: AbstractControl = this.currentForm.form.get(fieldName);
      return BookDetailsComponent.createErrorMessage(fieldControl.errors);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const fieldControl: AbstractControl = this.currentForm.form.get(fieldName);
    return fieldControl && fieldControl.invalid && (fieldControl.touched || this.currentForm.submitted);
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: { book: Book }) => {
      if (data.book) {
        this.book = data.book;
      }
    });
  }

  apply(): void {
    if (this.currentForm.form.valid) {
      this.bookService.save(this.book).subscribe(() => {
        this.router.navigate(['/book-app/books']);
      });
    }
  }
}
