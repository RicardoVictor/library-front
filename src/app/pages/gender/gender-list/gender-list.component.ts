import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthorFilterRequest } from '../../author/models/author-filter.model';
import { GenderFilterRequest } from '../models/gender-filter.model';
import { GenderResponse } from '../models/gender.model';
import { GenderService } from '../service/gender.service';

@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.scss'],
})
export class GenderListComponent {
  genders: GenderResponse[] | undefined;
  pageNumber = 1;
  pageSize = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  showModalDelete: boolean = false;
  bookToDelete: string = '';

  @Input() filter!: GenderFilterRequest;

  constructor(private genderService: GenderService, private router: Router) {}

  ngOnInit(): void {
    this.loadGenders();
  }

  ngOnChanges() {
    if (this.filter) {
      this.resetPage();
      this.loadGenders();
    }
  }

  resetPage() {
    this.pageNumber = 1;
  }

  loadGenders() {
    const filters = JSON.parse(JSON.stringify(this.filter));

    this.filter.pageSize = this.pageSize;
    this.filter.pageNumber = this.pageNumber;

    this.genderService.get(filters).subscribe((response) => {
      if (response) {
        this.genders = response.items;
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
    this.router.navigate(['gender/create']);
  }

  goToEdit(id: string): void {
    this.router.navigate(['/gender/', id]);
  }

  openModalDelete(id: string): void {
    this.bookToDelete = id;
    this.showModalDelete = true;
  }

  closeModalDelete() {
    this.showModalDelete = false;
  }

  handleDelete() {
    this.genderService.delete(this.bookToDelete).subscribe(() => {});
    this.showModalDelete = false;
    window.location.reload();
    alert('Livro deletado com sucesso.');
  }
}
