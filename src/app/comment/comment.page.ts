import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { NgForm } from '@angular/forms';

import { AlertController } from '@ionic/angular';

import { PhotoService } from '../photo.service';
import { UserService } from '../user.service';
import { SessionService } from '../session.service';
import { Comment } from '../comment/comment';
import { Photo } from '../photo';
import { User } from '../user';
import { PrivacyLevelEnum } from 'src/app/privacy-level-enum.enum';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.page.html',
  styleUrls: ['./comment.page.scss'],
})
export class CommentPage implements OnInit {

  comments: Comment[] = [];

  public newComment: Comment = new Comment();

  photoId: number;
  commentId: number;

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

    this.photoService.retrieveComments(this.photoId).subscribe(
      response => {
        for (let comment of response.comments) {
          this.commentId = comment.commentId;
          console.log(this.commentId);
          this.photoService.retrieveUserByCommentId(this.commentId).subscribe(
            response => {
              console.log(response.user);
              comment.user = response.user;
            }, error => {

            }
          );
        }
        this.comments = response.comments;
      }, error => {
        //this.retrievePhotoError = true;
        console.log('viewPhotoDetails.ts: ' + error);
      }
    );
  }

  ionViewWillEnter() {
    this.photoId = parseInt(this.activatedRoute.snapshot.paramMap.get('photoId'));

    this.photoService.retrieveComments(this.photoId).subscribe(
      response => {
        for (let comment of response.comments) {
          this.commentId = comment.commentId;
          console.log(this.commentId);
          this.photoService.retrieveUserByCommentId(this.commentId).subscribe(
            response => {
              console.log(response.user);
              comment.user = response.user;
            }, error => {

            }
          );
        }
        this.comments = response.comments;
      }, error => {
        //this.retrievePhotoError = true;
        console.log('viewPhotoDetails.ts: ' + error);
      }
    );
  }

  submit(newCommentForm: NgForm) {

    this.newComment.time = new Date();
    this.newComment.user = this.sessionService.getCurrentUser();
    
    //if (newCommentForm.valid) {
      //this.photoService.createNewComment(this.newComment).subscribe(
        //response => {
          
        //},
        //error => {
          

        //  console.log('editPhotoDetailsForm.ts: ' + error);
        //}
      )
    }
  }

}
