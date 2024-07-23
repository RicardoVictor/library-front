import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookFilterRequest } from '../models/book-filter.model';
import { BookResponse } from '../models/book.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  books: BookResponse[] | undefined;
  pageNumber = 1;
  pageSize = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  showModalDelete: boolean = false;
  bookToDelete: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  loadBooks() {
    var filter = {
      name: null,
      authors: null,
      genders: null,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    } as BookFilterRequest;

    this.bookService.get(filter).subscribe((response) => {
      if (response) {
        this.books = response.items;
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
    this.router.navigate(['/create']);
  }

  goToEdit(id: string): void {
    this.router.navigate(['/user/', id]);
  }

  openModalDelete(id: string): void {
    this.bookToDelete = id;
    this.showModalDelete = true;
  }

  closeModalDelete() {
    this.showModalDelete = false;
  }

  handleDelete() {
    this.bookService.delete(this.bookToDelete).subscribe(() => {});
    this.showModalDelete = false;
    window.location.reload();
    alert('Livro deletado com sucesso.');
  }
}
