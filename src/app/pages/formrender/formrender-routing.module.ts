import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormrenderPage } from './formrender.page';

const routes: Routes = [
  {
    path: '',
    component: FormrenderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FormrenderPageRoutingModule {}
