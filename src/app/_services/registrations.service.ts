import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';

import {Registration} from '../_models/registration';
import {RegistrationPeriod} from '../_models/registration-period';
import {ReportTemplate} from '../_models/report-template';
import {Speciality} from '../_models/speciality';
import {StudyType} from '../_models/study-type';

import {defaultOptions, fileOptions, searchOptions} from '../_utils/http.utils';

import * as FileSaver from 'file-saver';

const fileNameRegExp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

const STUDY_TYPES = [{name: 'A', value: null}, {name: 'B', value: 'B'}, {name: 'P', value: 'P'}];

@Injectable()
export class RegistrationsService {

  private fetchActivePeriodUrl = 'api/registrations/get-active-period';
  private fetchRegistrationListUrl = 'api/registrations/get-list';
  private fetchReportTemplateUrl = 'api/registrations/get-report-templates';
  private fetchSpecialitiesUrl = 'api/specialities/get-list-for-registrations';

  constructor(private http: Http) {}

  fetchRegistrations(params: {name: string, value: any}[]): Promise<Registration[]> {
    return this.http.get(this.fetchRegistrationListUrl, searchOptions(params)).toPromise()
      .then(response => response.json() as Registration[]);
  }

  fetchReportTemplates(): Promise<ReportTemplate[]> {
    return this.http.get(this.fetchReportTemplateUrl, defaultOptions()).toPromise()
      .then(response => response.json() as ReportTemplate[]);
  }

  fetchRegistrationPeriod(): Promise<RegistrationPeriod> {
    return this.http.get(this.fetchActivePeriodUrl, defaultOptions()).toPromise()
      .then(response => response.json() as RegistrationPeriod);
  }

  fetchSpecialities(periodId: number): Promise<Speciality[]> {
    return this.http.get(this.fetchSpecialitiesUrl, searchOptions([{name: 'periodId', value: periodId}])).toPromise()
      .then(response => {
        const specs: Speciality[] = [{id: null, name: ''}];
        return specs.concat(response.json());
      });
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
