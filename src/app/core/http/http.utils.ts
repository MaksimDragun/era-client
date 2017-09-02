import {Headers, ResponseContentType, RequestOptions, RequestOptionsArgs, URLSearchParams} from '@angular/http';

export function defaultOptions(responseType = ResponseContentType.Json, acceptHeader?: string): RequestOptionsArgs {
  return {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}`,
      'Accept': acceptHeader
    }),
    responseType: ResponseContentType.Json
  };
}

export function searchOptions(params: {name: string, value: any}[]): RequestOptionsArgs {
  const urlParams: URLSearchParams = new URLSearchParams();
  params.forEach(param => urlParams.set(param.name, param.value));
  return {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}`
    }),
    responseType: ResponseContentType.Json,
    params: urlParams
  };
}

export function fileOptions(acceptHeader: string): RequestOptionsArgs {
  return {
    headers: new Headers({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('currentUserToken')}`,
      'Accept': acceptHeader
    }),
    responseType: ResponseContentType.Blob
  };
}


