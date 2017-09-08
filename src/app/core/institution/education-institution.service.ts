import {Injectable} from '@angular/core';
import {Api} from '../http/api.service';
import {defaultOptions} from '../http/http.utils';
import {EducationInstitution} from './education-institution';

@Injectable()
export class EducationInstitutionService {

  static fetchInstitutionsForRegistrationList = 'api/education-institution/get-list-for-registration';

  constructor(private api: Api) {}

  fetchEducationInstitutionForRegistrationList(): Promise<EducationInstitution[]> {
    return this.api.get(EducationInstitutionService.fetchInstitutionsForRegistrationList, defaultOptions());
  }
}
