import { Component } from '@angular/core';
import { GenderService } from '../service/gender.service';
import { Router } from '@angular/router';
import { GenderResponse } from '../models/gender.model';
import { AuthorFilterRequest } from '../../author/models/author-filter.model';

@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.scss']
})
export class GenderListComponent {
  genders: GenderResponse[] | undefined;
  pageNumber = 1;
  pageSize = 10;
  totalItems: number = 0;
  totalPages: number = 0;
  showModalDelete: boolean = false;
  bookToDelete: string = '';

  constructor(private genderService: GenderService, private router: Router) {}

  ngOnInit(): void {
    this.loadGenders();
  }

  loadGenders() {
    var filter = {
      name: null,
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
    } as AuthorFilterRequest;

    this.genderService.get(filter).subscribe((response) => {
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
