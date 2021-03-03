import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FormrenderPageRoutingModule } from './formrender-routing.module';

import { FormrenderPage } from './formrender.page';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormrenderPageRoutingModule,
    ComponentsModule
  ],
  declarations: [FormrenderPage]
})
export class FormrenderPageModule {}
