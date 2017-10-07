import {SubjectCrudCRUD} from '../../core/certificates/subject-crud';
import {EducationInstitution} from '../../core/institution/education-institution';
export class CertificateCRUD {
  id: number;
  year: number;
  institution: EducationInstitution;
  marks: {subject: SubjectCrudCRUD, mark: number}[] = [];
  extraMarks: {subject: SubjectCrudCRUD, mark: number}[] = [];
}
