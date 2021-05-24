import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CasillaPageRoutingModule } from './casilla-routing.module';

import { CasillaPage } from './casilla.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CasillaPageRoutingModule
  ],
  declarations: [CasillaPage]
})
export class CasillaPageModule {}
