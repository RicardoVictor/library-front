import { Component } from '@angular/core';
import { AuthorFilterRequest } from './models/author-filter.model';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent {
  filter!: AuthorFilterRequest;

  setFilter(filter: AuthorFilterRequest) {
    this.filter = { ...filter };
  }
}
