import { AccessRightEnum } from './access-right-enum.enum';

export class User {

    userId: number;
    userType: AccessRightEnum;
    isLoggedIn: boolean;
    email: string;
    password: string;
    dateOfBirth: Date;
    dateCreated: Date;
    paidExpiry: Date;
    profileImage: string;

    constructor(userId?: number, userType?: AccessRightEnum, isLoggedIn?: boolean, email?: string, password?: string, dateOfBirth?: Date, dateCreated?: Date, paidExpiry?: Date, profileImage?: string) {
        this.userId = userId;
        this.userType = userType;
        this.isLoggedIn = isLoggedIn;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.dateCreated = dateCreated;
        this.paidExpiry = paidExpiry;
        this.profileImage = profileImage;
    }

}
