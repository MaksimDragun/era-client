import {CertificateCRUD} from './certificate-crud';
import {EnrolleeCRUD} from './enrollee-crud';
import {RegistrationPeriod} from './registration-period';
import {StudyType} from './study-type';

export class RegistrationCRUD {
  registrationType: StudyType;
  enrollee: EnrolleeCRUD = new EnrolleeCRUD();
  certificate: CertificateCRUD = new CertificateCRUD();
  registrationDate: Date;
  periodId: number;
  registeredBy: number;
  educationInstitutionId: number;
  specialityId: number;
}
