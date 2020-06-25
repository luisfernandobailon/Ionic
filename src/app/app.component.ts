import { Component } from '@angular/core';

import { Platform, NavController, ToastController, MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,

    private router: Router,
    private toastCtrl: ToastController,
    private menuCtrl: MenuController,

    private storage: Storage,
    public navCtrl: NavController

  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });


    this.storage.get('storage_xxx').then((res) => {
      if (res == null) {
        this.navCtrl.navigateRoot('/intro');
        //this.menuCtrl.enable(false);
        this.menuCtrl.enable(false, 'main-menu');
        
      } else {
        this.navCtrl.navigateRoot('/home');
        //this.enableAuthenticatedMenu();
        //this.menuCtrl.enable(true);
        this.menuCtrl.enable(true, 'main-menu');
      }
    });
  }

  async prosesLogout() {

    this.storage.clear();
    this.navCtrl.navigateRoot(['/intro']);
    const toast = await this.toastCtrl.create({
      message: 'Salio',
      duration: 1500
    });
    toast.present();
  }

}
