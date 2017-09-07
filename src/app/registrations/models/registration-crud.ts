import {EnrolleeCRUD} from './enrollee-crud';
import {RegistrationPeriod} from './registration-period';

export class RegistrationCRUD {

  registrationType: string;
  enrollee: EnrolleeCRUD = new EnrolleeCRUD();
  period: RegistrationPeriod;
  registrationDate: Date;
  registeredBy: number;
  certificate: any;
  educationInstitution: number;
}
