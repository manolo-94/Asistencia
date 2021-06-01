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
                finalizado = result.rows.item(i)['finalizado'];
                this.ref.detectChanges();
              }

              if(finalizado){
                this.status = false
                this.ref.detectChanges();
              }
              
            }else{
              this.status = false;
              this.ref.detectChanges();
            }
            
          })
  }

  openmodal()
  {   
    // console.log(this.status)
    Swal.fire({
      title: '¿Quieres abrir la casilla?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `SI`,
    }).then((result) => {
      if (result.isConfirmed) {

        this.databaseService.getConfigCasilla()
            .then(result => {
              let finalizado:boolean;
              
              if(result.rows.length > 0){
                for (let i = 0; i < result.rows.length; i++){
                  finalizado = result.rows.item(i)['finalizado']
                }

                if(finalizado){
                  // console.log('la casilla ya fue cerrada definitivamente')
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Tu casilla ya ha sido cerrada definitivamente, si deseas abrirla de nuevo ponte en contato con tu representante'
                  })
                }
              }else{
                // console.log('vas a abrir casilla por primera vez')
                this.databaseService.insertConfigCasilla('ABIERTA',false,'Apertura de casilla')
                    .then(then => {
                      this.status = true;
                      this.ref.detectChanges();

                      let msj:string = 'Casilla abierta'
                      // console.log(then);
                    
                      // this.databaseService.getConfigCasilla()
                      //     .then(result => {
                      //       for (let i = 0; i < result.rows.length; i++){
                      //         console.log(result.rows.item(i));
                      //       }
                      //     })
                      this.databaseService.getTokenUser()
                      .then( then => {
                        if(then.rows.length > 0){
                              
                          for (let i = 0; i < then.rows.length; i++){
                            this.token = then.rows.item(i)['token'];
                          }
  
                          this.databaseService.addIncidencia(this.token,msj)
                              .subscribe(resp => {
                                console.log('incidencia enviado correctamente')
  
                                this.databaseService.saveIncidencia(true,msj)
                                  .then(resp =>{
                                    console.log('Incidencia guardada y enviada correctamente');
                                  })
                                  .catch(err =>{
                                    console.log('No se pudo guardar tu incidencia, pero no te preocupes ya fue enviado correctamente');
                                  })
                              },err =>{
                                console.log(err);
                                console.log('algo salio mal');
                                this.databaseService.saveIncidencia(false,msj)
                                  .then(resp =>{
                                    console.log('Incidencia guardada y enviada correctamente');
                                  })
                                  .catch(err =>{
                                    console.log('No se pudo guardar tu incidencia, pero no te preocupes ya fue enviado correctamente');
                                  })
                              })
                        }
                      })
                      .catch( err => {
                        console.log('No se encontro el Token del usuario');
                      })
  

                      this.networkService.getNetworkTestRequest()
                          .subscribe(success =>{ 
                            // console.log('success testNetworkConnection') 

                            this.databaseService.getTokenUser()
                                .then( then => {
                                  if(then.rows.length > 0){
                                  
                                    for (let i = 0; i < then.rows.length; i++){
                                      this.token = then.rows.item(i)['token'];
                                    }
                                  
                                    this.databaseService.abrirCasilla(this.token)
                                        .subscribe( resp => {
                                          // console.log(resp);
                                        
                                          this.status = true;
                                          Swal.fire('Casilla abierta!', '', 'success')
                                        
                                        },(err) =>{
                                            // console.log(err.error['detail']);
                                            // console.log('algo salio mal')
                                        
                                            Swal.fire({
                                                icon: 'error',
                                                title: 'Oops...',
                                                text: err.error['detail']
                                            })
                                        })
                                      
                                  }
                                })
                                .catch( err => {
                                  // console.log(err);
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'No se encontro el Token del usuario'
                                  })
                                })

                          },error =>{
                            // console.log('error testNetworkConnection');
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Verifica tu conexion a internet, para poder enviar que has cerrado casilla, no te preocupes tu infromación sigue guardada en el telefono'
                            })
                          })
                        
                      
                    })
                    .catch( err => {
                      // console.log(err)
                      // console.log('No se pudo guarda la informacion correctamente');
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'No se pudo guarda la informacion correctamente'
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
      text: "Una vez cerrada la casilla no podrás abrirla nuevamente, en caso de necesitarlo contacta a tu representante inmediatamente.",
      icon: 'question',
      input: 'textarea',
      inputPlaceholder: '¿Porque quieres cerrar la casillas?',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      confirmButtonText: `Si`,
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
        // this.status = false;
        // Swal.fire('Casilla cerrada!', '', 'success')
        console.log(msj);
        
        this.databaseService.updateConfigCasilla('CERRADA',true,msj)
            .then( resp => {
              this.status = false;
              this.ref.detectChanges();
                // console.log(resp);
                // console.log('informacion actualizada');

                // this.databaseService.getConfigCasilla()
                //     .then(result => {
                //       for (let i = 0; i < result.rows.length; i++){
                //         console.log(result.rows.item(i));
                //       }
                //     })
                this.databaseService.getTokenUser()
                    .then( then => {
                      if(then.rows.length > 0){
                            
                        for (let i = 0; i < then.rows.length; i++){
                          this.token = then.rows.item(i)['token'];
                        }

                        this.databaseService.addIncidencia(this.token,'Casilla cerrada: Motivo: '+msj)
                            .subscribe(resp => {
                              console.log('incidencia enviado correctamente')

                              this.databaseService.saveIncidencia(true,'Casilla cerrada: Motivo: '+msj)
                                .then(resp =>{
                                  console.log('Incidencia guardada y enviada correctamente');
                                })
                                .catch(err =>{
                                  console.log('No se pudo guardar tu incidencia, pero no te preocupes ya fue enviado correctamente');
                                })
                            },err =>{
                              console.log(err);
                              console.log('algo salio mal');
                              this.databaseService.saveIncidencia(false,'Casilla cerrada: Motivo: '+msj)
                                .then(resp =>{
                                  console.log('Incidencia guardada y enviada correctamente');
                                })
                                .catch(err =>{
                                  console.log('No se pudo guardar tu incidencia, pero no te preocupes ya fue enviado correctamente');
                                })
                            })
                      }
                    })
                    .catch( err => {
                      console.log('No se encontro el Token del usuario');
                    })

                this.networkService.getNetworkTestRequest()
                    .subscribe(success =>{ 
                      // console.log('success testNetworkConnection') 
                      this.databaseService.getTokenUser()
                          .then( then => {
                            if(then.rows.length > 0){
                            
                              for (let i = 0; i < then.rows.length; i++){
                                this.token = then.rows.item(i)['token'];
                              }
                            
                              this.databaseService.cerrarCasilla(this.token)
                              .subscribe( resp => {
                                // console.log(resp);
                                this.status = false;
                                Swal.fire('Casilla cerrada!', '', 'success')
                              },(err) =>{
                                  // console.log(err.error['detail']);
                                  // console.log('algo salio mal')
                              
                                  Swal.fire({
                                      icon: 'error',
                                      title: 'Oops...',
                                      text: err.error['detail']
                                  })
                              })
                            
                            }
                          })
                          .catch( err => {
                            // console.log(err);
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'No se encontro el Token del usuario'
                            })
                          })
                      
                    },error =>{
                      // console.log('error testNetworkConnection');
                      Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Verifica tu conexion a internet, para poder enviar que has cerrado casilla, no te preocupes tu infromación sigue guardada en el telefono'
                      })
                      
                    })

                
            })
            .catch(err =>{
              // console.log(err);
              // console.log('No se pudo actualizar la informacion'); 
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'No se pudo actualizar la informacion'
              })             
            })

      }
    })

  }

}
