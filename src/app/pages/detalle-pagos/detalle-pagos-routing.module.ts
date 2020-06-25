import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DetallePagosPage } from './detalle-pagos.page';

const routes: Routes = [
  {
    path: '',
    component: DetallePagosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DetallePagosPageRoutingModule {}
