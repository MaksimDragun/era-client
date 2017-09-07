import { Subject } from './subject';
export class CertificateCRUD {
  id: number;
  year: number;
  institution: string;
  marks: {subject: Subject, mark: number}[] = [];
}