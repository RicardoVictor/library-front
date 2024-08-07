import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorPostRequest } from '../models/author.model';
import { AuthorService } from '../service/author.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-author-edit',
  templateUrl: './author-edit.component.html',
  styleUrls: ['./author-edit.component.scss'],
})
export class AuthorEditComponent {
  author: AuthorPostRequest = {
    name: '',
  };

  id: string = '';

  constructor(
    private authorService: AuthorService,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idFromUrl = params['id'];

      if (idFromUrl) {
        this.id = idFromUrl;
        this.loadAuthorData();
      }
    });
  }

  private loadAuthorData() {
    this.authorService.getById(this.id).subscribe((author) => {
      if (author) {
        this.author.name = author.name;
      }
    });
  }

  onSubmit(): void {
    this.authorService.update(this.id, this.author).subscribe({
      next: (response) => {
        if (response) this.toastr.success('Autor editado com sucesso!');
        this.router.navigate(['/author']);
      },
      error: (e) => {
        if (e.error.message) this.toastr.error(e.error.message);
        if (e.error.errors) this.toastr.error(this.formatValidationErrors(e.error.errors));
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
