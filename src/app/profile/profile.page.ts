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

  private pagePhotos: Photo[] =[];
  private allPhotos: Photo[] =[];

  private pageFriends: User[] =[];
  private allFriends: User[] =[];

  constructor(private router: Router,
    public sessionService: SessionService, private photoService: PhotoService, private userService: UserService) {
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

  userLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentUser(null);

    this.router.navigate(['login']);
  }

}
