import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BookFilterRequest } from '../models/book-filter.model';
import { BookResponse } from '../models/book.model';
import { BookService } from '../service/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnChanges {
  books: BookResponse[] | undefined;
  pageNumber = 1;
  pageSize = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  showModalDelete: boolean = false;
  bookToDelete: string = '';

  @Input() filter!: BookFilterRequest;

  constructor(
    private bookService: BookService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnChanges() {
    if (this.filter) {
      this.resetPage();
      this.loadBooks();
    }

    const showSuccessMessage = localStorage.getItem(
      'showSuccessDeleteMessageBook'
    );
    const showErrorMessage = localStorage.getItem('showErrorDeleteMessageBook');

    if (showSuccessMessage) {
      this.toastr.success('Livro deletado com sucesso!');
      localStorage.removeItem('showSuccessDeleteMessageBook');
    }

    if (showErrorMessage) {
      this.toastr.error('Não foi possível deletar este livro!');
      localStorage.removeItem('showErrorDeleteMessageBook');
    }
  }

  resetPage() {
    this.pageNumber = 1;
  }

  loadBooks() {
    this.filter.pageSize = this.pageSize;
    this.filter.pageNumber = this.pageNumber;

    const filters = JSON.parse(JSON.stringify(this.filter));

    this.bookService.get(filters).subscribe({
      next: (response) => {
        this.books = response.items;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
      },
      error: () => {
        this.toastr.error('Erro ao recuperar livros!');
      },
    });
  }

  goToCreate(): void {
    this.router.navigate(['book/create']);
  }

  goToEdit(id: string): void {
    this.router.navigate(['/book/', id]);
  }

  openModalDelete(id: string): void {
    this.bookToDelete = id;
    this.showModalDelete = true;
  }

  closeModalDelete() {
    this.showModalDelete = false;
  }

  handleDelete() {
    this.bookService.delete(this.bookToDelete).subscribe({
      next: () => {
        this.showModalDelete = false;
        localStorage.setItem('showSuccessDeleteMessageBook', 'true');
        window.location.reload();
      },
      error: () => {
        this.showModalDelete = false;
        localStorage.setItem('showErrorDeleteMessageBook', 'true');
        window.location.reload();
      },
    });
  }

  handleDecreasePage() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.loadBooks();
    }
  }

  handleIncreasePage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber += 1;
      this.loadBooks();
    }
  }
}
