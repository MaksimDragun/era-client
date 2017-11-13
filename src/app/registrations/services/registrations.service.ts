import {Injectable} from '@angular/core';

import {Http, Response} from '@angular/http';

import {defaultOptions, fileOptions, searchOptions} from '../../core/http/http.utils';
import {Result} from '../../core/http/result';
import {Api} from '../../core/http/api.service';
import {Benefit} from '../models/benefit';
import {FundsSource} from '../models/funds-source';
import {Registration} from '../models/registration';
import {RegistrationCRUD} from '../models/registration-crud';
import {RegistrationDetails} from '../models/registration-details';
import {RegistrationPeriod} from '../models/registration-period';
import {ReportTemplate} from '../models/report-template';
import {Specialty} from '../models/specialty';

import * as FileSaver from 'file-saver';

const STUDY_TYPES = [{name: 'A', value: null}, {name: 'B', value: 'B'}, {name: 'P', value: 'P'}];

@Injectable()
export class RegistrationsService {

  static approveRegistrationUrl = 'api/registrations/approve';
  static cancelRegistrationUrl = 'api/registrations/cancel';
  static createRegistrationUrl = 'api/registrations/create';
  static fetchActivePeriodUrl = 'api/registrations/get-active-periods';
  static fetchPeriodListUrl = 'api/registrations/get-periods';
  static fetchBenefitListUrl = 'api/registrations/get-benefits';
  private fetchRegistrationListUrl = 'api/registrations/get-list';
  private fetchSpecialtiesUrl = 'api/specialties/get-list-for-registrations';

  constructor(private api: Api, private http: Http) {}

  fetchRegistrations(params: {name: string, value: any}[]): Promise<Registration[]> {
    return this.api.get(this.fetchRegistrationListUrl, searchOptions(params));
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

  downloadReport(registrationId: number): void {
    this.api.get(`api/registrations/get-contract-info/${registrationId}`, defaultOptions())
      .then((template: ReportTemplate) => {
        this.http.get(
          `api/registrations/download-contract/${registrationId}`, fileOptions(template.mimeType)).toPromise()
          .then((res: Response) => {
            FileSaver.saveAs(res.blob(), template.fileName);
          });
      });

  }

  fetchActiveRegistrationPeriods(): Promise<RegistrationPeriod[]> {
    return this.api.get(RegistrationsService.fetchActivePeriodUrl, defaultOptions());
  }

  fetchRegistrationPeriodList(): Promise<RegistrationPeriod[]> {
    return this.api.get(RegistrationsService.fetchPeriodListUrl, defaultOptions());
  }

  fetchDetails(id: number): Promise<RegistrationCRUD> {
    return this.api.get(`api/registrations/get-details/${id}`, defaultOptions());
  }

  approveRegistration(registration: RegistrationCRUD): Promise<RegistrationCRUD> {
    return this.api.post(RegistrationsService.approveRegistrationUrl, registration, defaultOptions());
  }

   cancelRegistration(registration: RegistrationCRUD): Promise<RegistrationCRUD> {
    return this.api.post(RegistrationsService.cancelRegistrationUrl, registration, defaultOptions());
  }
}
