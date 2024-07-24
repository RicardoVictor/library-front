import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../service/author.service';
import { AuthorPostRequest } from '../models/author.model';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.scss']
})
export class AuthorCreateComponent {
  author: AuthorPostRequest = {
    name: '',
  };

  constructor(
    private authorService: AuthorService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authorService.create(this.author).subscribe({
      next: (response) => {
        if (response) alert('Autor criado com sucesso!');
        this.router.navigate(['/author']);
      },
    });
  }

  handleBackPage() {
    this.router.navigate(['/author']);
  }
}
