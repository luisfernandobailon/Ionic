import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-reservados',
  templateUrl: './reservados.page.html',
  styleUrls: ['./reservados.page.scss'],
})
export class ReservadosPage implements OnInit {
  datastorage: any;
  name: String;

  lotes: any = [];
  limit: number = 13;
  start: number = 0;

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
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.your_name;
    });
  }
  
  ionViewDidEnter() {
    
    this.start = 0;
    this.lotes = [];
    this.cargarLotes();
  }

  async doRefresh(event) {
    const loader = await this.loadingCtrl.create({
      message: 'Por favor espere.......',
    });
    loader.present();

    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }

  loadData(event:any) {
    this.start += this.limit;
    setTimeout(() => {
      this.cargarLotes().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  async cargarLotes() {
    return new Promise(resolve => {
      let body = {
        aksi: 'cargar_lotes_reservados',
        start: this.start,
        limit: this.limit,
        usuario: this.name

      }
      this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        for (let datas of res.result) { //
          this.lotes.push(datas);
        }
        resolve(true);
      });

    });
  }

  async quitarReservacion(a) {
    return new Promise(resolve => {
      let body = {
        aksi: 'quitar_reservado',
        id: a
      }

      this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        if (res.success == true) {
          this.presentToast('Se quito reservacion');
          this.ionViewDidEnter();
        } else {
          this.presentToast('Ocurrio un error');
        }
      });

    });
  }

  async presentToast(a) {
    const toast = await this.toastCtrl.create({
      message: a,
      duration: 1500
    });
    toast.present();
  }

  

}
