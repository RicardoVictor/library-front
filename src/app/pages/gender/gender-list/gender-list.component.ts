import { Component, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { GenderFilterRequest } from '../models/gender-filter.model';
import { GenderResponse } from '../models/gender.model';
import { GenderService } from '../service/gender.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gender-list',
  templateUrl: './gender-list.component.html',
  styleUrls: ['./gender-list.component.scss'],
})
export class GenderListComponent implements OnChanges {
  genders: GenderResponse[] | undefined;
  pageNumber = 1;
  pageSize = 5;
  totalItems: number = 0;
  totalPages: number = 0;
  showModalDelete: boolean = false;
  bookToDelete: string = '';

  @Input() filter!: GenderFilterRequest;

  constructor(
    private genderService: GenderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnChanges() {
    if (this.filter) {
      this.resetPage();
      this.loadGenders();
    }

    const showSuccessMessage = localStorage.getItem(
      'showSuccessDeleteMessageGender'
    );
    const showErrorMessage = localStorage.getItem(
      'showErrorDeleteMessageGender'
    );

    if (showSuccessMessage) {
      this.toastr.success('Gênero deletado com sucesso!');
      localStorage.removeItem('showSuccessDeleteMessageGender');
    }

    if (showErrorMessage) {
      this.toastr.error('Não foi possível deletar este gênero!');
      localStorage.removeItem('showErrorDeleteMessageGender');
    }
  }

  resetPage() {
    this.pageNumber = 1;
  }

  loadGenders() {
    this.filter.pageSize = this.pageSize;
    this.filter.pageNumber = this.pageNumber;

    const filters = JSON.parse(JSON.stringify(this.filter));

    this.genderService.get(filters).subscribe({
      next: (response) => {
        this.genders = response.items;
        this.totalItems = response.totalItems;
        this.totalPages = response.totalPages;
        this.pageNumber = response.pageNumber;
        this.pageSize = response.pageSize;
      },
      error: () => {
        this.toastr.error('Erro ao recuperar gêneros!');
      },
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
    this.genderService.delete(this.bookToDelete).subscribe({
      next: () => {
        this.showModalDelete = false;
        localStorage.setItem('showSuccessDeleteMessageGender', 'true');
        window.location.reload();
      },
      error: () => {
        this.showModalDelete = false;
        localStorage.setItem('showErrorDeleteMessageGender', 'true');
        window.location.reload();
      },
    });
  }

  handleDecreasePage() {
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.loadGenders();
    }
  }

  handleIncreasePage() {
    if (this.pageNumber < this.totalPages) {
      this.pageNumber += 1;
      this.loadGenders();
    }
  }
}
