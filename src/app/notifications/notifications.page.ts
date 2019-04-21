import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { IonInfiniteScroll } from '@ionic/angular';

import { AlertController } from '@ionic/angular';

import { PhotoService } from '../photo.service';
import { NotificationsService } from '../notifications/notifications.service';
import { Photo } from '../photo';
import { Notification } from '../notifications/notification';


@Component({
  selector: 'app-notifications',
  templateUrl: 'notifications.page.html',
  styleUrls: ['notifications.page.scss']
})
export class NotificationsPage implements OnInit {

  public notifications: Notification[] = [];
  private activatedRoute: ActivatedRoute;
  private router: Router;
  private notificationsService: NotificationsService;
  private photoService: PhotoService;
  private retrieveNotificationsError: boolean;

  notifsLoaded: Notification[] = [];
  currentIndexLoaded: number = 0;
  lastIndexLoaded: number = 0;
  count: number = 0;

  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  constructor(activatedRoute: ActivatedRoute,
    router: Router,
    notificationsService: NotificationsService,
    photoService: PhotoService) {
    this.activatedRoute = activatedRoute;
    this.router = router;
    this.notificationsService = notificationsService;
    this.photoService = photoService;
    this.retrieveNotificationsError = false;
  }

  ionViewWillEnter() {
    this.getFirst10Notifications();
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications() {
    this.notificationsService.getNotificationsOfUser().subscribe(
      response => {
        for (let notification of response.notifications) {
          console.log(notification.interaction.interactionId);
          this.photoService.retrievePhotoByInteractionId(notification.interaction.interactionId).subscribe(
            response => {
              notification.url = response.photo.url;
              notification.photo = response.photo;
              console.log(notification.url);
            }, error => {
              this.retrieveNotificationsError = true;
              console.log('getNotificationsOfUser.ts: ' + error);
            }
          );
        }
        this.notifications = response.notifications;
      }, error => {
        this.retrieveNotificationsError = true;
        console.log('getNotificationsOfUser.ts: ' + error);
      }
    );
  }

  getFirst10Notifications() {
    for (let i = 0; i < 10; i++) {
      if (this.notifications[i] != null) {
        this.notifsLoaded[i] = this.notifications[i];
      }
      this.lastIndexLoaded = i;
    }
    console.log('first 10 notif: lastIndexLoaded = ' + this.lastIndexLoaded);
  }

  serve10Notifications(event) {
    setTimeout(() => {
      if (this.notifsLoaded.length == this.notifications.length) {
        this.count = 0;
        console.log('Disabled');
        event.target.disabled = true;
      }
      for (let i = this.lastIndexLoaded; i < this.notifications.length; i++) {
        if (this.count == 10) {
          this.lastIndexLoaded = i;
          this.count = 0;
          break;
        }
        if (i + this.count >= this.notifications.length) {
          while (i < this.notifications.length) {
            this.notifsLoaded[i] = this.notifications[i];
            i++;
          }
          this.lastIndexLoaded = i;
          console.log('last index loaded:' + this.lastIndexLoaded);
          this.count = 0;
          break;
        }
        this.notifsLoaded[i] = this.notifications[i];
        this.count++;
      }
      console.log('Done');
      event.target.complete();
    }, 500);
  }

  viewPhotoDetails(event, photo) {
    this.router.navigate(["/photo/viewPhotoDetails/" + photo.photoId]);
  }

}
