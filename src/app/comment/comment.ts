import { User } from '../user';

export class Comment {

    commentId: number;
    description: string;
    time: Date;
    user: User;

    constructor(commentId?: number, description?: string, time?: Date, user?: User){
        this.commentId = commentId;
        this.description = description;
        this.time = time;
        this.user = user;
    }

}