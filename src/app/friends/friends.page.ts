import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { AlertController } from '@ionic/angular';

import { PhotoService } from '../photo.service';
import { UserService } from '../user.service';
import { Photo } from '../photo';
import { User } from '../user';

@Component({
  selector: 'app-friends',
  templateUrl: './friends.page.html',
  styleUrls: ['./friends.page.scss'],
})
export class FriendsPage implements OnInit {

  userId: number;
  category: any;

  private followersList: User[]=[];
  private followingsList: User[]=[];

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,				
    private photoService: PhotoService,
    private userService: UserService,
    public alertController: AlertController,
    private location: Location,
    private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.userId = parseInt(this.activatedRoute.snapshot.paramMap.get('userId'));
    this.userService.retrieveFollowingsList(this.userId).subscribe(
      response => {
        
        this.followingsList = response.users;
      }, error => {
        //this.retrieveUsersError = true;
        //console.log('getNotificationsOfUser.ts: ' + error);
      }
    );
    this.userService.retrieveFollowersList(this.userId).subscribe(
      response => {
        
        this.followersList = response.users;
      }, error => {
        //this.retrieveUsersError = true;
        //console.log('getNotificationsOfUser.ts: ' + error);
      }
    );
    this.category = "followers";
  }

  segmentChanged() {
    this.cd.detectChanges();
  }

  

}
