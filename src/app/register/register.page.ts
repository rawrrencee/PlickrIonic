import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';

import { UserService } from '../user.service';
import { SessionService } from '../session.service';
import { User } from '../user';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  submitted: boolean;
  newUser: User;

  resultSuccess: boolean;
  resultError: boolean;
  message: string;

  constructor(private router: Router,
    public sessionService: SessionService,
    private userService: UserService,
    public alertController: AlertController) {
    this.submitted = false;
    this.newUser = new User();

    this.resultSuccess = false;
    this.resultError = false;
  }

  ngOnInit() {
  }

  register(registerUserForm: NgForm) {
    this.submitted = true;
    if (registerUserForm.valid) {
      this.userService.registerUser(this.newUser).subscribe(
        response => {
          let newUserId: number = response.registeredUser.userId;
          this.resultSuccess = true;
          this.resultError = false;
          this.message = "New user " + newUserId + " created successfully";
        },
        error => {
          this.resultError = true;
          this.resultSuccess = false;
          this.message = "An error has occurred while creating the new user: " + error;

          console.log('******registerUserForm.ts: ' + error);
        }
      )
    }
  }


}
