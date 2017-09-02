import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';

import {MessagesService} from '../messages/messages.service';
import {Result} from './result';

@Injectable()
export class Api {

  constructor(private http: Http, private messageService: MessagesService) {}

  get<T>(url: string, options?: RequestOptionsArgs): Promise<T> {
    return this.http.get(url, options).toPromise()
      .then(this.successResponse)
      .catch(this.errorResponse);
  }

  post<T>(url: string, body: any, options: RequestOptionsArgs): Promise<T> {
    return this.http.post(url, body, options).toPromise()
      .then(this.successResponse)
      .catch(this.errorResponse);
  }

  private errorResponse<T>(error: any): T {
    this.messageService.showErrorMessage(error);
    return null;
  }

  private successResponse<T>(response: Response): T {
    const result: Result<T> = response.json() as Result<T>;
    if (result) {
      if (!result.issues || result.issues.length === 0) {
        return result.value;
      }
      this.messageService.addIssues(result.issues);
    }
    return null;
  }
}
