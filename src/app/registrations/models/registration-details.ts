import {Certificate} from './certificate';
import {PersonCRUD} from './person-crud';
import {Specialty} from './specialty';
export class RegistrationDetails {
  id: number;
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
  examSubjectMarks: Map<String, number>;

  registrationDate: Date;
  registeredById: number;
  registeredBy: string;
  verificationDate: Date;
  verifiedById: number;
  verifiedBy: string;
}
