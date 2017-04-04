import {Component, OnInit} from '@angular/core';
import {Book} from '../book';
import {cloneDeep} from 'lodash';
import {BookService} from '../book.service';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book: Book;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) {
    this.book = new Book();
  }

  ngOnInit(): void {
    this.route.data.subscribe((data: {book: Book}) => {
      if (data.book) {
        this.book = data.book;
      }
    });
  }

  apply(): void {
    this.bookService.save(this.book).subscribe(() => {
      this.router.navigate(['/book-app/books']);
    });
  }
}
