import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetallePagosPageRoutingModule } from './detalle-pagos-routing.module';

import { DetallePagosPage } from './detalle-pagos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DetallePagosPageRoutingModule
  ],
  declarations: [DetallePagosPage]
})
export class DetallePagosPageModule {}
