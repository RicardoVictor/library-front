import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthorService } from '../../author/service/author.service';
import { GenderService } from '../../gender/service/gender.service';
import { BookFilterRequest } from '../models/book-filter.model';
import { BookService } from '../service/book.service';
import { AuthorResponse } from '../../author/models/author.model';
import { GenderResponse } from '../../gender/models/gender.model';

@Component({
  selector: 'app-book-filter',
  templateUrl: './book-filter.component.html',
  styleUrls: ['./book-filter.component.scss'],
})
export class BookFilterComponent {
  constructor(
    public formBuilder: FormBuilder,
    public bookService: BookService,
    private authorService: AuthorService,
    private genderService: GenderService
  ) {}

  @Output() filterEmmiter: EventEmitter<BookFilterRequest> =
    new EventEmitter<BookFilterRequest>();

  filter: BookFilterRequest = {} as BookFilterRequest;

  isOpen: boolean = true;
  isLoading: boolean = false;

  authors: AuthorResponse[] = [];
  genders: GenderResponse[] = [];

  ngOnInit() {
    this.filter = {
      name: null,
      authors: null,
      genders: null,
      pageSize: 5,
      pageNumber: 1,
    };

        this.loadAuthors();
        this.loadGenders();

    this.search();
  }

  loadAuthors() {
    this.authorService.get().subscribe({
      next: (response) => {
        if (response) this.authors = response.items;
      },
    });
  }

  loadGenders() {
    this.genderService.get().subscribe({
      next: (response) => {
        if (response) this.genders = response.items;
      },
    });
  }

  handleToggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  clean() {
    this.filter = {} as BookFilterRequest;
  }

  search() {
    console.log(this.filter)
    this.filterEmmiter.emit(this.filter);
  }
}
