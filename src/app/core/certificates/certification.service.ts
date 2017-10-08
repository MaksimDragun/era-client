import {Injectable} from '@angular/core';
import {Api} from '../http/api.service';
import {defaultOptions} from '../http/http.utils';
import {SubjectCRUD} from './subject-crud';

@Injectable()
export class CertificationService {

  static fetchSubjectList = 'api/certificate/get-subject-list';

  constructor(private api: Api) {}

  fetchSubjectList(): Promise<SubjectCRUD[]> {
    return this.api.get(CertificationService.fetchSubjectList, defaultOptions());
  }
}
