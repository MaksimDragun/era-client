import {EducationInstitution} from '../../core/institution/education-institution';
import {RegisteredSpecialty} from './registered-specialty';

export class RegistrationPeriod {
  id: number;
  title: string;
  educationInstitution: EducationInstitution;
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  status: string;
  specialties: RegisteredSpecialty[];
}
