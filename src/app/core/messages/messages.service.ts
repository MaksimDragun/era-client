import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {Subscriber} from 'rxjs/Subscriber';

import {Message, MessageType} from './message';

@Injectable()
export class MessagesService {

  source: Observable<Message[]>;
  subscriber: Subscriber<Message[]>;
  buffer: Message[] = [];

  constructor() {
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

  reset(): void {
    this.subscriber ? this.subscriber.next([]) : this.buffer = [];
  }

  showErrorMessage(response: any): void {
    this.addMessage({
      msgType: MessageType.ERROR,
      key: 'errors.server-error',
      expired: true,
      params: {'status': response.status, 'description': response.statusText}
    });
  }

}
