import {SubjectCRUD} from '../../core/certificates/subject-crud';
import {EducationInstitution} from '../../core/institution/education-institution';
import { AbstractCRUD } from '../../shared/models/abstract-crud';

export class Certificate extends AbstractCRUD {
  id: number;
  year: number;
  institution: EducationInstitution;
  country: string;
  marks: {subject: SubjectCRUD, mark: number}[];
}
