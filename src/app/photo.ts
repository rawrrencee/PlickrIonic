import { PrivacyLevelEnum } from './privacy-level-enum.enum';

export class Photo {
    photoId: number;
    name: string;
    description: string;
    url: string;
    dateUploaded: Date;
    privacyLevel: PrivacyLevelEnum;

    constructor(photoId?: number, name?: string, description?: string, url?: string, dateUploaded?: Date, privacyLevel?: PrivacyLevelEnum) {
        this.photoId = photoId;
        this.name = name;
        this.description = description;
        this.url = url;
        this.dateUploaded = dateUploaded;
        this.privacyLevel = privacyLevel;
    }
}


