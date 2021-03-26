import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { DetailencuestaComponent } from './detailencuesta/detailencuesta.component';
import { BuscarComponent } from './buscar/buscar.component';


@NgModule({
  declarations: [
    HeaderComponent,
    EncuestasComponent,
    EncuestaComponent,
    DetailencuestaComponent,
    BuscarComponent
  ],
  exports:[
    HeaderComponent,
    EncuestasComponent,
    EncuestaComponent,
    DetailencuestaComponent,
    BuscarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
