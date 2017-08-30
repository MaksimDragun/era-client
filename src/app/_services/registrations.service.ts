import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';

import {Registration} from '../_models/registration';
import {ReportTemplate} from '../_models/report-template';

import {defaultOptions, fileOptions} from '../_utils/http.utils';

import * as FileSaver from 'file-saver';

const fileNameRegExp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

@Injectable()
export class RegistrationsService {

  private fetchRegistrationListUrl = 'api/registrations/fetch-list';
  private fetchReportTemplateUrl = 'api/registrations/fetch-report-templates';

  constructor(private http: Http) {}

  fetchRegistrations(): Promise<Registration[]> {
    return this.http.get(this.fetchRegistrationListUrl, defaultOptions()).toPromise()
      .then(response => response.json() as Registration[]);
  }

  fetchReportTemplates(): Promise<ReportTemplate[]> {
    return this.http.get(this.fetchReportTemplateUrl, defaultOptions()).toPromise()
      .then(response => response.json() as ReportTemplate[]);
  }

  downloadReport(contractId: number, reportTemplate: ReportTemplate): void {
    this.http.get(
      `api/get-registration-contract/${contractId}/template/${reportTemplate.id}`,
      fileOptions(reportTemplate.mimeType)).toPromise()
      .then((res: Response) => {
        FileSaver.saveAs(res.blob(), fileNameRegExp.exec(res.headers.get('content-disposition'))[1]);
      });
  }

}
