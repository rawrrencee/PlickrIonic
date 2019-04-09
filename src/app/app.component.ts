import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { SessionService } from './session.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  public appPages;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public sessionService: SessionService
  ) {
    this.initializeApp();

    if(this.sessionService.getIsLogin())
		{
			this.appPages  = [
				{
				  title: 'Feed',
				  url: '/feed',
				  icon: 'paper'
				},
				{
				  title: 'Logout',
				  url: '/login',
				  icon: 'exit'
				}
			  ];
		}
		else
		{
			this.appPages  = [
				{
				  title: 'Feed',
				  url: '/feed',
				  icon: 'paper'
				},
				{
				  title: 'Login',
				  url: '/login',
				  icon: 'lock'
				}
			  ];
		}
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
