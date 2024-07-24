import { Component } from '@angular/core';
import { BookFilterRequest } from './models/book-filter.model';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss'],
})
export class BookComponent {
  filter!: BookFilterRequest;

  setFilter(filter: BookFilterRequest) {
    this.filter = { ...filter };
  }
}
