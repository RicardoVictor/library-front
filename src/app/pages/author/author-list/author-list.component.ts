import { Component } from '@angular/core';
import { AuthorService } from '../service/author.service';
import { Router } from '@angular/router';
import { AuthorResponse } from '../models/author.model';
import { AuthorFilterRequest } from '../models/author-filter.model';

@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.scss'],
})
export class AuthorListComponent {
  authors: AuthorResponse[] | undefined;
  pageNumber = 1;
  pageSize = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  showModalDelete: boolean = false;
  bookToDelete: string = '';

  constructor(private authorService: AuthorService, private router: Router) {}

  ngOnInit(): void {
    this.loadAuthors();
  }

  loadAuthors() {
    var filter = {
      name: null,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    } as AuthorFilterRequest;

    this.authorService.get(filter).subscribe((response) => {
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
