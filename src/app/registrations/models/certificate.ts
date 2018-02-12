import {SubjectCRUD} from '../../core/certificates/subject-crud';
import {EducationInstitution} from '../../core/institution/education-institution';

export class Certificate {
  id: number;
  year: number;
  institution: EducationInstitution;
  country: string;
  marks: {subject: SubjectCRUD, mark: number}[];
}
