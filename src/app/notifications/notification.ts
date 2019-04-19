import { User } from '../user';
import { Interaction } from '../interaction';
import { Photo } from '../photo';

export class Notification {

    notificationId: number;
    dateCreated: Date;
    readStatus: Boolean;
    content: string;
    url: string;
    photo: Photo;
    interaction: Interaction;
    receiver: User;
    sender: User;

    constructor(notificationId?: number, dateCreated?: Date, readStatus?: Boolean, content?: string, photo?: Photo, url?: string, interaction?: Interaction, receiver?: User, sender?: User) {
        this.notificationId = notificationId;
        this.dateCreated = dateCreated;
        this.readStatus = readStatus;
        this.content = content;
        this.url = url;
        this.interaction = interaction;
        this.receiver = receiver;
        this.sender = sender;
    }

}
