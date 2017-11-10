import {PersonCRUD} from '../../../models/person-crud';
import {Component, EventEmitter, Input, OnChanges, Output, SimpleChange, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-edit-payer-modal',
  templateUrl: './edit-payer-modal.component.html',
  styles: [
    '.modal-dialog {width: 50%;}'
  ]
})
export class EditPayerModalComponent implements OnChanges {

  @Input() countryList: string[];
  @Input() documentTypeList;
  @Input() sourcePayer: PersonCRUD;
  @Input() sourceEnrolleeAsPayer: boolean;
  editablePayer: PersonCRUD = new PersonCRUD();
  enrolleeAsPayer: boolean;

  @Output() onSave: EventEmitter<{payer: PersonCRUD, enrolleeAsPayer: boolean}> = new EventEmitter();

  ngOnChanges(changes: SimpleChanges): void {
    let change: SimpleChange;
    change = changes['sourcePayer'];
    if (change && change.currentValue) {
      this.resetPayer();
    }
    change = changes['countryList'];
    if (change && change.currentValue) {
      this.editablePayer.address.country = change.currentValue[0];
      this.editablePayer.document.citizenship = change.currentValue[0];
    }
    change = changes['documentTypeList'];
    if (change && change.currentValue) {
      this.editablePayer.document.type = change.currentValue[0];
    }
  }

  resetPayer(): void {
    this.enrolleeAsPayer = this.sourceEnrolleeAsPayer;
    this.editablePayer = {... this.sourcePayer};
  }

  onCancelAction(): void {
    this.resetPayer();
  }

  onSaveAction(): void {
    this.onSave.emit({payer: this.editablePayer, enrolleeAsPayer: this.enrolleeAsPayer});
  }
}
