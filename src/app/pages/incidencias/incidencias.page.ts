import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NetworkService } from '../../services/network.service';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],
})
export class IncidenciasPage implements OnInit {

  status:boolean;

  private token:string = null;

  constructor(private networkServices: NetworkService,  
              private databaseService: DatabaseService) { }

  ngOnInit() {
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
                            
                            console.log('incidencia enviado correctamente');
                            Swal.fire(
                              'Enviado!',
                              'Tu información se envió correctamente.',
                              'success'
                            )
                            
                          },err =>{
                            console.log(err);
                            console.log('algo salio mal');
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'No se pudo enviar tu incidencia, algo salio mal intenta de nuevo'
                            })
                          })
                          
                          

                    }
                  })
            },error =>{
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Verifica tu conexion a internet, para poder enviar tu incidencia, no te preocupes tu infromación sigue guardada en el telefono y mas tarde se pordra enviar'
              })
            })
      }
    })
  }

}
