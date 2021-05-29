import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { Persona, PersonaLN, PersonaSeccion } from '../../interfaces/interfaces';
import { ModalController, AlertController } from '@ionic/angular';
import { DetallepersonaComponent } from '../detallepersona/detallepersona.component';
import { DatabaseService } from '../../services/database.service';

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

  total:number = 0;
  mensaje:string = null;

  personaSeccion:PersonaSeccion[] = [];

  private status:number = 0;

  public token:string = null;

  constructor( private personasService: PersonasService,
               private modalCtrl: ModalController,
               private databaseService: DatabaseService,
               private alertCtrl: AlertController) {}

  ngOnInit() {
    this.mensaje = 'Resultados encontrados ' + this.total;
  }

  // async buscarPersona(event) {
  //   console.log(event.target.value);
  //   this.buscando = true;
  //   await this.personasService.buscarPersona(event.target.value)
  //             .then( then => {
  //               then.subscribe(resp => {
  //                 this.personas = resp
  //                 this.buscando = false;
  //                 this.resultError = false;
  //               },(err) => {
  //                 this.personas = []
  //                 this.buscando = false;
  //                 this.resultError = true;
  //                 console.log(err['error']['error']);
  //                 this.error = err['error']['error'];
  //               });
  //             });
  // }

  buscarPersona(event) {
    // console.log(event);
    // console.log(event.target.value.length);
    if (event.target.value.length >= 5){
      this.buscando = true;
      this.databaseService.getFtsPeople(event.target.value)
          .then(resp => {
            // console.log(resp)
            this.personaSeccion = [];
            this.total = resp.rows.length;
            if(this.total >= 31){
              // console.log('Se encontraron '+ resp.rows.length + ' resultados, necesitas ser mas especifico en tu busqueda')
              this.mensaje = 'Se encontraron '+ this.total + ' resultados, necesitas ser mas específico en tu busqueda.';
              this.buscando = false;
            }else{
              
              for(let i = 0; i < resp.rows.length; i++){
                console.log(resp.rows.item(i));
                this.personaSeccion.push(resp.rows.item(i));
              }
              this.mensaje = 'Se encontraron '+ this.total + ' resultados.';
              // this.mensaje = null;
              this.buscando = false;
            }
          })
          .catch(error => {
            console.log(error);
          })
    }else{
      this.total = 0;
      this.personaSeccion = [];
      this.mensaje = 'Necesitas ser mas específico en tu busqueda.';
      // console.log('Necesitas ser mas especifico en tu busqueda')
    }
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

  buscarPersonaSeccion(){
    this.buscando = true;
    this.databaseService.getPeople()
    .then(data => {
      
      // console.log(data);
      this.personaSeccion = [];

      this.total = data.rows.length;
      
      for(let i = 0; i < data.rows.length; i++){
        console.log(data.rows.item(i));
        this.personaSeccion.push(data.rows.item(i));
      }
      this.buscando = false;
    })
    .catch(error => {
      console.log(error);
    })
  }

  async votar(id:number, nombre:string, persona_id:number){
    await this.databaseService.getTokenUser()
              .then( then => {
                if(then.rows.length > 0){
                  for (let i = 0; i < then.rows.length; i++){
                    this.token = then.rows.item(i)['token'];
                  }
                }
              })
    // console.log('ID: '+id+' has seleccionado a '+ nombre + ' con persona_id ' +persona_id);
    let alert = await this.alertCtrl.create({
      // header: 'Votación',
      message: '¿Deseas marcar a ' + nombre + ' que asistió a votar?',
      buttons: [
        {
          text:'Cancelar',
          role:'cancel',
          cssClass: 'secondary',
          handler:(blah) =>{
            console.log('cancelar ');
          }
        },
        {
          text:'Aceptar',
          handler:() =>{
            let ionSearchBar : HTMLElement = document.getElementById('ion-searchbar');
            // console.log('Has enviado el id :' + persona_id + ' de ' + nombre);
             this.databaseService.addPersonaVoto(persona_id, this.token)
                .then(then => {
                 then.subscribe(resp =>{
                  console.log(resp);
                  // var status:number = 0;
                  if(resp.guardado != false){
                     this.status = 1;
                  }else{
                    this.status = 0;
                  }
                  this.databaseService.addVotacion(persona_id,nombre,this.status);
                  this.databaseService.getVotacion()
                      .then(resp => {
                        for(let i = 0; i < resp.rows.length; i++){
                          console.log(resp.rows.item(i));
                        }
                      })
                      .catch(error =>{
                        console.log('No se pudo guardar por el siguiente error: '+error.message);
                      });
                  this.databaseService.deletePerson(id)
                      .then( resp => {
                        console.log(resp)
                        
                        ionSearchBar.setAttribute('value','')
                      })
                      .catch(error => {
                        console.log('No se pudo eliminar por el siguente error: '+error.message);
                      });
                 },(error => {
                   console.log('error ' + error.message);
                   this.databaseService.addVotacion(persona_id,nombre,this.status);
                   this.databaseService.deletePerson(id)
                      .then( resp => {
                        console.log(resp)
                        
                        ionSearchBar.setAttribute('value','')
                      })
                      .catch(error => {
                        console.log('No se pudo eliminar por el siguente error: '+error.message);
                      });
                 }))
                })
                .catch(error => {
                  console.log('algo salio mal '+error)
                  this.databaseService.addVotacion(persona_id,nombre,this.status);
                  this.databaseService.deletePerson(id)
                      .then( resp => {
                        console.log(resp)
                        
                        ionSearchBar.setAttribute('value','')
                      })
                      .catch(error => {
                        console.log('No se pudo eliminar por el siguente error: '+error);
                      });
                })
          }
        }
      ]
    });
    alert.present();
  }

  async presentAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Descarga',
      message: 'Tú información de ha descargado correctamente',
      buttons: ['Cerrar']
    });
    alert.present();
  }

}
