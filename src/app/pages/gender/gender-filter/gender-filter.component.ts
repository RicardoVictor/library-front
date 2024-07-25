import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GenderFilterRequest } from '../models/gender-filter.model';
import { PAGE_SIZE } from 'src/configs';

@Component({
  selector: 'app-gender-filter',
  templateUrl: './gender-filter.component.html',
  styleUrls: ['./gender-filter.component.scss'],
})
export class GenderFilterComponent {
  constructor(public formBuilder: FormBuilder) {}

  @Output() filterEmmiter: EventEmitter<GenderFilterRequest> =
    new EventEmitter<GenderFilterRequest>();

  filter: GenderFilterRequest = {} as GenderFilterRequest;

  isOpen: boolean = true;
  isLoading: boolean = false;

  ngOnInit() {
    this.filter = {
      name: null,
      pageSize: PAGE_SIZE,
      pageNumber: 1,
    };

    this.search();
  }

  handleToggleAccordion() {
    this.isOpen = !this.isOpen;
  }

  clean() {
    this.filter = {} as GenderFilterRequest;
  }

  search() {
    this.filterEmmiter.emit(this.filter);
  }
}
