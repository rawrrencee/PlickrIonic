import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { SessionService } from '../session.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(private router: Router,
    public sessionService: SessionService) {
   }

  ngOnInit() {
  }

  userLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentUser(null);

    this.router.navigate(['login']);
  }

}
