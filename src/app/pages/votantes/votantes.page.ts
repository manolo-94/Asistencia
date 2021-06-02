import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { personaVoto } from '../../interfaces/interfaces';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { NetworkService } from '../../services/network.service';
import { ToastController } from '@ionic/angular';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-votantes',
  templateUrl: './votantes.page.html',
  styleUrls: ['./votantes.page.scss'],
})
export class VotantesPage implements OnInit {

  personasVoto:personaVoto [] = [];

  public enviados:number;
  public noenviados:number;

  private token:string = null;

  constructor( private databaseService: DatabaseService, private networkService:NetworkService, private toastController: ToastController) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.databaseService.getVotacion()
        .then(resp => {
          let enviadosArr = [];
          let noviadosArr = [];
          this.personasVoto = [];
            for(let i = 0; i < resp.rows.length; i++){
              console.log(resp.rows.item(i));
              if(resp.rows.item(i)['status'] == 1){
                enviadosArr.push(resp.rows.item(i)['status'])
              }
              if(resp.rows.item(i)['status'] == 0){
                noviadosArr.push(resp.rows.item(i)['status'])
              }

              this.enviados = enviadosArr.length;
              this.noenviados = noviadosArr.length;
              
              this.personasVoto.push(resp.rows.item(i));
            }
          })
  }

  enviarVotos(){
    Swal.fire({
      title: 'Enviar',
      text: "¿Deseas enviar la información?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {
        // Swal.fire(
        //   'Enviado!',
        //   'Tu información se envió correctamente.',
        //   'success'
        // )
        this.databaseService.getTokenUser()
        .then( then => {
          if(then.rows.length > 0){
      
            for (let i = 0; i < then.rows.length; i++){
              this.token = then.rows.item(i)['token'];
            }
          }
        })
        .catch(err =>{
          console.log('no se pudo obtener el token');
        })
        
        this.databaseService.getVotacion()
            .then(resp => {
              let noviadosArr = [];
              let totalpersonasNoEnviadas:number = 0;

                for(let i = 0; i < resp.rows.length; i++){
                  // console.log(resp.rows.item(i));
                  if(resp.rows.item(i)['status'] == 0){
                    noviadosArr.push(resp.rows.item(i)['id_persona'])
                  }
                }
                console.log(noviadosArr);
                  
                totalpersonasNoEnviadas = noviadosArr.length;

                for(let i = 0; i < totalpersonasNoEnviadas; i++){
                    // console.log(noviadosArr[i]);

                    this.networkService.getNetworkTestRequest()
                          .subscribe(success =>{ 

                           
                               
                                this.databaseService.reenviarPersonaVoto(noviadosArr[i], this.token) // tratamos de enviar la informacion al servidor
                                .subscribe(resp => {
                                  
                                  console.log(resp);
                                  this.databaseService.updateVotacion(noviadosArr[i],1)
                                      .then(then =>{
                                        console.log(then);
                                        
                                        this.enviomsj('enviado y actualizado')
                                      })
                                      .catch(err =>{
                                        this.enviomsj('enviado')
                                      })
                                },err =>{
                                  this.enviomsj('no enviado')
                                })

                          }, err =>{
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Verifica tu conexion a internet para intentar enviar.'
                            })
                          })

                    //  delay(500)
                }

                
                          

              })
      }
    })
  }

  async enviomsj(msj:string){
    let toast = this.toastController.create({
          message: msj,
          duration: 500,
          position:'middle'
        });
        toast.then(toast => toast.present());
  }

}
