import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Message} from './message';

@Injectable()
export class FieldMessagesService {

  private subject: Subject<Map<string, Message[]>>;

  constructor() {
    this.subject = new Subject<Map<string, Message[]>>();
  }

  reset(): void {
    this.subject.next();
  }

  subscribe(subscriber): void {
    this.subject.subscribe(subscriber);
  }

  next(issues: Map<string, Message[]>): void {
    this.subject.next(issues);
  }

}
