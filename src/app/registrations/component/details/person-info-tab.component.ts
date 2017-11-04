import {AddressCRUD} from '../../models/address-crud';
import {PersonCRUD} from '../../models/person-crud';
import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-person-info-tab',
  templateUrl: './person-info-tab.component.html'
})
export class PersonInfoTabComponent {

  @Input() person: PersonCRUD;

  buildAddressLine(address: AddressCRUD): string {
    return `ул.${address.street}, д.${address.house}` +
      `${address.housing ? ', к.' + address.housing : ''}${address.flat ? ', кв.' + address.flat : ''}`;
  }

}
