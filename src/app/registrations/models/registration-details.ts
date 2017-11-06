import {ExamSubjectCRUD} from '../../core/certificates/exam-subject-crud';
import {Certificate} from './certificate';
import {PersonCRUD} from './person-crud';
import {Specialty} from './specialty';
export class RegistrationDetails {
  id: number;
  version: number;
  registrationId: number;
  status: string;
  note: string;
  enrollee: PersonCRUD;
  payer: PersonCRUD;

  enrolleeAsPayer: boolean;

  fundsSource: string;
  educationForm: string;
  educationBase: string;

  educationInstitution: string;
  specialty: Specialty;

  prerogatives: string[];
  outOfCompetitions: string[];

  certificate: Certificate;
  examSubjectMarks: {subject: ExamSubjectCRUD, mark: number}[];

  registrationDate: Date;
  registeredById: number;
  registeredBy: string;
  verificationDate: Date;
  verifiedById: number;
  verifiedBy: string;
}
