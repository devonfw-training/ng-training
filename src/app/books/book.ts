export class Book {
  static idSeq = 1;

  private _id: number;
  private _authors: string;
  private _title: string;

  static from(authors: string, title: string): Book {
    const book = new Book();
    book.id = Book.idSeq++;
    book.authors = authors;
    book.title = title;

    return book;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get authors(): string {
    return this._authors;
  }

  set authors(value: string) {
    this._authors = value;
  }

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }
}
