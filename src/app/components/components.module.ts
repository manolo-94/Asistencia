import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { EncuestaComponent } from './encuesta/encuesta.component';



@NgModule({
  declarations: [
    HeaderComponent,
    EncuestasComponent,
    EncuestaComponent,
  ],
  exports:[
    HeaderComponent,
    EncuestasComponent,
    EncuestaComponent,
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
