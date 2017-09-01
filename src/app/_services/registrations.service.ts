import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';

import {Registration} from '../_models/registration';
import {RegistrationPeriod} from '../_models/registration-period';
import {ReportTemplate} from '../_models/report-template';

import {defaultOptions, fileOptions, searchOptions} from '../_utils/http.utils';

import * as FileSaver from 'file-saver';

const fileNameRegExp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

@Injectable()
export class RegistrationsService {

  private fetchActivePeriodUrl = 'api/registrations/get-active-period';
  private fetchRegistrationListUrl = 'api/registrations/get-list';
  private fetchReportTemplateUrl = 'api/registrations/get-report-templates';

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

  downloadReport(contractId: number, reportTemplate: ReportTemplate): void {
    this.http.get(
      `api/registrations/get-contract/${contractId}/template/${reportTemplate.id}`,
      fileOptions(reportTemplate.mimeType)).toPromise()
      .then((res: Response) => {
        FileSaver.saveAs(res.blob(), fileNameRegExp.exec(res.headers.get('content-disposition'))[1]);
      });
  }

}
