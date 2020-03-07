import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';




@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  your_name: String = "";
  gender: String = "";
  date_birth: String = "";
  email_address: String = "";
  password: String = "";
  confirm_pass: String = "";

  disabledButton;

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accssPrvds: AccessProviders
  ) { }

  ngOnInit() {
  }

  ionViewDinEnter() {
    this.disabledButton = false;
  }
  async tryRegister() {
    if (this.your_name == "") {
      this.presentToast('Tu nombre es requerido');
    } else if (this.gender == "") {
      this.presentToast('El genero es requerido');
    } else if (this.date_birth == "") {
      this.presentToast('La fecha de nacimiento es requerida');
    } else if (this.email_address == "") {
      this.presentToast('EL e-mail es requerido');
    } else if (this.password == "") {
      this.presentToast('La contraseña es requerida');
    } else if (this.confirm_pass != this.password) {
      this.presentToast('La contraseña no coinicide');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Por favor espere.......',
      });
      loader.present();

      return new Promise(resolve => {
        let body =  {
          aksi: 'proses_register',
          your_name: this.your_name,
          gender: this.gender,
          date_birth: this.date_birth,
          email_address: this.email_address,
          password: this.password
        }
        this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {

        });
      });
    }
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: '',
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

}
