import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

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
  retrieveNotificationsError: boolean;

  constructor(private router: ActivatedRoute,
    private notificationsService: NotificationsService,
    private photoService: PhotoService) {
    this.retrieveNotificationsError = false;
  }

  ngOnInit(): void {

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

}
