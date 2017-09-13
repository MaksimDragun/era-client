import {AddressCRUD} from './address-crud';
import {ContactDetails} from './contact-details';
import {DocumentCRUD} from './document-crud';

export class PersonCRUD {
  firstName: string;
  lastName: string;
  middleName: string;
  birthdate: Date;

  document: DocumentCRUD = new DocumentCRUD();
  address: AddressCRUD = new AddressCRUD();
  contactDetails: ContactDetails = new ContactDetails();
}
