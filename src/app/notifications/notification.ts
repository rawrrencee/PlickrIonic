export class Notification {

    notificationId: number;
    date: Date;
    readStatus: Boolean;
    content: string;

    constructor(notificationId?: number, date?: Date, readStatus?: Boolean, content?: string) {
        this.notificationId = notificationId;
        this.date = date;
        this.readStatus = readStatus;
        this.content = content;
    }

}
