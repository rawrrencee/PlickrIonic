import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';

import { PhotoService } from '../photo.service';
import { UserService } from '../user.service';
import { SessionService } from '../session.service';
import { Photo } from '../photo';
import { User } from '../user';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.page.html',
  styleUrls: ['./view-profile.page.scss'],
})
export class ViewProfilePage implements OnInit {

  userId: number;
  public viewUser: User = new User();

  private pagePhotos: Photo[] = [];
  private allPhotos: Photo[] = [];

  private pageFriends: User[] = [];
  private allFriends: User[] = [];

  private followingList: User[] = [];
  private followerList: User[] = [];

  retrieveUserError: boolean;
  error: boolean;
  errorMessage: string;
  resultSuccess: boolean;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private userService: UserService,
    public sessionService: SessionService,
    public alertController: AlertController,
    private location: Location) {
      this.retrieveUserError = false;
      this.error = false;
      this.resultSuccess = false;
  }

  ionViewWillEnter() {
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId'));

    this.userService.retrieveUserByUserByUserId(this.userId).subscribe(
      response => {
        this.viewUser = response.user;
        this.followerList = response.user.followerList;
        this.followingList = response.user.followerList;
        
      }, error => {
        this.retrieveUserError = true;
        console.log('viewProfilePage.ts: '+error);
      }
    )
    this.userService.retrieveFriends(this.userId).subscribe(
      response => {
        this.pageFriends = response.users;
      }, error => {
        this.retrieveUserError = true;
        console.log('viewProfilePage.ts'+error);
      }
    );

    this.photoService.retrieveProfilePagePhotos(this.userId).subscribe(response => {
      this.pagePhotos = response.photos;
    }, error => {
      this.retrieveUserError = true;
      console.log('viewProfilePage.ts'+error);
    });
  }

  ngOnInit() {
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId'));

    this.userService.retrieveUserByUserByUserId(this.userId).subscribe(
      response => {
        this.viewUser = response.user;
        this.followerList = response.user.followerList;
        this.followingList = response.user.followerList;
      }, error => {
        this.retrieveUserError = true;
        console.log('viewProfilePage.ts: '+error);
      }
    );

    this.photoService.retrieveProfilePagePhotos(this.userId).subscribe(response => {
      this.pagePhotos = response.photos;
    }, error => {
      this.retrieveUserError = true;
      console.log('viewProfilePage.ts'+error);
    });

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
    this.router.navigate(["/photo/userPhotos/" + this.userId]);
  }

  friends(event) {
    this.router.navigate(["/friends/" + this.userId]);
  }

  viewUserDetails(event, user) {
    this.router.navigate(["../viewProfilePage/" + user.userId]);
  }

}
