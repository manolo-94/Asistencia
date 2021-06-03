import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NetworkService } from '../../services/network.service';
import { DatabaseService } from '../../services/database.service';
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],
})
export class IncidenciasPage implements OnInit {

  status:boolean;

  private token:string = null;

  public enviados:number = 0;
  public noenviados:number = 0;

  procesado:any = [];
  noprocesado:any =[];

  constructor(private networkServices: NetworkService,  
              private databaseService: DatabaseService,
              private ref: ChangeDetectorRef,
              private callNumber: CallNumber) { }

  ngOnInit() {
    this.conteoInicidencias();
    // this.ref.detectChanges();
  }

  llamar(phoneNumber:any){
    this.callNumber.callNumber(phoneNumber,true)
        .then(()=> console.log('¡Llamada existosa'))
        .catch(() => console.log('Error al intentar llamar'));
  }

  conteoInicidencias(){

    this.enviados = 0;
    this.noenviados =0;
    this.procesado = [];
    this.noprocesado = [];

    this.databaseService.getAllIncidencia()
        .then(then =>{

          if(then.rows.length > 0){
            for (let i = 0; i < then.rows.length; i++){
              console.log(then.rows.item(i));
              if(then.rows.item(i)['procesado'] == 'true'){
                this.procesado.push(then.rows.item(i)['id'])
                // this.ref.detectChanges();
              }
              if(then.rows.item(i)['procesado'] == 'false'){
                this.noprocesado.push(then.rows.item(i)['id'])
                // this.ref.detectChanges();
              }
            }
            
            this.enviados = this.procesado.length;
            this.noenviados = this.noprocesado.length; 
            console.log(this.enviados,this.noenviados);
            
            // this.ref.detectChanges();
          }else{
            console.log('No se obtuvo registros');
            this.enviados = 0;
            this.noenviados = 0;
            this.procesado = [];
            this.noprocesado = [];
            console.log(this.enviados,this.noenviados);
            // this.ref.detectChanges();
          }
        })
        .catch( err =>{
          console.log(err);
          console.log('no se pudo ejecutar la consulta');
        })
        // this.ref.detectChanges();
  }

  enviarIncidencia(){
    let msj : string;
    Swal.fire({
      title: 'Enviar',
      text: "¿Deseas enviar la incidencia?",
      icon: 'question',
      input: 'textarea',
      inputPlaceholder: 'Describa su incidencia...',
      inputAttributes: {
        'aria-label': 'Type your message here'
      },
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si',
      inputValidator:(value) => {
        msj = value;
        // console.log(value)
        if (!value) {
          return 'Este campo es obligatorio'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {

        this.networkServices.getNetworkTestRequest()
            .subscribe( success => {
              this.databaseService.getTokenUser()
                  .then(then => {
                    if(then.rows.length > 0){
                                  
                      for (let i = 0; i < then.rows.length; i++){
                        this.token = then.rows.item(i)['token'];
                      }

                      this.databaseService.addIncidencia(this.token,msj)
                          .subscribe(resp =>{
                            console.log(resp);
                            
                            // console.log('incidencia enviado correctamente');
                            Swal.fire(
                              'Enviado',
                              'Tu información se envió correctamente.',
                              'success'
                            )

                            this.databaseService.saveIncidencia(true,msj)
                                .then(resp =>{

                                      this.conteoInicidencias();

                                      Swal.fire(
                                        'Guardado',
                                        'Incidencia guardada y enviada correctamente',
                                        'success'
                                      )
                                    })
                                    .catch(err =>{
                                      Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'No se pudo guardar tu incidencia, pero no te preocupes ya fue enviado correctamente'
                                      })
                                    })
                                  
                                // this.databaseService.getAllIncidencia()
                                //     .then(then =>{
                                //       if(then.rows.length > 0){

                                //         for (let i = 0; i < then.rows.length; i++){
                                //           console.log(then.rows.item(i));
                                //         }
                                //       }else{
                                //         console.log('No se obtuvo registros');
                                //       }
                                //     })
                                //     .catch( err =>{
                                //       console.log(err);
                                //       console.log('no se pudo ejecutar la consulta');

                                //     })
                            
                          },err =>{
                            console.log(err);
                            console.log('algo salio mal');
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'No se pudo enviar tu incidencia, algo salio mal intenta de nuevo'
                            })
                          })

                          // this.conteoInicidencias();
                          // this.ref.detectChanges();
                          
                    }
                  })
            },error =>{

              this.databaseService.saveIncidencia(false,msj)
                  .then(resp =>{

                    this.conteoInicidencias();
                    
                    Swal.fire(
                      'Guardado',
                      'No se pudo enviar tu incidencia en este momento, no te preocupes tu información sigue guardada en el telefono, se enviara cuando tengas conexion a internet',
                      'success'
                    )
                    
                  })
                  .catch(err =>{
                    Swal.fire({
                      icon: 'error',
                      title: 'Oops...',
                      text: 'No se pudo guardar tu incidencia correctamente intentalo de nuevo.'
                    })
                  })

              // this.databaseService.getAllIncidencia()
              //     .then(then =>{
              //       if(then.rows.length > 0){
                                  
              //         for (let i = 0; i < then.rows.length; i++){
              //           console.log(then.rows.item(i));
              //         }
              //       }else{
              //         console.log('No se obtuvo registros');
              //       }
              //     })
              //     .catch( err =>{
              //       console.log(err);
              //       console.log('no se pudo ejecutar la consulta correctamente');
                    
              //     })

                // this.conteoInicidencias();
                // this.ref.detectChanges();
              // Swal.fire({
              //   icon: 'error',
              //   title: 'Oops...',
              //   text: 'Verifica tu conexion a internet, para poder enviar tu incidencia, no te preocupes tu infromación sigue guardada en el telefono y mas tarde se pordra enviar'
              // })
            })
            // this.conteoInicidencias();
            // this.ref.detectChanges();
      }
    })
  }

}
