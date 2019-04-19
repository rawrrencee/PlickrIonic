import { UserTypeEnum } from './user-type-enum.enum';

export class User {

    userId: number;
    userType: UserTypeEnum;
    firstName: string;
    lastName: string;
    shippingAddress1: string;
    shippingAddress2: string;
    billingAddress1: string;
    billingAddress2: string;
    email: string;
    password: string;
    dateOfBirth: string;
    dateCreated: Date;
    paidExpiry: Date;
    profileImage: string;
    followingList: User[];
    followerList: User[];

    constructor(userId?: number, userType?: UserTypeEnum, firstName?: string, lastName?: string, shippingAddress1?: string, shippingAddress2?: string, billingAddress1?: string, billingAddress2?: string, email?: string, password?: string, dateOfBirth?: string, dateCreated?: Date, paidExpiry?: Date, profileImage?: string, followingList?: User[], followerList?: User[]) {
        this.userId = userId;
        this.userType = userType;
        this.firstName = firstName;
        this.lastName = lastName;
        this.shippingAddress1 = shippingAddress1;
        this.shippingAddress2 = shippingAddress2;
        this.billingAddress1 = billingAddress1;
        this.billingAddress2 = billingAddress2;
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
