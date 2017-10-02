import {Injectable} from '@angular/core';
import {Api} from '../http/api.service';
import {defaultOptions, searchOptions} from '../http/http.utils';
import {EducationInstitution} from './education-institution';

@Injectable()
export class EducationInstitutionService {

  static fetchInstitutionsForRegistrationList = 'api/education-institution/get-list-for-registration';
  static fetchBaseInstitutionList = 'api/education-institution/lookup';

  constructor(private api: Api) {}

  fetchEducationInstitutionForRegistrationList(): Promise<EducationInstitution[]> {
    return this.api.get(EducationInstitutionService.fetchInstitutionsForRegistrationList, defaultOptions());
  }

  fetchInstitutionBaseList(name: string, country: string): Promise<EducationInstitution[]> {
    return this.api.get(EducationInstitutionService.fetchBaseInstitutionList,
      searchOptions([
      {name: 'name', value: name},
      {name: 'country', value: country},
      {name: 'max-size', value: 5}]));
  }
}
