import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorFilterRequest } from '../models/author-filter.model';
import { AuthorResponse } from '../models/author.model';
import { AuthorService } from '../service/author.service';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent implements OnChanges {
  authors: AuthorResponse[] | undefined;
  pageNumber = 1;
  pageSize = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  showModalDelete: boolean = false;
  bookToDelete: string = '';

  @Input() filter!: AuthorFilterRequest;

  constructor(private authorService: AuthorService, private router: Router) {}

  ngOnChanges() {
    if (this.filter) {
      this.resetPage();
      this.loadAuthors();
    }
  }

  resetPage() {
    this.pageNumber = 1;
  }

  loadAuthors() {
    const filters = JSON.parse(JSON.stringify(this.filter));

    this.filter.pageSize = this.pageSize;
    this.filter.pageNumber = this.pageNumber;

    this.authorService.get(filters).subscribe((response) => {
      if (response) {
        this.authors = response.items;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
      } else {
        console.error();
      }
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
    this.authorService.delete(this.bookToDelete).subscribe(() => {});
    this.showModalDelete = false;
    window.location.reload();
    alert('Livro deletado com sucesso.');
  }
}
