import {Injectable} from '@angular/core';

@Injectable()
export class CountryService {

  fetchList(): Promise<string[]> {
    return new Promise((resolve, reject) => resolve(['BY']));
  }
}
