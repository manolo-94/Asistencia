import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DescargaPage } from './descarga.page';

const routes: Routes = [
  {
    path: '',
    component: DescargaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DescargaPageRoutingModule {}
