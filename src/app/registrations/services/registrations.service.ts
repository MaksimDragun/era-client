import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';

import {defaultOptions, fileOptions, searchOptions} from '../../core/http/http.utils';
import {Result} from '../../core/http/result';
import {Api} from '../../core/http/api.service';
import {Registration, ReportTemplate, RegistrationPeriod, Speciality, StudyType} from '../models';

import * as FileSaver from 'file-saver';

const fileNameRegExp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

const STUDY_TYPES = [{name: 'A', value: null}, {name: 'B', value: 'B'}, {name: 'P', value: 'P'}];

@Injectable()
export class RegistrationsService {

  private fetchActivePeriodUrl = 'api/registrations/get-active-period';
  private fetchRegistrationListUrl = 'api/registrations/get-list';
  private fetchReportTemplateUrl = 'api/registrations/get-report-templates';
  private fetchSpecialitiesUrl = 'api/specialities/get-list-for-registrations';

  constructor(private api: Api, private http: Http) {}

  fetchRegistrations(params: {name: string, value: any}[]): Promise<Registration[]> {
    return this.api.get(this.fetchRegistrationListUrl, searchOptions(params));
  }

  fetchReportTemplates(): Promise<ReportTemplate[]> {
    return this.api.get(this.fetchReportTemplateUrl, defaultOptions());
  }

  fetchRegistrationPeriod(): Promise<RegistrationPeriod> {
    return this.api.get(this.fetchActivePeriodUrl, defaultOptions());
  }

  fetchSpecialities(periodId: number): Promise<Speciality[]> {
    return this.api.get(this.fetchSpecialitiesUrl, searchOptions([{name: 'periodId', value: periodId}]))
      .then((specs: Speciality[]) => [{id: null, name: ''}].concat(specs));
  }

  getStudyTypeList(): Promise<StudyType[]> {
    return new Promise<StudyType[]>((resolve, reject) => resolve(STUDY_TYPES));
  }

  downloadReport(contractId: number, reportTemplate: ReportTemplate): void {
    this.http.get(
      `api/registrations/get-contract/${contractId}/template/${reportTemplate.id}`,
      fileOptions(reportTemplate.mimeType)).toPromise()
      .then((res: Response) => {
        FileSaver.saveAs(res.blob(), fileNameRegExp.exec(res.headers.get('content-disposition'))[1]);
      });
  }

}
