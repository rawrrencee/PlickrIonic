import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';

import { PhotoService } from '../../photo.service';
import { UserService } from '../../user.service';
import { Photo } from '../../photo';
import { User } from '../../user';
import { PrivacyLevelEnum } from 'src/app/privacy-level-enum.enum';

@Component({
  selector: 'app-edit-photo-details',
  templateUrl: './edit-photo-details.page.html',
  styleUrls: ['./edit-photo-details.page.scss'],
})
export class EditPhotoDetailsPage implements OnInit {

  photoId: number;
  name: string;
  description: string;
  dateUploaded: Date;
  privacyLevel: PrivacyLevelEnum;

  public uploader: User = new User();
  retrieveUserError: boolean;

  public photoToView: Photo = new Photo();
  retrievePhotoError: boolean;

  error: boolean;
	errorMessage: string;
	resultSuccess: boolean;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,				
    private photoService: PhotoService,
    private userService: UserService,
    public alertController: AlertController,
    private location: Location) { 
      this.retrievePhotoError = false;
      this.error = false;
      this.resultSuccess = false;
    }

    ngOnInit() {
      this.photoId = parseInt(this.activatedRoute.snapshot.paramMap.get('photoId'));
  
      this.photoService.retrievePhotoDetails(this.photoId).subscribe(
        response => {
          this.photoToView = response.photo;
        }, error => {
          this.retrievePhotoError = true;
          console.log('viewPhotoDetails.ts: ' + error);
        }
      );
  
      this.userService.retrievePhotoUploader(this.photoId).subscribe(
        response => {
          this.uploader = response.user;
        }, error => {
          this.retrieveUserError = true;
          console.log('viewPhotoDetails.ts: ' + error);
        }
      );
    }

}
