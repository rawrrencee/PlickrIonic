import { InteractionTypeEnum } from './interaction-type-enum.enum';
import { Photo } from './photo';
import { User } from './user';

export class Interaction {

    interactionId: number;
    dateCreated: Date;
    interactionType: InteractionTypeEnum;
    photo: Photo;
    user: User;

    constructor(interactionId?: number, dateCreated?: Date, interactionType?: InteractionTypeEnum, photo?: Photo, user?: User) {
        this.interactionId = interactionId;
        this.dateCreated = dateCreated;
        this.interactionType = interactionType;
        this.photo = photo;
        this.user = user;
    }
}
