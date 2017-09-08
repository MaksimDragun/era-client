import {Injectable} from '@angular/core';
import {Api} from '../http/api.service';
import {defaultOptions} from '../http/http.utils';
import {Subject} from './subject';

@Injectable()
export class CertificationService {

  static fetchSubjectList = 'api/certificate/get-subject-list';

  constructor(private api: Api) {}

  fetchSubjectList(): Promise<Subject[]> {
    return this.api.get(CertificationService.fetchSubjectList, defaultOptions());
  }
}
