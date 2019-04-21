import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';

import { PhotoService } from '../photo.service';
import { UserService } from '../user.service';
import { SessionService } from '../session.service';
import { Photo } from '../photo';
import { User } from '../user';
import { PrivacyLevelEnum } from 'src/app/privacy-level-enum.enum';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  private comments: Comment[] = [];

  photoId: number;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private photoService: PhotoService,
    private userService: UserService,
    public sessionService: SessionService,
    public alertController: AlertController,
    private location: Location) {
  }


  ngOnInit() {
    this.photoId = parseInt(this.activatedRoute.snapshot.paramMap.get('photoId'));

    this.photoService.retrievePhotoDetails(this.photoId).subscribe(
      response => {
        this.comments = response.comment;
      }, error => {
        //this.retrievePhotoError = true;
        console.log('viewPhotoDetails.ts: ' + error);
      }
    );
  }

}
