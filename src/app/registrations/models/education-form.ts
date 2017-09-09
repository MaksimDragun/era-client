export class EducationForm {
  name: string;
  value: string;
}

const FULL_TIME: EducationForm = {name: 'F', value: 'F'};
const EXTRAMURAL: EducationForm = {name: 'E', value: 'E'};

export const EDUCATION_FORM_LIST: EducationForm[] = [FULL_TIME, EXTRAMURAL];
