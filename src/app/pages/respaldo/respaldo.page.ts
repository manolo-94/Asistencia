import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { DatabaseService } from '../../services/database.service';
import { NetworkService } from '../../services/network.service';
import { ToastController } from '@ionic/angular';
import { PersonaLN } from '../../interfaces/interfaces';

@Component({
  selector: 'app-respaldo',
  templateUrl: './respaldo.page.html',
  styleUrls: ['./respaldo.page.scss'],
})
export class RespaldoPage implements OnInit {

  public status_completadoMsj: boolean = false;
  public status_connection_internet: boolean = true;

  public token:string = null;
  public noviadosArr = [];

  public personasLN:boolean = false;

  public totalpersonasNoEnviadas:number = 0;
  public personasenviadas:number = 0;
  public porcentValue:number = 0;

  

  public totalpersonasNoEnviadasNoLN:number = 0;
  public personasenviadasNoLN:number = 0;
  public porcentValueNoLN:number = 0;

  public status_completadoMsjNoLN:boolean = false;
  public personasNoLN:boolean = false;

  constructor(public databaseService:DatabaseService, public networkService: NetworkService, public toastController: ToastController) { }

  ngOnInit() {
  }

  IniciarRespaldo(){
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

        this.networkService.getNetworkTestRequest()
            .subscribe( success => {
              this.databaseService.getVotacion()
                  .then(resp => {

                      for(let i = 0; i < resp.rows.length; i++){
                        // console.log(resp.rows.item(i));
                        if(resp.rows.item(i)['status'] == 0){
                          this.noviadosArr.push(resp.rows.item(i)['id_persona'])
                        }
                      }

                      this.totalpersonasNoEnviadas = this.noviadosArr.length;
                    
                      for(let i = 0; i < this.totalpersonasNoEnviadas; i++){
                      
                          this.totalpersonasNoEnviadas = 0;
                          this.personasenviadas = 0;
                          this.porcentValue = 0;
                      
                          this.networkService.getNetworkTestRequest()
                                .subscribe(success =>{ 
                                
                                      this.databaseService.reenviarPersonaVotoRespaldo(this.noviadosArr[i], this.token) // tratamos de enviar la informacion al servidor
                                      .subscribe(resp => {
                                        if(resp.error != null){
                                          this.enviomsj('No se pudo enviar en este momento intenta mas tarde')
                                        }else{
                                        
                                          this.personasLN = true;
                                        
                                          this.personasenviadas +=1;
                                          let porcentaje = this.personasenviadas/this.totalpersonasNoEnviadas*100
                                          this.porcentValue = parseFloat(porcentaje.toFixed(2));
                                        
                                          console.log(resp);
                                          this.databaseService.updateVotacion(this.noviadosArr[i],1)
                                              .then(then =>{
                                                console.log(then);
                                              
                                                this.enviomsj('enviado y actualizado')
                                              })
                                              .catch(err =>{
                                                this.enviomsj('enviado')
                                              })
                                        }
                                      },err =>{
                                        this.enviomsj('no enviado')
                                      })
                                    
                                }, err =>{
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'Verifica tu conexión a internet para intentar enviar.'
                                  })
                                })
                              
                                this.status_completadoMsj = true;
                      }
                    })

                  this.databaseService.getAllPersonaNoLNB()
                      .then(resp =>{
                      
                        this.totalpersonasNoEnviadasNoLN = 0;
                        this.personasenviadasNoLN = 0;
                        this.porcentValueNoLN = 0;

                        let noenviadosArr = [];

                        for(let i = 0; i < resp.rows.length; i++){
                          if(resp.rows.item(i)['procesado'] == "false"){
                            noenviadosArr.push(resp.rows.item(i)['procesado']);
                          }
                        }

                        this.totalpersonasNoEnviadasNoLN = noenviadosArr.length;
                      
                        for(let i = 0; i < resp.rows.length; i++){
                          // console.log(resp.rows.item(i));
                          if(resp.rows.item(i)['procesado'] == "false"){
                            console.log(resp.rows.item(i));

                          let value = resp.rows.item(i)['value'];
                          let id = resp.rows.item(i)['id'];
                          
                          this.databaseService.addPromovidoNoLNRespaldo(this.token,value)
                              .subscribe(resp => {
                              
                                this.personasNoLN = true;
                              
                                this.personasenviadasNoLN +=1;
                                let porcentaje = this.personasenviadasNoLN/this.totalpersonasNoEnviadasNoLN*100
                                this.porcentValueNoLN = parseFloat(porcentaje.toFixed(2));
                              
                                this.databaseService.updatePersonaNoLNB(true,value,id)
                                    .then(resp =>{
                                      console.log(resp);
                                      this.enviomsj('enviado y actualizado')
                                    })
                                    .catch(err => {
                                      console.log(err);
                                      this.enviomsj('enviado')
                                    })
                              }, err =>{
                                this.enviomsj('no enviado')
                              })
                          }
                        }
                        this.status_completadoMsjNoLN = true;
                      })
                      },err => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Oops...',
                          text: 'Verifica tu conexión a internet para intentar enviar.'
                        })
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
