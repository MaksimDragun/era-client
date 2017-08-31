import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {TranslateService} from '@ngx-translate/core';

import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

@Injectable()
export class TitleService {

  source: Observable<string>;
  subscriber: Subscriber<string>;

  constructor(private title: Title, private translate: TranslateService) {
    this.source = new Observable((subscriber: Subscriber<string>) => {
      this.subscriber = subscriber;
    });
  }

  setTitle(title: string): void {
    this.subscriber.next(title);
  }

  setTitleKey(titleKey: string): void {
    this.translate.get(titleKey).subscribe(str => this.subscriber.next(str));
  }
}
