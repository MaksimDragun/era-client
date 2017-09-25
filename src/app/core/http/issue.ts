export class Issue {

  static WARNING = 'WARNING';
  static ERROR = 'ERROR';

  errorCode: string;
  params: any[];
  type: string;
  fieldId?: string;
}
