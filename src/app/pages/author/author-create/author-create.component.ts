import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorService } from '../service/author.service';
import { AuthorPostRequest } from '../models/author.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-author-create',
  templateUrl: './author-create.component.html',
  styleUrls: ['./author-create.component.scss'],
})
export class AuthorCreateComponent {
  author: AuthorPostRequest = {
    name: '',
  };

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    this.authorService.create(this.author).subscribe({
      next: (response) => {
        if (response) this.toastr.success('Autor criado com sucesso!');
        this.router.navigate(['/author']);
      },
      error: (e) => {
        if (e.error.message) this.toastr.error(e.error.message);
        if (e.error.errors)
          this.toastr.error(this.formatValidationErrors(e.error.errors));
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

  handleBackPage() {
    this.router.navigate(['/author']);
  }
}
