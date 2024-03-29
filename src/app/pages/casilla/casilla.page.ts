import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { DatabaseService } from '../../services/database.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-casilla',
  templateUrl: './casilla.page.html',
  styleUrls: ['./casilla.page.scss'],
})
export class CasillaPage implements OnInit {

  status:boolean;

  private token:string = null;

  constructor( private databaseService: DatabaseService,
               private networkService: NetworkService,
               private ref: ChangeDetectorRef,) { }

  ngOnInit() {
     this.databaseService.getConfigCasilla()
          .then(result => {
            let finalizado:boolean;
            if(result.rows.length > 0){
              for (let i = 0; i < result.rows.length; i++){
                // console.log(result.rows.item(i)['status']);
                this.status = result.rows.item(i)['status'];
                this.ref.detectChanges();
              }

              // if(finalizado){
              //   this.status = false
              //   this.ref.detectChanges();
              // }
              
            }
            // else{
            //   this.status = false;
            //   this.ref.detectChanges();
            // }
            
          })
  }

  openmodal()
  {   
    // console.log(this.status)
    Swal.fire({
      title: '¿Quieres abrir la casilla?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        this.databaseService.getConfigCasilla()
            .then(result => {
              
              if(result.rows.length > 0){

                this.databaseService.updateConfigCasilla('ABIERTA',false,'Reapertura de casilla')
                    .then(success =>{

                      this.status = true;
                      this.ref.detectChanges();

                      let msj:string = 'Casilla abierta'

                      this.networkService.getNetworkTestRequest()
                          .subscribe(success =>{ 

                            this.databaseService.getTokenUser()
                              .then( then => {
                                //se ejecuto la consulta para ontener el token
                                if(then.rows.length > 0){
                                  //obtuvimos el token
                                  for (let i = 0; i < then.rows.length; i++){
                                    this.token = then.rows.item(i)['token'];
                                  }

                                  //abrimo casila remotamente

                                  this.databaseService.abrirCasilla(this.token)
                                      .subscribe(resp =>{
                                        
                                        if (resp.error != null){

                                          this.databaseService.addIncidencia(this.token,'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                            .subscribe(resp => {
                                              this.databaseService.saveIncidencia(true,'La casila se abrio localmente de nuevo en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                                  .then(resp => {
                                                    Swal.fire('Información enviada y guardada', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                  })
                                                  .catch(err=>{
                                                    Swal.fire('Información enviada', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                  })
                                            }, err => {
                                              this.databaseService.saveIncidencia(false,'La casila se abrio de nuevolocalmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                                  .then(resp => {
                                                    Swal.fire('Información guardada', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                  })
                                                  .catch(err=>{
                                                    Swal.fire('Alerta', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                  })
                                            })

                                        }else{

                                          this.databaseService.addIncidencia(this.token,msj)
                                            .subscribe(resp => {
                                              this.databaseService.saveIncidencia(true,'has abierto la casilla de nuevo')
                                                  .then(resp => {
                                                    Swal.fire('Información enviada y guardada', 'has abierto la casilla de nuevo', 'success')
                                                  })
                                                  .catch(err=>{
                                                    Swal.fire('Información enviada', 'has abierto la casilla de nuevo', 'success')
                                                  })
                                            }, err => {
                                              this.databaseService.saveIncidencia(false,'has abierto la casilla de nuevo')
                                                  .then(resp => {
                                                    Swal.fire('Información guardada', 'has abierto la casilla de nuevo', 'success')
                                                  })
                                                  .catch(err=>{
                                                    Swal.fire('Información enviada', 'has abierto la casilla de nuevo', 'success')
                                                  })
                                            })

                                        }
                                        
                                      }, err =>{
                                       
                                        this.databaseService.addIncidencia(this.token,'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                            .subscribe(resp => {
                                              this.databaseService.saveIncidencia(true,'La casila se abrio localmente de nuevo en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                                  .then(resp => {
                                                    Swal.fire('Información enviada y guardada', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                  })
                                                  .catch(err=>{
                                                    Swal.fire('Información enviada', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                  })
                                            }, err => {
                                              this.databaseService.saveIncidencia(false,'La casila se abrio de nuevolocalmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                                  .then(resp => {
                                                    Swal.fire('Información guardada', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                  })
                                                  .catch(err=>{
                                                    Swal.fire('Alerta', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                  })
                                            })
                                            
                                      })
                                }

                              })
                              .catch( err => {
                                //no se pudo obtener el token
                                this.databaseService.saveIncidencia(true,'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                    .then(resp => {
                                      Swal.fire('Información enviada y guardada', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                    })
                                    .catch(err=>{
                                      Swal.fire('Alerta', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                    })
                              })
                          }, err =>{
                            //no tienes internet
                            this.databaseService.saveIncidencia(true,'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                .then(resp => {
                                  Swal.fire('Información guardada', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                })
                                .catch(err=>{
                                  Swal.fire('Alerta', 'La casila se abrio de nuevo localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                })
                          })
                    })
                    .catch( err =>{
                      Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Tu casilla ya no se pudo volver a abrir, intenta de nuevo'
                          })
                    })
              }else{
                // console.log('vas a abrir casilla por primera vez')
                this.databaseService.insertConfigCasilla('ABIERTA',false,'Apertura de casilla')
                    .then(then => {
                      
                      this.status = true;
                      this.ref.detectChanges();

                      let msj:string = 'Casilla abierta'

                      this.networkService.getNetworkTestRequest()
                          .subscribe(success =>{ 

                            this.databaseService.getTokenUser()
                                .then( then => {
                                
                                  if(then.rows.length > 0){

                                    for (let i = 0; i < then.rows.length; i++){
                                      this.token = then.rows.item(i)['token'];
                                    }
                                    //abrimo casila remotamente

                                    this.databaseService.abrirCasilla(this.token)
                                        .subscribe(resp =>{

                                          if (resp.error != null){

                                            this.databaseService.addIncidencia(this.token,msj)
                                              .subscribe(resp => {
                                                this.databaseService.saveIncidencia(true,'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                                    .then(resp => {
                                                      Swal.fire('Información enviada y guardada', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                    })
                                                    .catch(err=>{
                                                      Swal.fire('Información guardada', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                    })
                                              }, err => {
                                                this.databaseService.saveIncidencia(false,'Casilla abierta')
                                                    .then(resp => {
                                                      Swal.fire('Información guardada', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                    })
                                                    .catch(err=>{
                                                      Swal.fire('Alerta', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                    })
                                              })

                                          }else{
                                            this.databaseService.addIncidencia(this.token,msj)
                                              .subscribe(resp => {
                                                this.databaseService.saveIncidencia(true,'Casilla abierta')
                                                    .then(resp => {
                                                      Swal.fire('Información enviada y guardada', 'Casilla abierta', 'success')
                                                    })
                                                    .catch(err=>{
                                                      Swal.fire('Información guardada', 'Casilla abierta', 'success')
                                                    })
                                              }, err => {
                                                this.databaseService.saveIncidencia(false,'Casilla abierta')
                                                    .then(resp => {
                                                      Swal.fire('Información guardada', 'Casilla abierta', 'success')
                                                    })
                                                    .catch(err=>{
                                                      Swal.fire('Información enviada', 'Casilla abierta', 'success')
                                                    })
                                              })
                                          }
                                          
                                        }, err =>{
                                          this.databaseService.addIncidencia(this.token,'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                              .subscribe(resp => {
                                                this.databaseService.saveIncidencia(true,'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                                    .then(resp => {
                                                      Swal.fire('Información enviada y guardada', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                    })
                                                    .catch(err=>{
                                                      Swal.fire('Información enviada', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                    })
                                              }, err => {
                                                this.databaseService.saveIncidencia(false,'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                                    .then(resp => {
                                                      Swal.fire('Información guardada', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdoa', 'warning')
                                                    })
                                                    .catch(err=>{
                                                      Swal.fire('Alerta', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                                    })
                                              })
                                        })
                                  }
                                
                                },err =>{
                                  this.databaseService.saveIncidencia(false,'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                      .then(resp => {
                                        Swal.fire('Información guardada', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdoa', 'warning')
                                      })
                                      .catch(err=>{
                                        Swal.fire('Alerta', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                      })
                                })
                          }, err => {
                            this.databaseService.saveIncidencia(false,'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo')
                                .then(resp => {
                                  Swal.fire('Información guardada', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdoa', 'warning')
                                })
                                .catch(err=>{
                                  Swal.fire('Alerta', 'La casila se abrio localmente en el tefono pero no remotamenten, ponte en contacto con tu encargdo', 'warning')
                                })
                          })                    
                    })
                    .catch( err => {
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Tu casilla no se pudo abrir, intenta de nuevo'
                      })   
                    })
              }

            })
      }
    })
  }

  closemodal()
  {
    let msj : string;
    // console.log(this.status)
    Swal.fire({
      title: '¿Quieres cerrar la casilla?',
      icon: 'question',
      input: 'textarea',
      inputPlaceholder: '¿Porque quieres cerrar la casillas?',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `Si`,
      cancelButtonText: 'Cancelar',
      inputValidator:(value) => {
        msj = value;
        // console.log(value)
        if (!value) {
          return 'Este campo es obligatorio'
        }
      }
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log(msj);

          this.databaseService.updateConfigCasilla('CERRADA',true,'Casilla cerrada: Motivo: '+msj)
              .then(success =>{

              this.status = false;
              this.ref.detectChanges();

                this.networkService.getNetworkTestRequest()
                    .subscribe(success =>{ 
                      this.databaseService.getTokenUser()
                        .then( then => {
                          //se ejecuto la consulta para ontener el token
                          if(then.rows.length > 0){
                            //obtuvimos el token
                            for (let i = 0; i < then.rows.length; i++){
                              this.token = then.rows.item(i)['token'];
                            }
                            //cerramos casilla
                            this.databaseService.cerrarCasilla(this.token)
                                .subscribe(resp =>{

                                  if(resp.error != null){

                                    this.databaseService.addIncidencia(this.token,'Casilla cerrada Motivo: La casila se cerro localmente en el tefono pero no remotamenten')
                                      .subscribe(resp => {
                                        this.databaseService.saveIncidencia(true,'Casilla cerrada Motivo: La casila se cerro localmente en el tefono pero no remotamenten')
                                            .then(resp => {
                                              Swal.fire('Información enviada y guardada', 'La casila se cerro localmente en el tefono pero no remotamenten, ponte en contacto con un encargado.', 'warning')
                                            })
                                            .catch(err=>{
                                              Swal.fire('Información enviada', 'La casila se cerro localmente en el tefono pero no remotamenten, ponte en contacto con un encargado.', 'warning')
                                            })
                                      }, err => {
                                        this.databaseService.saveIncidencia(false,'Casilla cerrada Motivo: La casila se cerro localmente en el tefono pero no remotamenten')
                                            .then(resp => {
                                              Swal.fire('Información guardada', 'Casilla cerrada Motivo: La casila se cerro localmente en el tefono pero no remotamenten', 'warning')
                                            })
                                            .catch(err=>{
                                              Swal.fire('Alerta', 'La casila se cerro localmente en el tefono pero no remotamenten', 'warning')
                                            })
                                      })

                                  }else{

                                    this.databaseService.addIncidencia(this.token,'Casilla cerrada: Motivo: '+msj)
                                      .subscribe(resp => {
                                        this.databaseService.saveIncidencia(true,'Casilla cerrada: Motivo: '+msj)
                                            .then(resp => {
                                              Swal.fire('Información enviada y guardada', 'Casilla cerrada', 'success')
                                            })
                                            .catch(err=>{
                                              Swal.fire('Información enviada', 'Casilla cerrada', 'success')
                                            })
                                      }, err => {
                                        this.databaseService.saveIncidencia(false,'Casilla cerrada')
                                            .then(resp => {
                                              Swal.fire('Información enviada', 'Casilla cerrada', 'success')
                                            })
                                            .catch(err=>{
                                              Swal.fire('Información enviada', 'Casilla cerrada', 'success')
                                            })
                                      })

                                  }

                                  
                                }, err =>{

                                  this.databaseService.addIncidencia(this.token,'Casilla cerrada Motivo: La casila se cerro localmente en el tefono pero no remotamenten')
                                      .subscribe(resp => {
                                        this.databaseService.saveIncidencia(true,'Casilla cerrada Motivo: La casila se cerro localmente en el tefono pero no remotamenten')
                                            .then(resp => {
                                              Swal.fire('Información enviada y guardada', 'La casila se cerro localmente en el tefono pero no remotamenten, ponte en contacto con un encargado.', 'warning')
                                            })
                                            .catch(err=>{
                                              Swal.fire('Información enviada', 'La casila se cerro localmente en el tefono pero no remotamenten, ponte en contacto con un encargado.', 'warning')
                                            })
                                      }, err => {
                                        this.databaseService.saveIncidencia(false,'Casilla cerrada Motivo: La casila se cerro localmente en el tefono pero no remotamenten')
                                            .then(resp => {
                                              Swal.fire('Información guardada', 'La casila se cerro localmente en el tefono pero no remotamenten', 'warning')
                                            })
                                            .catch(err=>{
                                              Swal.fire('Alerta', 'La casila se cerro localmente en el tefono pero no remotamenten', 'warning')
                                            })
                                      })
                                  
                                })

                          }
                        })
                        .catch( err => {
                          //no se pudo obtener el token
                          this.databaseService.saveIncidencia(false,'Casilla cerrada Motivo: La casila se cerro localmente en el tefono pero no remotamenten')
                              .then(resp => {
                                Swal.fire('Información guardada', 'La casila se cerro localmente en el tefono pero no remotamenten, ponte en contacto con un encargado.', 'warning')
                              })
                              .catch(err=>{
                                Swal.fire('Alerta', 'La casila se cerro localmente en el tefono pero no remotamenten, ponte en contacto con un encargado.', 'warning')
                              })
                        })
                    }, err =>{
                      //no tienes internet
                      this.databaseService.saveIncidencia(false,'Casilla cerrada Motivo: La casila se cerro localmente en el tefono pero no remotamenten')
                          .then(resp => {
                            Swal.fire('Información guardada', 'La casila se cerro localmente en el tefono pero no remotamenten, ponte en contacto con un encargado.', 'warning')
                          })
                          .catch(err=>{
                            Swal.fire('Alerta', 'La casila se cerro localmente en el tefono pero no remotamenten, ponte en contacto con un encargado.', 'warning')
                          })
                    })
              })
              .catch( err =>{
                Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'Tu casilla no se pudo cerrar, intenta de nuevo'
                    })
              })

      }
    })

  }

}
