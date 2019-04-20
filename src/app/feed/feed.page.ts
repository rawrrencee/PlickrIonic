import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PhotoService } from '../photo.service';
import { UserService } from '../user.service';
import { Photo } from '../photo';
import { AlertController } from '@ionic/angular';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})
export class FeedPage implements OnInit {

  photos: Photo[];

  retrieveUsersError: boolean;

  constructor(private router: Router, private alertController: AlertController, private photoService: PhotoService, private userService: UserService, private sessionService: SessionService) {
    this.retrieveUsersError = false;
  }
  ngOnInit() {

    this.photoService.retrieveFriendsOnlyAndPublicPhotosByUser(this.sessionService.getUserId()).subscribe(
      response => {
        for (let photo of response.photos) {

          this.userService.retrieveUserByPhoto(photo.photoId).subscribe(
            response => {

              photo.user = response.user;
              console.log(photo.description);
            }, error => {
              this.retrieveUsersError = true;
              console.log('getNotificationsOfUser.ts: ' + error);
            }
          );
        }
        this.photos = response.photos;
      }, error => {
        this.retrieveUsersError = true;
        //console.log('getNotificationsOfUser.ts: ' + error);
      }
    );

  }
  viewPhotoDetails(event, photo) {
    this.router.navigate(["/photo/viewPhotoDetails/" + photo.photoId]);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    window.location.reload();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2500);
  }
}


