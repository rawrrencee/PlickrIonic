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

  photos: Photo[] = [];

  photosLoaded: Photo[] = [];


  retrieveUsersError: boolean;
  currentIndexLoaded: number = 0;
  lastIndexLoaded: number;
  count: number = 0;

  constructor(private router: Router, private alertController: AlertController, private photoService: PhotoService, private userService: UserService, private sessionService: SessionService) {
    this.retrieveUsersError = false;
  }

  ionViewWillEnter() {
    this.getFirst5Feed();
  }

  ngOnInit() {
    this.getFeed();
  }

  getFeed() {
    this.photoService.retrieveFriendsOnlyAndPublicPhotosByUser(this.sessionService.getUserId()).subscribe(
      response => {
        for (let photo of response.photos) {

          this.userService.retrieveUserByPhoto(photo.photoId).subscribe(
            response => {

              photo.user = response.user;
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

  getFirst5Feed() {
    for (let i = 0; i < 5; i++) {
      if (this.photos[i] != null) {
        this.photosLoaded[i] = this.photos[i];
      }
      this.lastIndexLoaded = i;
    }
    console.log('first 5 feed: lastIndexLoaded = ' + this.lastIndexLoaded);
  }

  getNext5Feed(event) {
    setTimeout(() => {
      if (this.photosLoaded.length == this.photos.length) {
        this.count = 0;
        console.log('Disabled');
        event.target.disabled = true;
      }
      for (let i = this.lastIndexLoaded; i < this.photos.length; i++) {
        if (this.count == 5) {
          this.lastIndexLoaded = i;
          this.count = 0;
          break;
        }
        if (i + this.count >= this.photos.length) {
          while (i < this.photos.length) {
            this.photosLoaded[i] = this.photos[i];
            i++;
          }
          this.lastIndexLoaded = i;
          console.log('last index loaded:' + this.lastIndexLoaded);
          this.count = 0;
          break;
        }
        this.photosLoaded[i] = this.photos[i];
        this.count++;
      }
      console.log('Done');
      event.target.complete();
    }, 500);
  }


  viewPhotoDetails(event, photo) {
    this.router.navigate(["/photo/viewPhotoDetails/" + photo.photoId]);
  }

  viewUserDetails(event, user) {
    this.router.navigate(["../viewProfilePage/" + user.userId]);
  }

  doRefresh(event) {
    console.log('Begin async operation');

    window.location.reload();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2500);
  }

  viewComments(event, photo) {
    this.router.navigate(["/comment/" + photo.photoId]);
  }
}


