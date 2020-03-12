warning: LF will be replaced by CRLF in src/app/pages/login/login.page.ts.
The file will have its original line endings in your working directory
[1mdiff --git a/src/app/pages/login/login.page.ts b/src/app/pages/login/login.page.ts[m
[1mindex 4e1e520..2218dcc 100644[m
[1m--- a/src/app/pages/login/login.page.ts[m
[1m+++ b/src/app/pages/login/login.page.ts[m
[36m@@ -1,5 +1,8 @@[m
 import { Component, OnInit } from '@angular/core';[m
 import { Router, ActivatedRoute } from '@angular/router';[m
[32m+[m[32mimport { ToastController, LoadingController, AlertController } from '@ionic/angular';[m
[32m+[m[32mimport { AccessProviders } from '../../providers/access-providers';[m
[32m+[m[32mimport { Storage } from '@ionic/storage';[m
 [m
 @Component({[m
   selector: 'app-login',[m
[36m@@ -7,12 +10,88 @@[m [mimport { Router, ActivatedRoute } from '@angular/router';[m
   styleUrls: ['./login.page.scss'],[m
 })[m
 export class LoginPage implements OnInit {[m
[31m-  [m
[31m-  constructor(private router: Router) { }[m
[32m+[m
[32m+[m[32m  email_address: String = "";[m
[32m+[m[32m  password: String = "";[m
[32m+[m
[32m+[m[32m  disabledButton;[m
[32m+[m
[32m+[m[32m  constructor([m
[32m+[m[32m    private router: Router,[m
[32m+[m[32m    private toastCtrl: ToastController,[m
[32m+[m[32m    private loadingCtrl: LoadingController,[m
[32m+[m[32m    private alertCtrl: AlertController,[m
[32m+[m[32m    private accssPrvds: AccessProviders,[m
[32m+[m[32m    private storage: Storage[m
[32m+[m[32m  ) { }[m
 [m
   ngOnInit() {[m
   }[m
 [m
[32m+[m[32m  ionViewDidEnter() {[m
[32m+[m[32m    this.disabledButton = false;[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m
[32m+[m[32m  async tryRegister() {[m
[32m+[m[32m    if (this.your_name == "") {[m
[32m+[m[32m      this.presentToast('Tu nombre es requerido');[m
[32m+[m[32m    } else if (this.gender == "") {[m
[32m+[m[32m      this.presentToast('El genero es requerido');[m
[32m+[m[32m    } else if (this.date_birth == "") {[m
[32m+[m[32m      this.presentToast('La fecha de nacimiento es requerida');[m
[32m+[m[32m    } else if (this.email_address == "") {[m
[32m+[m[32m      this.presentToast('EL e-mail es requerido');[m
[32m+[m[32m    } else if (this.password == "") {[m
[32m+[m[32m      this.presentToast('La contraseña es requerida');[m
[32m+[m[32m    } else if (this.confirm_pass != this.password) {[m
[32m+[m[32m      this.presentToast('La contraseña no coinicide');[m
[32m+[m[32m    } else {[m
[32m+[m[32m      this.disabledButton = true;[m
[32m+[m[32m      const loader = await this.loadingCtrl.create({[m
[32m+[m[32m        message: 'Por favor espere.......',[m
[32m+[m[32m      });[m
[32m+[m[32m      loader.present();[m
[32m+[m
[32m+[m[32m      return new Promise(resolve => {[m
[32m+[m[32m        let body = {[m
[32m+[m[32m          aksi: 'proses_register',[m
[32m+[m[32m          your_name: this.your_name,[m
[32m+[m[32m          gender: this.gender,[m
[32m+[m[32m          date_birth: this.date_birth,[m
[32m+[m[32m          email_address: this.email_address,[m
[32m+[m[32m          password: this.password[m
[32m+[m[32m        }[m
[32m+[m[32m        this.accssPrvds.postData(body, 'proses_api.php').subscribe((res: any) => {[m
[32m+[m[32m          if (res.success == true) {[m
[32m+[m[32m            loader.dismiss();[m
[32m+[m[32m            this.disabledButton = false;[m
[32m+[m[32m            this.presentToast(res.msg);[m
[32m+[m[32m            this.router.navigate(['/login']);[m
[32m+[m[32m          } else {[m
[32m+[m[32m            loader.dismiss();[m
[32m+[m[32m            this.disabledButton = false;[m
[32m+[m[32m            this.presentToast(res.msg);[m
[32m+[m[32m          }[m
[32m+[m[32m        }, (err) => {[m
[32m+[m[32m          loader.dismiss();[m
[32m+[m[32m          this.disabledButton = false;[m
[32m+[m[32m          this.presentAlert('Tiempo de espera terminado');[m
[32m+[m[32m        });[m
[32m+[m[32m      });[m
[32m+[m[32m    }[m
[32m+[m[32m  }[m
[32m+[m
[32m+[m[32m  async presentToast(a) {[m
[32m+[m[32m    const toast = await this.toastCtrl.create({[m
[32m+[m[32m      message: a,[m
[32m+[m[32m      duration: 1500,[m
[32m+[m[32m      position: 'top',[m
[32m+[m
[32m+[m[32m    });[m
[32m+[m[32m    toast.present();[m
[32m+[m[32m  }[m
[32m+[m
   openRegister(){[m
     this.router.navigate(['/register']);[m
   }[m
