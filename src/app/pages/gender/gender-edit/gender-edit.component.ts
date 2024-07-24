import { Component } from '@angular/core';
import { GenderPostRequest } from '../models/gender.model';
import { GenderService } from '../service/gender.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gender-edit',
  templateUrl: './gender-edit.component.html',
  styleUrls: ['./gender-edit.component.scss']
})
export class GenderEditComponent {
  gender: GenderPostRequest = {
    name: '',
  };

  id: string = '';

  constructor(
    private genderService: GenderService,
    public router: Router,
    public route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const idFromUrl = params['id'];

      if (idFromUrl) {
        this.id = idFromUrl;
        this.loadGenderData();
      }
    });
  }

  private loadGenderData() {
    this.genderService.getById(this.id).subscribe((gender) => {
      if (gender) {
        this.gender.name = gender.name;
      }
    });
  }

  onSubmit(): void {
    this.genderService.update(this.id, this.gender).subscribe({
      next: (response) => {
        if (response) this.toastr.success('Gênero editado com sucesso!');
        this.router.navigate(['/gender']);
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
    this.router.navigate(['/gender']);
  }
}
