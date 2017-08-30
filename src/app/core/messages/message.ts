export enum MessageType {
    ERROR, WARNING, SUCCESS, INFO
}

export class Message {
    msgType: MessageType;
    text: string;
    expired: boolean;

    constructor(msgType: MessageType, text: string, expired = true) {
        this.expired = expired;
        this.text = text;
        this.msgType = msgType;
    }
}

export const MESSAGE_TYPES: MessageType[] = [
    MessageType.ERROR,
    MessageType.WARNING,
    MessageType.SUCCESS,
    MessageType.INFO
];
