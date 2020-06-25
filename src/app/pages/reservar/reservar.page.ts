import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
})
export class ReservarPage implements OnInit {
  id: number;

  pre_manzana: string ="";
  pre_lote: string ="";

  nota: string = "";
  usuario: String;
  datastorage: any;

  disabledButton;
  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private accssPrvdscargar: AccessProviders,
    private accssPrvds: AccessProviders,
    private actRoute: ActivatedRoute,
    private storage: Storage
  ) { }

  ngOnInit() {
    this.actRoute.params.subscribe((data: any) => {
      console.log(data);
      this.id = data.id;
      if (this.id != 0) {
        this.cargarDatos();
      }
    });
  }

  ionViewDidEnter() {
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.usuario = this.datastorage.your_name;
    });
    this.disabledButton = false;
  }

  async cargarDatos() {
    return new Promise(resolve => {
      let body = {
        aksi: 'cargar_datos_predio',
        id: this.id
      }
      this.accssPrvdscargar.postData(body, 'proses_api.php').subscribe((res: any) => {
        this.pre_manzana = res.result.pre_manzana;
        this.pre_lote = res.result.pre_lote;
        
      });
    });
  }

  async reservarLote() {
    if (this.nota == "") {
      
    } 
      this.disabledButton = true;
      const loader = await this.loadingCtrl.create({
        message: 'Por favor espere.......',
      });
      loader.present();

      return new Promise(resolve => {
        let body = {
          aksi: 'reservar_lote',
          id_predio: this.id,
          nota: this.nota,
          usuario: this.usuario
        }
        this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
          if (res.success == true) {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
            this.router.navigate(['/lotes']);
          } else {
            loader.dismiss();
            this.disabledButton = false;
            this.presentToast(res.msg);
          }
        }, (err) => {
          loader.dismiss();
          this.disabledButton = false;
          this.presentAlert('Tiempo de espera terminado');
        });
      });
    
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500,
      position: 'top',

    });
    toast.present();
  }

  async presentAlert(a) {
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
            this.reservarLote();
          }
        }
      ]
    });

    await alert.present();

  }

}
