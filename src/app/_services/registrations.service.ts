import {Registration} from '../_models/registration';
import {Injectable} from '@angular/core';

import {AuthenticationService} from './authentication.service';
import {Http, Response} from '@angular/http';

import {defaultOptions, fileOptions} from '../_utils/http.utils';

import * as FileSaver from 'file-saver';

const fileNameRegExp = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

@Injectable()
export class RegistrationsService {

  private fetchRegistrationListUrl = 'api/registrations/fetch-list';
  private downloadContractUrl = 'api/get-registration-contract/1000/template/1000';

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http) {}

  fetchRegistrations(): Promise<Registration[]> {
    return this.http.get(this.fetchRegistrationListUrl, defaultOptions()).toPromise()
      .then(response => response.json() as Registration[]);
  }

  downloadReport(contractId: number, mimeType: string): void {
    this.http.get(this.downloadContractUrl, fileOptions(mimeType)).toPromise()
      .then((res: Response) => {
        FileSaver.saveAs(res.blob(), fileNameRegExp.exec(res.headers.get('content-disposition'))[1]);
      });
  }

}
