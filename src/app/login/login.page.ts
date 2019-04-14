import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { SessionService } from '../session.service';
import { UserService } from '../user.service';
import { User } from '../user';
import { AccessRightEnum } from '../access-right-enum.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  submitted: boolean;
  email: string;
  password: string;
  loginError: boolean;
  errorMessage: string;



  constructor(private router: Router,
    public alertController: AlertController,
    public sessionService: SessionService,
    private userService: UserService) {
    this.submitted = false;
  }



  ngOnInit() {
  }



  clear() {
    this.email = "";
    this.password = "";
  }



  userLogin(userLoginForm: NgForm) {
    this.submitted = true;

    if (userLoginForm.valid) {
      this.sessionService.setEmail(this.email);
      this.sessionService.setPassword(this.password);

      this.userService.userLogin(this.email, this.password).subscribe(
        response => {
          let user: User = response.user;

          if (response.user.accessRightEnum == 'ADMIN') {
            user.userType = AccessRightEnum.ADMIN;
          }
          else if (response.user.accessRightEnum == 'FREE') {
            user.userType = AccessRightEnum.FREE;
          }
          else if (response.user.accessRightEnum == 'PRO') {
            user.userType = AccessRightEnum.PRO;
          } 

          if (user != null) {
            this.sessionService.setIsLogin(true);
            this.sessionService.setCurrentUser(user);
            this.loginError = false;

            this.router.navigateByUrl('/tabs/feed');
          }
          else {
            this.presentAlert();
            this.loginError = true;
          }
        },
        error => {
          this.presentAlert();
          this.loginError = true;
          this.errorMessage = error
        }
      );
    }
    else {
    }
  }



  userLogout(): void {
    this.sessionService.setIsLogin(false);
    this.sessionService.setCurrentUser(null);

    window.location.reload();
  }

  async presentAlert() 
	{
		const alert = await this.alertController.create({
			header: 'Login failed',
			subHeader: 'Email/Password is wrong or does not exist.',
			message: 'Please check your input details or register for a new account.',
			buttons: ['OK']
		});

		await alert.present();
	}

}
