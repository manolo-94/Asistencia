import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CasillaPage } from './casilla.page';

const routes: Routes = [
  {
    path: '',
    component: CasillaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CasillaPageRoutingModule {}
