import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastController, LoadingController, AlertController } from '@ionic/angular';
import { AccessProviders } from '../../providers/access-providers';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-detalle-pagos',
  templateUrl: './detalle-pagos.page.html',
  styleUrls: ['./detalle-pagos.page.scss'],
})
export class DetallePagosPage implements OnInit {
  id: number;

  numero_recibo: number;
  nombre: string = "";
  manzana: string = "";
  lote: string = "";
  concepto: string = "";
  total: string = "";

  pagos: any = [];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
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
    
    this.pagos = [];
    this.cargarPagos();
  }

  cargarDatos() {//Metodo para cargar los datos del pago solo devuelve un registro

    return new Promise(resolve => {
      let body = {
        aksi: 'cargar_pago',
        id: this.id

      }
      this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        this.numero_recibo = this.id;
        this.nombre = res.result.PrvNombre;
        this.manzana = res.result.pre_manzana;
        this.lote = res.result.pre_lote;
        this.concepto = res.result.concepto;
        this.total = res.result.total;

      });
    });
  }

  async doRefresh(event) {
    const loader = await this.loadingCtrl.create({
      message: 'Por favor espere.......',
    });
    loader.present();

    this.ngOnInit();
    this.ionViewDidEnter();
    event.target.complete();

    loader.dismiss();
  }

  async cargarPagos() {
    return new Promise(resolve => {
      let body = {
        aksi: 'cargar_detalle_pago',
        id: this.id
      }
      this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {
        for (let datas of res.result) { //
          this.pagos.push(datas);
        }
        resolve(true);
      });

    });
  }
}
