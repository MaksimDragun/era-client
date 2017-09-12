import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {Issue} from '../http/issue';
import {FieldMessagesService} from './field-messages.service';
import {Message, MessageType} from './message';

@Injectable()
export class MessagesService {

  source: Observable<Message[]>;
  subscriber: Subscriber<Message[]>;
  buffer: Message[] = [];

  constructor(private fieldMessagesService: FieldMessagesService) {
    this.source = new Observable((subscriber: Subscriber<Message[]>) => {
      this.subscriber = subscriber;
      if (this.buffer) {
        this.subscriber.next(this.buffer);
        this.buffer = [];
      }
    });
  }

  addMessage(msg: Message): void {
    this.subscriber ? this.subscriber.next([msg]) : this.buffer.push(msg);
  }

  addMessages(msgs: Message[]): void {
    this.subscriber ? this.subscriber.next(msgs) : this.buffer.concat(msgs);
  }

  addIssues(issues: Issue[]): void {
    this.fieldMessagesService.reset();
    const fieldIssuesMap: Map<string, Message[]> = new Map();
    this.addMessages(issues.map(issue => {
      const msg = {
        msgType: MessageType.ERROR,
        key: issue.errorCode,
        params: issue.params,
        expired: true
      };
      if (issue.fieldId) {
        let messages = fieldIssuesMap.get(issue.fieldId);
        if (!messages) {
          messages = [];
          fieldIssuesMap.set(issue.fieldId, messages);
        }
        messages.push(msg);
      }
      return msg;
    }));
    this.fieldMessagesService.next(fieldIssuesMap);
  }

  reset(): void {
    this.fieldMessagesService.reset();
    this.subscriber ? this.subscriber.next([]) : this.buffer = [];
  }

  showErrorMessage(response: any): void {
    this.addMessage({
      msgType: MessageType.ERROR,
      key: 'errors.server-error.' + response.status,
      expired: true
    });
  }

}
