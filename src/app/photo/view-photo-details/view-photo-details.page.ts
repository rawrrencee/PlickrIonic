import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';

import { PhotoService } from '../../photo.service';
import { UserService } from '../../user.service';
import { SessionService } from '../../session.service';
import { ShoppingCartService } from '../../shoppingcart.service';
import { Photo } from '../../photo';
import { User } from '../../user';
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
    private shoppingCartService: ShoppingCartService,
    public sessionService: SessionService,
    public alertController: AlertController,
    private location: Location) {
    this.retrievePhotoError = false;
    this.error = false;
    this.resultSuccess = false;
  }

  ionViewWillEnter() {
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

  editPhotoDetails(event) {
    this.router.navigate(["photo/editphotodetails/" + this.photoToView.photoId]);
  }

  addToCart(item) {
    this.shoppingCartService.addPhoto(item);
    this.router.navigate(['shoppingcart']);
  }

  viewComments(event, photo) {
    this.router.navigate(["/comment/" + photo.photoId]);
  }
}
