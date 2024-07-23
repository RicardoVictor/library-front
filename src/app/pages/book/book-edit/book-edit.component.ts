import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../service/book.service';
import { BookPostRequest } from '../models/book.model';
import { AuthorService } from '../../author/service/author.service';
import { GenderService } from '../../gender/service/gender.service';
import { AuthorResponse } from '../../author/models/author.model';
import { GenderResponse } from '../../gender/models/gender.model';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss'],
})
export class BookEditComponent {
  book: BookPostRequest = {
    name: '',
    authorId: '',
    genderId: '',
  };

  authors: AuthorResponse[] = [];
  genders: GenderResponse[] = [];

  id: string = '';

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private genderService: GenderService,
    public router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idFromUrl = params['id'];

      if (idFromUrl) {
        this.id = idFromUrl;
        this.loadBookData();
      }
    });

    this.loadAuthors();
    this.loadGenders();
  }

  private loadBookData() {
    this.bookService.getById(this.id).subscribe((book) => {
      if (book) {
        this.book.name = book.name;
        this.book.authorId = book.author.id;
        this.book.genderId = book.gender.id;
      }
    });
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

  onSubmit(): void {
    this.bookService.update(this.id, this.book).subscribe({
      next: (response) => {
        if (response) alert('Livro editado com sucesso!');
        this.router.navigate(['/book']);
      },
      error: (e) => {
        if (e.error.message) alert(e.error.message);
        if (e.error.errors) alert(this.formatValidationErrors(e.error.errors));
      },
    });
  }

  private formatValidationErrors(errors: any): string {
    let errorMessages = '';
    for (const key in errors) {
      if (errors.hasOwnProperty(key)) {
        errors[key].forEach((element: any) => {
          errorMessages += `${element}\n`;
        });
      }
    }

    return errorMessages;
  }
}
