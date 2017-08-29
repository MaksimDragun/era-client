import {Headers, ResponseContentType, RequestOptions} from '@angular/http';

export function defaultOptions(responseType = ResponseContentType.Json, acceptHeader?: string): RequestOptions {
  return new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}`,
      'Accept': acceptHeader
    }),
    responseType: ResponseContentType.Json
  });
}

export function fileOptions(acceptHeader: string): RequestOptions {
  return new RequestOptions({
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}`,
      'Accept': acceptHeader
    }),
    responseType: ResponseContentType.Blob
  });
}


