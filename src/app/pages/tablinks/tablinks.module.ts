import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TablinksPageRoutingModule } from './tablinks-routing.module';

import { TablinksPage } from './tablinks.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TablinksPageRoutingModule,
    
    
  ],
  declarations: [TablinksPage]
})
export class TablinksPageModule {}
