import {CertificateCRUD} from './certificate-crud';
import {PersonCRUD} from './person-crud';
import {RegistrationPeriod} from './registration-period';
import {FundsSource} from './funds-source';

export class RegistrationCRUD {
  fundsSource: string;
  educationForm: string;
  educationBase: string;
  enrollee: PersonCRUD = new PersonCRUD();
  certificate: CertificateCRUD = new CertificateCRUD();
  registrationDate: Date;
  periodId: number;
  registeredBy: number;
  educationInstitutionId: number;
  specialtyId: number;
  prerogatives: number[];
  outOfCompetitions: number[];
}
