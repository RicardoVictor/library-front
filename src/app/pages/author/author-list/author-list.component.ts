import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthorFilterRequest } from '../models/author-filter.model';
import { AuthorResponse } from '../models/author.model';
import { AuthorService } from '../service/author.service';
import { PAGE_SIZE } from 'src/configs';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnChanges {
  authors: AuthorResponse[] | undefined;
  pageNumber = 1;
  pageSize = PAGE_SIZE;
  totalItems: number = 0;
  totalPages: number = 0;
  showModalDelete: boolean = false;
  bookToDelete: string = '';

  @Input() filter!: AuthorFilterRequest;

  constructor(
    private authorService: AuthorService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnChanges() {
    if (this.filter) {
      this.resetPage();
      this.loadAuthors();
    }

    const showSuccessMessage = localStorage.getItem(
      'showSuccessDeleteMessageAuthor'
    );
    const showErrorMessage = localStorage.getItem(
      'showErrorDeleteMessageAuthor'
    );

    if (showSuccessMessage) {
      this.toastr.success('Autor deletado com sucesso!');
      localStorage.removeItem('showSuccessDeleteMessageAuthor');
    }

    if (showErrorMessage) {
      this.toastr.error('Não foi possível deletar este autor!');
      localStorage.removeItem('showErrorDeleteMessageAuthor');
    }
  }

  resetPage() {
    this.pageNumber = 1;
  }

  loadAuthors() {
    this.filter.pageSize = this.pageSize;
    this.filter.pageNumber = this.pageNumber;

    const filters = JSON.parse(JSON.stringify(this.filter));

    this.authorService.get(filters).subscribe({
      next: (response) => {
        this.authors = response.items;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
      },
      error: () => {
        this.toastr.error('Erro ao recuperar autores!');
      },
    });
  }

  goToCreate(): void {
    this.router.navigate(['author/create']);
  }

  goToEdit(id: string): void {
    this.router.navigate(['/author/', id]);
  }

  openModalDelete(id: string): void {
    this.bookToDelete = id;
    this.showModalDelete = true;
  }

  closeModalDelete() {
    this.showModalDelete = false;
  }

  handleDelete() {
    this.authorService.delete(this.bookToDelete).subscribe({
      next: () => {
        this.showModalDelete = false;
        localStorage.setItem('showSuccessDeleteMessageAuthor', 'true');
        window.location.reload();
      },
      error: () => {
        this.showModalDelete = false;
        localStorage.setItem('showErrorDeleteMessageAuthor', 'true');
        window.location.reload();
      },
    });
  }

  handleDecreasePage() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.loadAuthors();
    }
  }

  handleIncreasePage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber += 1;
      this.loadAuthors();
    }
  }
}
