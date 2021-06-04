import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RespaldoPage } from './respaldo.page';

const routes: Routes = [
  {
    path: '',
    component: RespaldoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RespaldoPageRoutingModule {}
