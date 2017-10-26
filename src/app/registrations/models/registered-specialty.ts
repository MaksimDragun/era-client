import { ExamSubjectCRUD } from '../../core/certificates/exam-subject-crud';

export class RegisteredSpecialty {
  id: number;
  specialty: string;
  separateByEducationBase: boolean;
  educationBases: string[];
  separateByEducationForm: boolean;
  educationForms: string[];
  separateByFundsSource: boolean;
  fundsSources: string[];
  examSubjectsRule: string;
  examSubjects: ExamSubjectCRUD[][];
}
