import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage';
import { NavController, MenuController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  componentes: Componente[] = [
    {
      icon: 'person',
      name: 'Usuarios',
      redirectTo: '/home',
      nivelUsuario: 0
    },
    {
      icon: 'create',
      name: 'Apartar Lote',
      redirectTo: '/lotes',
      nivelUsuario: 0
    },
    {
      icon: 'create',
      name: 'Lotes Reservados',
      redirectTo: '/reservados',
      nivelUsuario: 0
    },
    {
      icon: 'create',
      name: 'Consultar pagos',
      redirectTo: '/pagos',
      nivelUsuario: 0
    }
  ];

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private storage: Storage,
    public navCtrl: NavController,
    private menuCtrl: MenuController
  ) { }

  ngOnInit() { }



  redireccionar(a) {
    this.router.navigate([a]);
  }

  async prosesLogout() {
    this.storage.clear();
    this.navCtrl.navigateRoot(['/intro']);
    const toast = await this.toastCtrl.create({
      message: 'Salio',
      duration: 1500
    });
    toast.present();
    this.menuCtrl.enable(false, 'main-menu');
  }

}


interface Componente {
  icon: string;
  name: string;
  redirectTo: string;
  nivelUsuario: number;
}
