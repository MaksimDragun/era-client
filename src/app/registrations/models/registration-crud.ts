import {EnrolleeCRUD} from './enrollee-crud';
import {RegistrationPeriod} from './registration-period';
import {StudyType} from './study-type';

export class RegistrationCRUD {

  registrationType: StudyType;
  enrollee: EnrolleeCRUD = new EnrolleeCRUD();
  period: RegistrationPeriod;
  registrationDate: Date;
  registeredBy: number;
  certificate: any;
  educationInstitution: number;
}
