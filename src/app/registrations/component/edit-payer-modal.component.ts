import {PersonCRUD} from '../models/person-crud';
import {Component, EventEmitter, Input, OnInit, OnChanges, Output, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-edit-payer-modal',
  templateUrl: './edit-payer-modal.component.html',
  styles: [
    '.modal-dialog {width: 50%;}'
  ]
})
export class EditPayerModalComponent implements OnInit, OnChanges {

  @Input() countryList: string[];
  @Input() documentTypeList;
  @Input() sourcePayer: PersonCRUD;
  editablePayer: PersonCRUD;

  @Output() onSave: EventEmitter<PersonCRUD> = new EventEmitter();

  ngOnInit(): void {
    console.log('Init payer modal');
    this.editablePayer = new PersonCRUD();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  resetPayer(): void {
    console.log('reset payer');
  }

  onCancelAction(): void {
    console.log('cancel payer');
    this.resetPayer();
  }

  onSaveAction(): void {
    console.log('save payer');
    this.onSave.emit(this.editablePayer);
  }
}
