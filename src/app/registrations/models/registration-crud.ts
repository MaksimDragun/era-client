import { ExamSubjectCRUD } from '../../core/certificates/exam-subject-crud';
import { AbstractCRUD } from '../../shared/models/abstract-crud';
import { CertificateCRUD } from './certificate-crud';
import { PersonCRUD } from './person-crud';
import { RegistrationPeriod } from './registration-period';
import { FundsSource } from './funds-source';
import { EducationInstitution } from '../../core/institution/education-institution';
import { Specialty } from './specialty';
import { Benefit } from './benefit';

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
  educationInstitution: EducationInstitution;
  specialty: Specialty;
  prerogatives: Benefit[];
  outOfCompetitions: Benefit[];
  payer: PersonCRUD = new PersonCRUD();
  enrolleeAsPayer = false;
  examSubjectMarks: { subject: ExamSubjectCRUD, mark: number }[] = [];
}
