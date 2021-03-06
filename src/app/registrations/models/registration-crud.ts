import {ExamSubjectCRUD} from '../../core/certificates/exam-subject-crud';
import {AbstractCRUD} from '../../shared/models/abstract-crud';
import {CertificateCRUD} from './certificate-crud';
import {PersonCRUD} from './person-crud';
import {RegistrationPeriod} from './registration-period';
import {FundsSource} from './funds-source';

export class RegistrationCRUD extends AbstractCRUD {
  registrationId: number;
  status: string;
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
  payer: PersonCRUD = new PersonCRUD();
  enrolleeAsPayer = false;
  examSubjectMarks: {subject: ExamSubjectCRUD, mark: number}[] = [];
}
