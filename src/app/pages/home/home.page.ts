import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController, NavController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  datastorage: any;
  name: String;

  users: any = [];
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
    this.storage.get('storage_xxx').then((res) => {
      console.log(res);
      this.datastorage = res;
      this.name = this.datastorage.your_name;
    });
    this.start = 0;
    this.users = [];
    this.loadUsers();
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

  loadData(event) {
    this.start += this.limit;
    setTimeout(() => {
      this.loadUsers().then(() => {
        event.target.complete();
      });
    }, 500);
  }

  async loadUsers() {
    return new Promise(resolve => {
      let body = {
        aksi: 'load_user',
        start: this.start,
        limit: this.limit

      }
      this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        for (let datas of res.result) { //
          this.users.push(datas);
        }
        resolve(true);
      });

    });
  }

  async delData() {
    return new Promise(resolve => {
      let body = {
        aksi: 'load_user',
        start: this.start,
        limit: this.limit

      }
      this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        for (let datas of res.result) { //
          this.users.push(datas);
        }
        resolve(true);
      });

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

  openCrud(a) {
    this.router.navigate(['/crud/' + a]);
  }

}
