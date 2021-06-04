import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RespaldoPageRoutingModule } from './respaldo-routing.module';

import { RespaldoPage } from './respaldo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RespaldoPageRoutingModule
  ],
  declarations: [RespaldoPage]
})
export class RespaldoPageModule {}
