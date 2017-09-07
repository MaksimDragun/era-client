import { DocumentCRUD } from './document-crud';

export class EnrolleeCRUD {
  firstName: string;
  lastName: string;
  middleName: string;
  birthdate: Date;

  document: DocumentCRUD = new DocumentCRUD();
}
