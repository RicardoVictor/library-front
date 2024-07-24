import { Component } from '@angular/core';
import { GenderPostRequest } from '../models/gender.model';
import { GenderService } from '../service/gender.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gender-create',
  templateUrl: './gender-create.component.html',
  styleUrls: ['./gender-create.component.scss']
})
export class GenderCreateComponent {
  gender: GenderPostRequest = {
    name: '',
  };

  constructor(
    private genderService: GenderService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.genderService.create(this.gender).subscribe({
      next: (response) => {
        if (response) alert('Gênero criado com sucesso!');
        this.router.navigate(['/gender']);
      },
    });
  }

  handleBackPage() {
    this.router.navigate(['/gender']);
  }
}
