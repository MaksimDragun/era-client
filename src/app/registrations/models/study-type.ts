export class StudyType {
  name: string;
  value: string;
}

const ALL: StudyType = {name: 'A', value: undefined};
const BUDGET: StudyType = {name: 'B', value: 'B'};
const PAID: StudyType = {name: 'P', value: 'P'};

export const STUDY_TYPES: StudyType[] = [BUDGET, PAID];
export const STUDY_TYPES_FOR_SEARCH: StudyType[] = [ALL, BUDGET, PAID];
