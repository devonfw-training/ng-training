import {Component, OnInit} from '@angular/core';
import {Book} from '../book';
import {cloneDeep} from 'lodash';
import {BookService} from '../book.service';
import {Router, ActivatedRoute} from '@angular/router';
import {AbstractControl, FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  bookForm: FormGroup;

  submitted: boolean;

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

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router, private route: ActivatedRoute) {
    this.book = new Book();
    this.submitted = false;
  }

  getErrorMessageOfField(fieldName: string): string {
    if (this.isFieldInvalid(fieldName)) {
      const fieldControl: AbstractControl = this.bookForm.get(fieldName);
      return BookDetailsComponent.createErrorMessage(fieldControl.errors);
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const fieldControl: AbstractControl = this.bookForm.get(fieldName);
    return fieldControl && fieldControl.invalid && (fieldControl.touched || this.submitted);
  }

  ngOnInit(): void {
    this.bookForm = this.formBuilder.group({
      authors: ['', [Validators.required, Validators.maxLength(15)]],
      title: ['', [Validators.required, Validators.maxLength(50)]]
    });

    this.route.data.subscribe((data: {book: Book}) => {
      if (data.book) {
        this.book = data.book;

        this.bookForm.setValue({
          authors: data.book.authors,
          title: data.book.title
        });
      }
    });

    this.bookForm.controls['authors'].valueChanges.subscribe(value => {
      this.book.authors = value;
    });

    this.bookForm.controls['title'].valueChanges.subscribe(value => {
      this.book.title = value;
    });
  }

  apply(): void {
    this.submitted = true;
    if (this.bookForm.valid) {
      this.bookService.save(this.book).subscribe(() => {
        this.router.navigate(['/book-app/books']);
      });
    }
  }
}
