import { UserTypeEnum } from './user-type-enum.enum';

export class User {

    userId: number;
    userType: UserTypeEnum;
    isLoggedIn: boolean;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    dateOfBirth: string;
    dateCreated: Date;
    paidExpiry: Date;
    profileImage: string;
    followingList: User[];
    followerList: User[];

    constructor(userId?: number, userType?: UserTypeEnum, isLoggedIn?: boolean, firstName?: string, lastName?: string, email?: string, password?: string, dateOfBirth?: string, dateCreated?: Date, paidExpiry?: Date, profileImage?: string, followingList?: User[], followerList?: User[]) {
        this.userId = userId;
        this.userType = userType;
        this.isLoggedIn = isLoggedIn;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.dateCreated = dateCreated;
        this.paidExpiry = paidExpiry;
        this.profileImage = profileImage;
        this.followerList = followerList;
        this.followingList = followingList;
    }

}
