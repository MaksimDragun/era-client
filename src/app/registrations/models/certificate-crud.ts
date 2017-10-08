import {SubjectCRUD} from '../../core/certificates/subject-crud';
import {EducationInstitution} from '../../core/institution/education-institution';
export class CertificateCRUD {
  id: number;
  year: number;
  institution: EducationInstitution;
  marks: {subject: SubjectCRUD, mark: number}[] = [];
  extraMarks: {subject: SubjectCRUD, mark: number}[] = [];
}
