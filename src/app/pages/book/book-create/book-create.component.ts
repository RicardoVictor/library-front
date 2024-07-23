import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../service/book.service';
import { BookPostRequest } from '../models/book.model';
import { AuthorService } from '../../author/service/author.service';
import { GenderService } from '../../gender/service/gender.service';
import { AuthorResponse } from '../../author/models/author.model';
import { GenderResponse } from '../../gender/models/gender.model';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss'],
})
export class BookCreateComponent {
  book: BookPostRequest = {
    name: '',
    authorId: '',
    genderId: '',
  };

  authors: AuthorResponse[] = [];
  genders: GenderResponse[] = [];

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private genderService: GenderService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.loadAuthors();
    this.loadGenders();
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
    this.bookService.create(this.book).subscribe({
      next: (response) => {
        if (response) alert('Livro criado com sucesso!');
        this.router.navigate(['/book']);
      },
    });
  }
}
