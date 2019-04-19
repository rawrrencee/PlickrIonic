import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';

import { PhotoService } from '../../photo.service';
import { Photo } from '../../photo';
import { PrivacyLevelEnum } from 'src/app/privacy-level-enum.enum';

@Component({
  selector: 'app-view-photo-details',
  templateUrl: './view-photo-details.page.html',
  styleUrls: ['./view-photo-details.page.scss'],
})
export class ViewPhotoDetailsPage implements OnInit {

  photoId: number;
  name: string;
  description: string;
  dateUploaded: Date;
  privacyLevel: PrivacyLevelEnum;

  photoToView: Photo;

  retrievePhotoError: boolean;
  error: boolean;
	errorMessage: string;
	resultSuccess: boolean;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,				
    private photoService: PhotoService,
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
  }

}
