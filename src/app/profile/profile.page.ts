import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { SessionService } from '../session.service';
import { PhotoService } from '../photo.service';
import { UserService } from '../user.service';
import { Photo } from '../photo';
import { User } from '../user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  private pagePhotos: Photo[] = [];
  private allPhotos: Photo[] = [];

  private pageFriends: User[] = [];
  private allFriends: User[] = [];

  private followingList: User[] = [];
  private followerList: User[] = [];


  userId: number = null;

  currentUser: User;


  constructor(private router: Router,
    public sessionService: SessionService, private photoService: PhotoService, private userService: UserService) {
  }

  ionViewWillEnter() {
    this.photoService.retrieveProfilePagePhotos(this.sessionService.getUserId()).subscribe(
      response => {

        this.pagePhotos = response.photos;
      }, error => {
        //this.retrieveUsersError = true;
        //console.log('getNotificationsOfUser.ts: ' + error);
      }
    );
    this.userService.retrieveUserByUserByUserId(this.sessionService.getUserId()).subscribe(
      response => {
        this.followingList = response.user.followerList;
        this.followerList = response.user.followingList;
      }
    )
    this.userService.retrieveFriends(this.sessionService.getUserId()).subscribe(
      response => {

        this.pageFriends = response.users;
      }, error => {
        //this.retrieveUsersError = true;
        //console.log('getNotificationsOfUser.ts: ' + error);
      }
    );
  }

  ngOnInit() {
    this.photoService.retrieveProfilePagePhotos(this.sessionService.getUserId()).subscribe(
      response => {

        this.pagePhotos = response.photos;
      }, error => {
        //this.retrieveUsersError = true;
        //console.log('getNotificationsOfUser.ts: ' + error);
      }
    );
    this.userService.retrieveFriends(this.sessionService.getUserId()).subscribe(
      response => {

        this.pageFriends = response.users;
      }, error => {
        //this.retrieveUsersError = true;
        //console.log('getNotificationsOfUser.ts: ' + error);
      }
    );
  }

  viewPhotoDetails(event, photo) {
    this.router.navigate(["/photo/viewPhotoDetails/" + photo.photoId]);
  }

  userPhotos(event) {
    this.userId = this.sessionService.getUserId();
    this.router.navigate(["/photo/userPhotos/" + this.userId]);
  }

  friends(event) {
    this.userId = this.sessionService.getUserId();
    this.router.navigate(["/friends/" + this.userId]);
  }

  userLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentUser(null);

    this.router.navigate(['login']);
  }

}
