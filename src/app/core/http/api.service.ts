import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {MessagesService} from '../messages/messages.service';
import {Result} from './result';

@Injectable()
export class Api {

  constructor(private http: Http, private messageService: MessagesService) {}

  get<T>(url: string, options?: RequestOptionsArgs): Promise<T> {
    return this.http.get(url, options).toPromise()
      .then(response => {
        const result: Result<T> = response.json() as Result<T>;
        if (result) {
          if (result.issues && result.issues.length !== 0) {
            this.messageService.addIssues(result.issues);
          }
          return result.value;
        }
        return null;
      })
      .catch(error => {
        this.messageService.showErrorMessage(error);
        return null;
      });
  }

  delete<T>(url: string, options?: RequestOptionsArgs): Promise<T> {
    return this.http.delete(url, options).toPromise()
      .then(response => {
        const result: Result<T> = response.json() as Result<T>;
        if (result) {
          if (result.issues && result.issues.length !== 0) {
            this.messageService.addIssues(result.issues);
          }
          return result.value;
        }
        return null;
      })
      .catch(error => {
        this.messageService.showErrorMessage(error);
        return null;
      });
  }

  post<T>(url: string, body: any, options: RequestOptionsArgs): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.http.post(url, body, options).toPromise()
        .then(response => {
          const result: Result<T> = response.json() as Result<T>;
          if (result) {
            if (result.issues && result.issues.length !== 0) {
              this.messageService.addIssues(result.issues);
              reject({issues: result.issues, error: null});
            }
            return resolve(result.value);
          }
          return reject({issues: [], error: null});
        })
        .catch(error => {
          this.messageService.showErrorMessage(error);
          reject({issues: [], error: error});
        });
    });
  }

}
