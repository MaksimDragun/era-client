import { AuthenticationService } from '../../_services/authentication.service';
import {Component, OnInit} from '@angular/core';
import {Http, Headers, RequestOptions, Response, ResponseContentType} from '@angular/http';

import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-registrations-list',
  templateUrl: './registrations-list.component.html'
})
export class RegistrationsListComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private http: Http) {}

  ngOnInit(): void {}

  downloadReport(): void {
    const options = new RequestOptions(
      {
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
          'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}`
        }),
        responseType: ResponseContentType.Blob
      });

    console.log('download');
    this.http.get('api/get-registration-contract/1000/template/1000', options)
      .toPromise().then((res: Response) => {
        const blob: Blob = res.blob();
        FileSaver.saveAs(blob, 'contract.docx');

      });
  }

}
