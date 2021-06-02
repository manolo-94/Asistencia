import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';
import { EncuestasComponent } from './encuestas/encuestas.component';
import { EncuestaComponent } from './encuesta/encuesta.component';
import { DetailencuestaComponent } from './detailencuesta/detailencuesta.component';
import { BuscarComponent } from './buscar/buscar.component';
import { DetallepersonaComponent } from './detallepersona/detallepersona.component';
import { MenuComponent } from './menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    EncuestasComponent,
    EncuestaComponent,
    DetailencuestaComponent,
    BuscarComponent,
    DetallepersonaComponent,
    MenuComponent,
  ],
  exports:[
    HeaderComponent,
    EncuestasComponent,
    EncuestaComponent,
    DetailencuestaComponent,
    BuscarComponent,
    DetallepersonaComponent,
    MenuComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ComponentsModule { }
