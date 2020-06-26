import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

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
        aksi: 'cargar_pagos',
        start: this.start,
        limit: this.limit

      }
      this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        for (let datas of res.result) { //
          this.lotes.push(datas);
        }
        resolve(true);
      });

    });
  }

  abrirDetalle(a) {
    this.router.navigate(['/detalle-pagos/' + a]);
  }

}
