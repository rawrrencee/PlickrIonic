import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';

import { PhotoService } from '../../photo.service';
import { UserService } from '../../user.service';
import { Photo } from '../../photo';
import { User } from '../../user';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.page.html',
  styleUrls: ['./user-photos.page.scss'],
})
export class UserPhotosPage implements OnInit {

  userId: number;

  private allPhotos: Photo[] =[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,				
    private photoService: PhotoService,
    private userService: UserService,
    public alertController: AlertController,
    private location: Location) { }

  ngOnInit() {
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId'));
    this.photoService.retrieveUserPhotos(this.userId).subscribe(
      response => {
        
        this.allPhotos = response.photos;
      }, error => {
        //this.retrieveUsersError = true;
        //console.log('getNotificationsOfUser.ts: ' + error);
      }
    );
  }
  doRefresh(event) {
    console.log('Begin async operation');

    window.location.reload();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2500);
  }
  
  viewPhotoDetails(event, photo) {
    this.router.navigate(["/photo/viewPhotoDetails/" + photo.photoId]);
  }
}
