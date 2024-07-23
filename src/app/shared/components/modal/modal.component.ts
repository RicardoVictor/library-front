import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() showModal: boolean = false;
  @Input() title: string = '';
  @Input() includeMain: boolean = true;

  @Output() closeModalFunc: EventEmitter<boolean> = new EventEmitter<boolean>();

  handleCloseModal() {
    this.closeModalFunc.emit(false);
  }
}
