import { Component } from '@angular/core';
import { GenderPostRequest } from '../models/gender.model';
import { GenderService } from '../service/gender.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gender-create',
  templateUrl: './gender-create.component.html',
  styleUrls: ['./gender-create.component.scss'],
})
export class GenderCreateComponent {
  gender: GenderPostRequest = {
    name: '',
  };

  constructor(
    private genderService: GenderService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit(): void {
    this.genderService.create(this.gender).subscribe({
      next: (response) => {
        if (response) this.toastr.success('Gênero criado com sucesso!');
        this.router.navigate(['/gender']);
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
    this.router.navigate(['/gender']);
  }
}
