import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { Message, MessageType, MESSAGE_TYPES } from './message';
import { MessagesService } from '../../core/messages/messages.service';

@Component({
    selector: 'app-messages',
    templateUrl: './messages.component.html'
})
export class MessagesComponent {
    messages: Map<MessageType, Message[]> = new Map<MessageType, Message[]>();
    messagesToDisplay: Message[] = [];
    messageTypeToDisplay: MessageType;

    msgINFO: MessageType = MessageType.INFO;
    msgSUCCESS: MessageType = MessageType.SUCCESS;
    msgERROR: MessageType = MessageType.ERROR;
    msgWARNING: MessageType = MessageType.WARNING;

    constructor(
        private messagesService: MessagesService,
        private router: Router) {
            this.onMessageChange();
            this.onNavigationChange();
    }

    isClassEnabled(messageType: MessageType): boolean {
        return this.messageTypeToDisplay === messageType;
    }

    onNavigationChange(): void {
        this.router.events.subscribe((navigation: any) => {
            if (navigation instanceof NavigationEnd) {
                this.messages.forEach((msgs: Message[]) => {
                    for (const msg of msgs) {
                        if (msg.expired) {
                            msgs.splice(msgs.indexOf(msg));
                        } else {
                            msg.expired = true;
                        }
                    }
                });
                this.setMessageToDisplay();
            }
        });
    }

    onMessageChange(): void {
        this.messagesService.source.subscribe((msgs: Message[]) => {
                if (!msgs || msgs.length === 0) {
                    MESSAGE_TYPES.forEach((msgType: MessageType) => {
                        this.messages.set(msgType, []);
                    });
                } else {
                    msgs.forEach(msg => {
                        let category: Message[] = this.messages.get(msg.msgType);
                        if (!category) {
                            category = [];
                            this.messages.set(msg.msgType, category);
                        }
                        category.push(msg);
                    });
                }
                this.setMessageToDisplay();
            });
    }

    setMessageToDisplay(): void {
        for (const msgType of MESSAGE_TYPES) {
            const msgs: Message[] = this.messages.get(msgType);
            if (msgs && msgs.length > 0) {
                this.messagesToDisplay = msgs;
                this.messageTypeToDisplay = msgType;
                return;
            }
        }
        this.messagesToDisplay = [];
        this.messageTypeToDisplay = null;
    }

    clear(type: MessageType): void {
        this.messages.set(type, []);
        this.setMessageToDisplay();
    }

}
