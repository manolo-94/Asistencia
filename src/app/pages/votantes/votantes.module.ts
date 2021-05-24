import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VotantesPageRoutingModule } from './votantes-routing.module';

import { VotantesPage } from './votantes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VotantesPageRoutingModule
  ],
  declarations: [VotantesPage]
})
export class VotantesPageModule {}
