import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';

import {defaultOptions, fileOptions, searchOptions} from '../../core/http/http.utils';
import {Result} from '../../core/http/result';
import {Api} from '../../core/http/api.service';
import {Benefit} from '../models/Benefit';
import {FundsSource} from '../models/funds-source';
import {Registration} from '../models/registration';
import {RegistrationCRUD} from '../models/registration-crud';
import {RegistrationPeriod} from '../models/registration-period';
import {ReportTemplate} from '../models/report-template';
import {Specialty} from '../models/specialty';

import * as FileSaver from 'file-saver';

const STUDY_TYPES = [{name: 'A', value: null}, {name: 'B', value: 'B'}, {name: 'P', value: 'P'}];

@Injectable()
export class RegistrationsService {

  static createRegistrationUrl = 'api/registrations/create';
  static fetchActivePeriodUrl = 'api/registrations/get-active-period';
  static fetchPeriodListUrl = 'api/registrations/get-periods';
  static fetchBenefitListUrl = 'api/registrations/get-benefits';
  private fetchRegistrationListUrl = 'api/registrations/get-list';
  private fetchReportTemplateUrl = 'api/registrations/get-report-templates';
  private fetchSpecialtiesUrl = 'api/specialties/get-list-for-registrations';

  constructor(private api: Api, private http: Http) {}

  fetchRegistrations(params: {name: string, value: any}[]): Promise<Registration[]> {
    return this.api.get(this.fetchRegistrationListUrl, searchOptions(params));
  }

  fetchReportTemplates(): Promise<ReportTemplate[]> {
    return this.api.get(this.fetchReportTemplateUrl, defaultOptions());
  }

  fetchSpecialties(periodId: number): Promise<Specialty[]> {
    return this.api.get(this.fetchSpecialtiesUrl, searchOptions([{name: 'periodId', value: periodId}]))
      .then((specs: Specialty[]) => [{id: null, name: ''}].concat(specs));
  }

  fetchBenefits(): Promise<{prerogatives: Benefit[], outOfCompetitions: Benefit[]}> {
    return this.api.get(RegistrationsService.fetchBenefitListUrl, defaultOptions());
  }

  createRegistration(registration: RegistrationCRUD): Promise<RegistrationCRUD> {
    return this.api.post(RegistrationsService.createRegistrationUrl, registration, defaultOptions());
  }

  downloadReport(contractId: number, reportTemplate: ReportTemplate): void {
    this.http.get(
      `api/registrations/get-contract/${contractId}/template/${reportTemplate.id}`,
      fileOptions(reportTemplate.mimeType)).toPromise()
      .then((res: Response) => {
        FileSaver.saveAs(res.blob(), reportTemplate.fileName);
      });
  }

  fetchRegistrationPeriod(): Promise<RegistrationPeriod> {
    return this.api.get(RegistrationsService.fetchActivePeriodUrl, defaultOptions());
  }

  fetchRegistrationPeriodList(): Promise<RegistrationPeriod[]> {
    return this.api.get(RegistrationsService.fetchPeriodListUrl, defaultOptions());
  }

}
