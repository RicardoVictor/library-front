import { Component } from '@angular/core';
import { GenderFilterRequest } from './models/gender-filter.model';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html',
  styleUrls: ['./gender.component.scss'],
})
export class GenderComponent {
  filter!: GenderFilterRequest;

  setFilter(filter: GenderFilterRequest) {
    this.filter = { ...filter };
  }
}
