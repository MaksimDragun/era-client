import {PersonCRUD} from '../../../models/person-crud';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-edit-enrollee',
  templateUrl: './edit-enrollee.component.html'
})
export class EditEnrolleeComponent {

  @Input() enrollee: PersonCRUD;
  @Input() countryList: string[];
  @Input() documentTypeList;

}
