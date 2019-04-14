import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { PhotoService } from '../photo.service';
import { Photo } from '../photo';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-feed',
  templateUrl: 'feed.page.html',
  styleUrls: ['feed.page.scss']
})
export class FeedPage implements OnInit {

  photos: Photo[];

  constructor(private router: Router, private alertController: AlertController, private photoService: PhotoService) {

  }
  ngOnInit() {
    this.photoService.retrieveAllPhotos().subscribe(
      response => {
        this.photos = response.photoEntities;
      },
      error => {
        console.log('********** FeedPage.ts: ' + error);
      }
    );
  }
}


