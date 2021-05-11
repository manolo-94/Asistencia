import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { Persona } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetallepersonaComponent } from '../detallepersona/detallepersona.component';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.scss'],
})
export class BuscarComponent implements OnInit {

  personas : Persona[] = [];
  buscando = false;
  error : string = "";
  resultError = false;

  constructor( private personasService: PersonasService,
               private modalCtrl: ModalController ) { }

  ngOnInit() {}

  async buscarPersona(event) {
    console.log(event.target.value);
    this.buscando = true;
    await this.personasService.buscarPersona(event.target.value)
              .then( then => {
                then.subscribe(resp => {
                  this.personas = resp
                  this.buscando = false;
                  this.resultError = false;
                },(err) => {
                  this.personas = []
                  this.buscando = false;
                  this.resultError = true;
                  console.log(err['error']['error']);
                  this.error = err['error']['error'];
                });
              });
  }

  async detalle(persona:Persona){
    const modal = await this.modalCtrl.create({
      component: DetallepersonaComponent,
      componentProps:{
        persona
      }
    });

    modal.present();
  }

}
