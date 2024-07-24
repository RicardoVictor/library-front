import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthorFilterRequest } from '../models/author-filter.model';

@Component({
  selector: 'app-author-filter',
  templateUrl: './author-filter.component.html',
  styleUrls: ['./author-filter.component.scss'],
})
export class AuthorFilterComponent {
  constructor(public formBuilder: FormBuilder) {}

  @Output() filterEmmiter: EventEmitter<AuthorFilterRequest> =
    new EventEmitter<AuthorFilterRequest>();

  filter: AuthorFilterRequest = {} as AuthorFilterRequest;

  isOpen: boolean = true;
  isLoading: boolean = false;

  ngOnInit() {
    this.filter = {
      name: null,
      pageSize: 5,
      pageNumber: 1,
    };

    this.search();
  }

  handleToggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  clean() {
    this.filter = {} as AuthorFilterRequest;
  }

  search() {
    console.log(this.filter);
    this.filterEmmiter.emit(this.filter);
  }
}
