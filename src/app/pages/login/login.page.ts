import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email_address: String = "";
  password: String = "";

  disabledButton;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accssPrvds: AccessProviders,
    private storage: Storage,
    public navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }


  async tryLogin() {
     if (this.email_address == "") {
      this.presentToast('EL e-mail es requerido');
    } else if (this.password == "") {
      this.presentToast('La contraseña es requerida');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Por favor espere.......',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_login',
          password: this.password

        }
        this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
          if (res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('Login exitoso');
            this.navCtrl.navigateRoot(['/home']);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast('El Email o la contraseña es incorrecta');
          }
        }, (err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Tiempo de espera terminado');
        });
      });
    }
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',

    });
    toast.present();
  }

  openRegister(){
    this.router.navigate(['/register']);
  }

}
