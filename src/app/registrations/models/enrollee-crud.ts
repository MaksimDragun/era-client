import {AddressCRUD} from './address-crud';
import {DocumentCRUD} from './document-crud';

export class EnrolleeCRUD {
  firstName: string;
  lastName: string;
  middleName: string;
  birthdate: Date;

  document: DocumentCRUD = new DocumentCRUD();
  address: AddressCRUD = new AddressCRUD();
}
