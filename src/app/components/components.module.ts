import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { DetailencuestaComponent } from './detailencuesta/detailencuesta.component';
import { BuscarComponent } from './buscar/buscar.component';
import { DetallepersonaComponent } from './detallepersona/detallepersona.component';


@NgModule({
  declarations: [
    HeaderComponent,
    EncuestasComponent,
    EncuestaComponent,
    DetailencuestaComponent,
    BuscarComponent,
    DetallepersonaComponent
  ],
  exports:[
    HeaderComponent,
    EncuestasComponent,
    EncuestaComponent,
    DetailencuestaComponent,
    BuscarComponent,
    DetallepersonaComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ComponentsModule { }
