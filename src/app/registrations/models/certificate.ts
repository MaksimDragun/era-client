import {SubjectCRUD} from '../../core/certificates/subject-crud';
import {EducationInstitution} from '../../core/institution/education-institution';

export class Certificate {
  id: number;
  year: number;
  institution: string;
  country: string;
  marks: Map<String, number>;
}
