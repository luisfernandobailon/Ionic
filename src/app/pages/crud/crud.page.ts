import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  id: number;

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
    private accssPrvds: AccessProviders,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      console.log(data);
      this.id = data.id;

      if (this.id != 0) {
        this.loadUser();
      }
    });
  }

  ionViewDidEnter() {
    this.disabledButton = false;
  }

  loadUser() {
    return new Promise(resolve => {
      let body = {
        aksi: 'load_single_data',
        id: this.id
      }
      this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        this.your_name = res.result.your_name;
        this.gender = res.result.gender;
        this.date_birth = res.result.date_birthday;
        this.email_address = res.result.email_address;
      });
    });
  }

  async crudAction(a) {
    if (this.your_name == "") {
      this.presentToast('Tu nombre es requerido');
    } else if (this.gender == "") {
      this.presentToast('El genero es requerido');
    } else if (this.date_birth == "") {
      this.presentToast('La fecha de nacimiento es requerida');
    } else if (this.email_address == "") {
      this.presentToast('EL e-mail es requerido');
    } else if (this.password == "" && this.id == 0) {
      this.presentToast('La contraseña es requerida');
    } else {
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Por favor espere.......',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'proses_crud',
          id: this.id,
          your_name: this.your_name,
          gender: this.gender,
          date_birth: this.date_birth,
          email_address: this.email_address,
          password: this.password,
          action: a
        }
        this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
          if (res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(a + res.msg);
            this.router.navigate(['/home']);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentAlert(res.msg, a);
          }
        }, (err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Tiempo de espera terminado', a);
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

  async presentAlert(a, b) {
    const alert = await this.alertCtrl.create({
      header: a,
      backdropDismiss: false,
      buttons: [
        {
          text: 'Cerrar',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Intentar de nuevo',
          handler: () => {
            this.crudAction(b);
          }
        }
      ]
    });

    await alert.present();

  }

}
