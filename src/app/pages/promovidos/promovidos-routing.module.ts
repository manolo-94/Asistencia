import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PromovidosPage } from './promovidos.page';

const routes: Routes = [
  {
    path: '',
    component: PromovidosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromovidosPageRoutingModule {}
