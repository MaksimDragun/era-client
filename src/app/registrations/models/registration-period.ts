import {RegisteredSpecialty} from './registered-specialty';

export class RegistrationPeriod {
  id: number;
  title: string;
  dateFrom: Date = new Date();
  dateTo: Date = new Date();
  status: string;
  specialties: RegisteredSpecialty[];
}
