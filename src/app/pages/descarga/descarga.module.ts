import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DescargaPageRoutingModule } from './descarga-routing.module';

import { DescargaPage } from './descarga.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DescargaPageRoutingModule
  ],
  declarations: [DescargaPage]
})
export class DescargaPageModule {}
