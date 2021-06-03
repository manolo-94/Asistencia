import { Component, OnInit } from '@angular/core';
import { PersonasService } from '../../services/personas.service';
import { Persona, PersonaLN, PersonaSeccion } from '../../interfaces/interfaces';
import { ModalController, AlertController } from '@ionic/angular';
import { DetallepersonaComponent } from '../detallepersona/detallepersona.component';
import { DatabaseService } from '../../services/database.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NetworkService } from '../../services/network.service';

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

  btnAddpersona = false;

  personaSeccion:PersonaSeccion[] = [];

  private status:number = 0;

  public token:string = null;

  constructor( private personasService: PersonasService,
               private modalCtrl: ModalController,
               private databaseService: DatabaseService,
               private alertCtrl: AlertController,
               private networkService : NetworkService) {}

  ngOnInit() {
    this.mensaje = 'Escribe un nombre para comenzar a buscar';
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
              this.btnAddpersona = true;
            }else{
              
              for(let i = 0; i < resp.rows.length; i++){
                // console.log(resp.rows.item(i));
                this.personaSeccion.push(resp.rows.item(i));
              }
              if(this.total != 0){
                this.mensaje = 'Se encontraron '+ this.total + ' resultados.';
                // this.mensaje = null;
                this.buscando = false;
                this.btnAddpersona = false;
              }else{
                this.mensaje = 'Se encontraron '+ this.total + ' resultados.';
                // this.mensaje = null;
                this.buscando = false;
                this.btnAddpersona = true;
              }
              
            }
          })
          .catch(error => {
            console.log(error);
          })
    }else{
      this.total = 0;
      this.personaSeccion = [];
      this.mensaje = 'Necesitas ser mas específico en tu busqueda en caso de no aparecer puedes agregarla manual mente';
      this.btnAddpersona = true;
      // console.log('Necesitas ser mas especifico en tu busqueda')
    }
  }

  async detalle(){
    const modal = await this.modalCtrl.create({
      component: DetallepersonaComponent,
      componentProps:{
        
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
        // console.log(data.rows.item(i));
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
    // let alert = await this.alertCtrl.create({
    //   message: '¿Deseas marcar a ' + nombre + ' que asistió a votar?',
    //   buttons: [
    //     {
    //       text:'Cancelar',
    //       role:'cancel',
    //       cssClass: 'secondary',
    //       handler:(blah) =>{
    //         console.log('cancelar ');
    //       }
    //     },
    //     {
    //       text:'Aceptar',
    //       handler:() =>{
    //         let ionSearchBar : HTMLElement = document.getElementById('ion-searchbar');
    //          this.databaseService.addPersonaVoto(persona_id, this.token)
    //             .then(then => {
    //              then.subscribe(resp =>{
    //               console.log(resp);
    //               // var status:number = 0;
    //               if(resp.guardado != false){
    //                  this.status = 1;
    //               }else{
    //                 this.status = 0;
    //               }
    //               this.databaseService.addVotacion(persona_id,nombre,this.status);
    //               this.databaseService.getVotacion()
    //                   .then(resp => {
    //                     for(let i = 0; i < resp.rows.length; i++){
    //                       console.log(resp.rows.item(i));
    //                     }
    //                   })
    //                   .catch(error =>{
    //                     console.log('No se pudo guardar por el siguiente error: '+error.message);
    //                   });
    //               this.databaseService.deletePerson(id)
    //                   .then( resp => {
    //                     console.log(resp)
                        
    //                     ionSearchBar.setAttribute('value','')
    //                   })
    //                   .catch(error => {
    //                     console.log('No se pudo eliminar por el siguente error: '+error.message);
    //                   });
    //              },(error => {
    //                console.log('error ' + error.message);
    //                this.databaseService.addVotacion(persona_id,nombre,this.status);
    //                this.databaseService.deletePerson(id)
    //                   .then( resp => {
    //                     console.log(resp)
                        
    //                     ionSearchBar.setAttribute('value','')
    //                   })
    //                   .catch(error => {
    //                     console.log('No se pudo eliminar por el siguente error: '+error.message);
    //                   });
    //              }))
    //             })
    //             .catch(error => {
    //               console.log('algo salio mal '+error)
    //               this.databaseService.addVotacion(persona_id,nombre,this.status);
    //               this.databaseService.deletePerson(id)
    //                   .then( resp => {
    //                     console.log(resp)
                        
    //                     ionSearchBar.setAttribute('value','')
    //                   })
    //                   .catch(error => {
    //                     console.log('No se pudo eliminar por el siguente error: '+error);
    //                   });
    //             })
    //       }
    //     }
    //   ]
    // });
    // alert.present();

    Swal.fire({
      title: '¿Deseas marcar a ' + nombre + ' que asistió a votar?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        let ionSearchBar : HTMLElement = document.getElementById('ion-searchbar');
            // Validar que la casi lla este abierta antes de de poder puntear a una persona

            this.databaseService.getConfigCasilla()
                .then( result => {
                  let status:string;
                  if(result.rows.length > 0){
                    for (let i = 0; i < result.rows.length; i++){
                      status = result.rows.item(i)['status']
                    }
    
                    if(status == 'CERRADA'){
                      // console.log('la casilla ya fue cerrada definitivamente')
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Tu casilla esta cerrada debe de estar abierta para comenzar a marcar la asistencia de las personas que fueron a votar'
                      })
                    }
                    if(status == 'ABIERTA'){

                      this.networkService.getNetworkTestRequest()
                          .subscribe(success =>{ 
                              /* COMENZAMOS A PUNTEAR PERSONAS */
                              this.databaseService.addPersonaVoto(persona_id, this.token) // tratamos de enviar la informacion al servidor
                              .then(then => {
                                then.subscribe(resp =>{
                                  
                                  // console.log(resp);
                                  // var status:number = 0;
                                  if(resp.guardado != false){
                                     this.status = 1;
                                  }else{
                                    this.status = 0;
                                  }
                                
                                  this.databaseService.addVotacion(persona_id,nombre,this.status) // la guardamo en la base de datos local 
                                      .then(then => {
                                        Swal.fire(
                                          'Se a registrado y guardado correctamente la asistencia de ' + nombre,
                                          '',
                                          'success'
                                        )
                                      })
                                      .catch( err =>{
                                        Swal.fire(
                                          'Se a registrado correctamente la asistencia de ' + nombre,
                                          '',
                                          'success'
                                        )
                                      })
                                  this.databaseService.deletePerson(id)
                                      .then( resp => {
                                        // console.log(resp)
                                      
                                        ionSearchBar.setAttribute('value','')
                                      })
                                      .catch(error => {
                                        console.log('No se pudo eliminar por el siguente error: '+error.message);
                                      });
                               },(error => { // si el servidor marca algun error aun asi lo guarmadamos en la base de datos y despues lo eliminamos de la busqueda
                                  // console.log('error ' + error.message);
                                  this.databaseService.addVotacion(persona_id,nombre,this.status)
                                      .then(then => {
                                        Swal.fire(
                                          'Se a guardado correctamente la asistencia de ' + nombre,
                                          '',
                                          'success'
                                        )
                                      })
                                      .catch( err => {
                                        Swal.fire({
                                          icon: 'error',
                                          title: 'Oops...',
                                          text: 'No se pudo guardar la asistencia de esta persona correctamente'
                                        })
                                      })
                                  this.databaseService.deletePerson(id)
                                     .then( resp => {
                                      //  console.log(resp)

                                       ionSearchBar.setAttribute('value','')
                                     })
                                     .catch(error => {
                                       console.log('No se pudo eliminar por el siguente error: '+error.message);
                                     });
                               }))
                              })
                              .catch(error => { // si la consulta es erronea la guardamos en la base de datos local y la eliminamos de la busqueda
                                console.log('algo salio mal '+error)
                                this.databaseService.addVotacion(persona_id,nombre,0);
                                this.databaseService.deletePerson(id)
                                    .then( resp => {
                                      console.log(resp)
                                    
                                      ionSearchBar.setAttribute('value','')
                                    })
                                    .catch(error => {
                                      console.log('No se pudo eliminar por el siguente error: '+error);
                                    });
                              })
                             /* COMENZAMOS A PUNTEAR PERSONAS */
                          },err =>{
                            this.databaseService.addVotacion(persona_id,nombre,0) // la guardamo en la base de datos local 
                                .then(then => {
                                        Swal.fire(
                                          'Se a guardado correctamente la asistencia de ' + nombre,
                                          '',
                                          'success'
                                        )
                                      })
                                      .catch( err =>{
                                        Swal.fire({
                                          icon: 'error',
                                          title: 'Oops...',
                                          text: 'No se pudo guardar la asistencia de esta persona correctamente'
                                        })
                                      })
                                  // this.databaseService.getVotacion()
                                  //     .then(resp => {
                                  //       for(let i = 0; i < resp.rows.length; i++){
                                  //         console.log(resp.rows.item(i));
                                  //       }
                                  //     })
                                  //     .catch(error =>{
                                  //       console.log('No se pudo cosultar la informacion por el siguiente error: '+error.message);
                                  //     });
                                  this.databaseService.deletePerson(id)
                                      .then( resp => {
                                        // console.log(resp)
                                      
                                        ionSearchBar.setAttribute('value','')
                                      })
                                      .catch(error => {
                                        // console.log('No se pudo eliminar por el siguente error: '+error.message);
                                        Swal.fire({
                                          icon: 'error',
                                          title: 'Oops...',
                                          text: 'No se pudo eliminar de la lista de busque esta persona por el siguente error: '+error.message
                                        })
                                      });
                          })

                      // /* COMENZAMOS A PUNTEAR PERSONAS */
                      // this.databaseService.addPersonaVoto(persona_id, this.token) // tratamos de enviar la informacion al servidor
                      //     .then(then => {
                      //       then.subscribe(resp =>{
                      //         Swal.fire(
                      //           'Se a registrado correctamente la asistencia de ' + nombre,
                      //           '',
                      //           'success'
                      //         )
                      //         // console.log(resp);
                      //         // var status:number = 0;
                      //         if(resp.guardado != false){
                      //            this.status = 1;
                      //         }else{
                      //           this.status = 0;
                      //         }
                            
                      //         this.databaseService.addVotacion(persona_id,nombre,this.status) // la guardamo en la base de datos local 
                      //             .then(then => {
                      //               Swal.fire(
                      //                 'Se a registrado correctamente la asistencia de ' + nombre,
                      //                 '',
                      //                 'success'
                      //               )
                      //             })
                      //             .catch( err =>{
                      //               Swal.fire({
                      //                 icon: 'error',
                      //                 title: 'Oops...',
                      //                 text: 'No se pudo registrar la asistencia de esta persona correctamente'
                      //               })
                      //             })
                      //         // this.databaseService.getVotacion()
                      //         //     .then(resp => {
                      //         //       for(let i = 0; i < resp.rows.length; i++){
                      //         //         console.log(resp.rows.item(i));
                      //         //       }
                      //         //     })
                      //         //     .catch(error =>{
                      //         //       console.log('No se pudo cosultar la informacion por el siguiente error: '+error.message);
                      //         //     });
                      //         this.databaseService.deletePerson(id)
                      //             .then( resp => {
                      //               // console.log(resp)

                      //               ionSearchBar.setAttribute('value','')
                      //             })
                      //             .catch(error => {
                      //               // console.log('No se pudo eliminar por el siguente error: '+error.message);
                      //               Swal.fire({
                      //                 icon: 'error',
                      //                 title: 'Oops...',
                      //                 text: 'No se pudo eliminar de la lista de busque esta persona por el siguente error: '+error.message
                      //               })
                      //             });
                      //      },(error => { // si el servidor marca algun error aun asi lo guarmadamos en la base de datos y despues lo eliminamos de la busqueda
                      //         // console.log('error ' + error.message);
                      //         this.databaseService.addVotacion(persona_id,nombre,this.status)
                      //             .then(then => {
                      //               Swal.fire(
                      //                 'Se a registrado correctamente la asistencia de ' + nombre,
                      //                 '',
                      //                 'success'
                      //               )
                      //             })
                      //             .catch( err => {
                      //               Swal.fire({
                      //                 icon: 'error',
                      //                 title: 'Oops...',
                      //                 text: 'No se pudo registrar la asistencia de esta persona correctamente'
                      //               })
                      //             })
                      //         this.databaseService.deletePerson(id)
                      //            .then( resp => {
                      //             //  console.log(resp)

                      //              ionSearchBar.setAttribute('value','')
                      //            })
                      //            .catch(error => {
                      //             //  console.log('No se pudo eliminar por el siguente error: '+error.message);
                      //              Swal.fire({
                      //               icon: 'error',
                      //               title: 'Oops...',
                      //               text: 'No se pudo eliminar de la lista de busque esta persona por el siguente error: '+error.message
                      //             })
                      //            });
                      //      }))
                      //     })
                      //     .catch(error => { // si la consulta es erronea la guardamos en la base de datos local y la eliminamos de la busqueda
                      //       console.log('algo salio mal '+error)
                      //       this.databaseService.addVotacion(persona_id,nombre,this.status);
                      //       this.databaseService.deletePerson(id)
                      //           .then( resp => {
                      //             console.log(resp)

                      //             ionSearchBar.setAttribute('value','')
                      //           })
                      //           .catch(error => {
                      //             console.log('No se pudo eliminar por el siguente error: '+error);
                      //           });
                      //     })
                      // /* COMENZAMOS A PUNTEAR PERSONAS */

                    }
                  }else{
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Tu casilla esta cerrada debe de estar abierta para comenzar a marcar la asistencia de las personas que fueron a votar'
                    })
                  }
                })
       
      }
    })
  }

  async presentAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Descarga',
      message: 'Tú información de ha descargado correctamente',
      buttons: ['Cerrar']
    });
    alert.present();
  }

  addPersona(){
    console.log('agregar persona');
    
  }
}
