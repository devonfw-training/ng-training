export class Book {
  private _id: number;
  private _authors: string;
  private _title: string;

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
