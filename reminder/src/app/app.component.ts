import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA_3yV38hJ9rtFUap5ZKRzDp9PgI4fT7Oc",
  authDomain: "reminder-3d33f.firebaseapp.com",
  databaseURL: "https://reminder-3d33f.firebaseio.com",
  projectId: "reminder-3d33f",
  storageBucket: "reminder-3d33f.appspot.com"
};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config);
  }
}
