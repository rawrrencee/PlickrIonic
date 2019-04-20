import { PrivacyLevelEnum } from './privacy-level-enum.enum';
import { User } from './user';

export class Photo {
    photoId: number;
    name: string;
    description: string;
    url: string;
    dateUploaded: Date;
    privacyLevel: PrivacyLevelEnum;
    user: User;


    constructor(photoId?: number, name?: string, description?: string, url?: string, dateUploaded?: Date, privacyLevel?: PrivacyLevelEnum, user?: User) {
        this.photoId = photoId;
        this.name = name;
        this.description = description;
        this.url = url;
        this.dateUploaded = dateUploaded;
        this.privacyLevel = privacyLevel;
        this.user = user;
    }
}


