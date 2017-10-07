import {Subject} from '../../core/certificates/subject';
import {EducationInstitution} from '../../core/institution/education-institution';
export class CertificateCRUD {
  id: number;
  year: number;
  institution: EducationInstitution;
  marks: {subject: Subject, mark: number}[] = [];
  extraMarks: {subject: Subject, mark: number}[] = [];
}
