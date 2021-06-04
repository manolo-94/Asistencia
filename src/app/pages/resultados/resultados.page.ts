import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import { DatabaseService } from '../../services/database.service';
import { NetworkService } from '../../services/network.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { isEmpty } from 'rxjs/operators';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
})
export class ResultadosPage implements OnInit {

  form: FormGroup;

  private token:string = null;

  resultados:string[] = [];

  fromResultados = {
    pm_pan : '', 
    pm_pri : '', 
    pm_prd : '', 
    pm_verde : '', 
    pm_pt : '', 
    pm_mc : '', 
    pm_morena : '',
    pm_na : '', 
    pm_pes : '', 
    pm_rsp : '', 
    pm_fpm : '', 
    pm_cia : '', 
    pm_cib : '', 
    pm_nulos : '', 

    df_pan : '', 
    df_pri : '', 
    df_prd : '', 
    df_verde : '', 
    df_pt : '', 
    df_mc : '', 
    df_morena : '',
    df_pes : '', 
    df_rsp : '', 
    df_fpm : '', 
    df_cia : '', 
    df_cib : '', 
    df_nulos : '', 

    dl_pan : '', 
    dl_pri : '', 
    dl_prd : '', 
    dl_verde : '', 
    dl_pt : '', 
    dl_mc : '', 
    dl_morena : '',
    dl_na : '', 
    dl_pes : '', 
    dl_rsp : '', 
    dl_fpm : '', 
    dl_cia : '', 
    dl_cib : '', 
    dl_nulos : '', 
  }

  constructor(private databaseServices:DatabaseService,
              private networkServices: NetworkService,
              public fb: FormBuilder,) { 
                this.form = this.fb.group({
                  nombre: ['', Validators.required],
                })
              }

  ngOnInit() {
  }

  enviarResultados(){
    Swal.fire({
      title: 'Resultados',
      text: "¿Deseas enviar los resultados finales?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then((result) => {
      if (result.isConfirmed) {

        let pm_pan    = this.fromResultados.pm_pan;
        let pm_pri    = this.fromResultados.pm_pri;
        let pm_prd    = this.fromResultados.pm_prd;
        let pm_verde  = this.fromResultados.pm_verde;
        let pm_pt     = this.fromResultados.pm_pt;
        let pm_mc     = this.fromResultados.pm_mc;
        let pm_morena = this.fromResultados.pm_morena;
        let pm_na     = this.fromResultados.pm_na;
        let pm_pes    = this.fromResultados.pm_pes;
        let pm_rsp    = this.fromResultados.pm_rsp
        let pm_fpm    = this.fromResultados.pm_fpm;
        let pm_cia    = this.fromResultados.pm_cia;
        let pm_cib    = this.fromResultados.pm_cib;
        let pm_nulos  = this.fromResultados.pm_nulos
        let df_pan    = this.fromResultados.df_pan;
        let df_pri    = this.fromResultados.df_pri;
        let df_prd    = this.fromResultados.df_prd;
        let df_verde  = this.fromResultados.df_verde;
        let df_pt     = this.fromResultados.df_pt;
        let df_mc     = this.fromResultados.df_mc;
        let df_morena = this.fromResultados.df_morena;
        let df_pes    = this.fromResultados.df_pes;
        let df_rsp    = this.fromResultados.df_rsp;
        let df_fpm    = this.fromResultados.df_fpm;
        let df_cia    = this.fromResultados.df_cia;
        let df_cib    = this.fromResultados.df_cib;
        let df_nulos  = this.fromResultados.df_nulos;
        let dl_pan    = this.fromResultados.dl_pan;
        let dl_pri    = this.fromResultados.dl_pri;
        let dl_prd    = this.fromResultados.dl_prd;
        let dl_verde  = this.fromResultados.dl_verde;
        let dl_pt     = this.fromResultados.dl_pt;
        let dl_mc     = this.fromResultados.dl_mc;
        let dl_morena = this.fromResultados.dl_morena;
        let dl_na     = this.fromResultados.dl_na;
        let dl_pes    = this.fromResultados.dl_pes;
        let dl_rsp    = this.fromResultados.dl_rsp;
        let dl_fpm    = this.fromResultados.dl_fpm;
        let dl_cia    = this.fromResultados.dl_cia;
        let dl_cib    = this.fromResultados.dl_cib;
        let dl_nulos  = this.fromResultados.dl_nulos;

        // console.log('inicio');
        
        // console.log(pm_pan);

        // console.log('fin');
          

        if(pm_pan    === null || pm_pan === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pan alcaldia es requerido'
          })
          return;
        }
        if(pm_pri    === null || pm_pri === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pri en alcaldia es requerido'
          })
          return;
        }
        if(pm_prd    === null || pm_prd === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo prd en alcaldia es requerido'
          })
          return;
        }
        if(pm_verde  === null || pm_verde === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo verdes en alcaldia es requerido'
          })
          return;
        }
        if(pm_pt     === null || pm_pt === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pt en alcaldia es requerido'
          })
          return;
        }
        if(pm_mc     === null || pm_mc === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo mc en alcaldia es requerido'
          })
          return;
        }
        if(pm_morena === null || pm_morena === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo morena en alcaldia es requerido'
          })
          return;
        }
        if(pm_na     === null || pm_na === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo na en alcaldia es requerido'
          })
          return;
        }
        if(pm_pes    === null || pm_pes === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pes en alcaldia es requerido'
          })
          return;
        }
        if(pm_rsp    === null || pm_rsp === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo rsp en alcaldia es requerido'
          })
          return;
        }
        if(pm_fpm    === null || pm_fpm === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo fpm en alcaldia es requerido'
          })
          return;
        }
        if(pm_cia    === null || pm_cia === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo cia en alcaldia es requerido'
          })
          return;
        }
        if(pm_cib    === null || pm_cib === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo cib en alcaldia es requerido'
          })
          return;
        }
        if(pm_nulos  === null || pm_nulos === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo nulos en alcaldia es requerido'
          })
          return;
        }
        if(df_pan    === null || df_pan === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pan en federal es requerido'
          })
          return;
        }
        if(df_pri    === null || df_pri === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pri en federal es requerido'
          })
          return;
        }
        if(df_prd    === null || df_prd === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo prd en federal es requerido'
          })
          return;
        }
        if(df_verde  === null || df_verde === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo verde en federal es requerido'
          })
          return;
        }
        if(df_pt     === null || df_pt === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pr en federal es requerido'
          })
          return;
        }
        if(df_mc     === null || df_mc === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo mc en federal es requerido'
          })
          return;
        }
        if(df_morena === null || df_morena === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo morena en federal es requerido'
          })
          return;
        }
        if(df_pes    === null || df_pes === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pes en federal es requerido'
          })
          return;
        }
        if(df_rsp    === null || df_rsp === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo rsp en federal es requerido'
          })
          return;
        }
        if(df_fpm    === null || df_fpm === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo fpm en federal es requerido'
          })
          return;
        }
        if(df_cia    === null || df_cia === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo cia en federal es requerido'
          })
          return;
        }
        if(df_cib    === null || df_cib === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo cib en federal es requerido'
          })
          return;
        }
        if(df_nulos  === null || df_nulos === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo nulos en federal es requerido'
          })
          return;
        }
        if(dl_pan    === null || dl_pan === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pan en local es requerido'
          })
          return;
        }
        if(dl_pri    === null || dl_pri === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pri en local es requerido'
          })
          return;
        }
        if(dl_prd    === null || dl_prd === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo prd en local es requerido'
          })
          return;
        }
        if(dl_verde  === null || dl_verde === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo verde en local es requerido'
          })
          return;
        }
        if(dl_pt     === null || dl_pt === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pt en local es requerido'
          })
          return;
        }
        if(dl_mc     === null || dl_mc === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo mc en local es requerido'
          })
          return;
        }
        if(dl_morena === null || dl_morena === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo morena en local es requerido'
          })
          return;
        }
        if(dl_na     === null || dl_na === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo na en local es requerido'
          })
          return;
        }
        if(dl_pes    === null || dl_pes === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo pes en local es requerido'
          })
          return;
        }
        if(dl_rsp    === null || dl_rsp === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo rsp en local es requerido'
          })
          return;
        }
        if(dl_fpm    === null || dl_fpm === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo fpm en local es requerido'
          })
          return;
        }
        if(dl_cia    === null || dl_cia === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo cia en local es requerido'
          })
          return;
        }
        if(dl_cib    === null || dl_cib === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo cib en local es requerido'
          })
          return;
        }
        if(dl_nulos  === null || dl_nulos === ""){
          Swal.fire({
            icon:'error',
            title:'Ooops...',
            text:'El campo nulos en local es requerido'
          })
          return;
        }

        let formData = {}
        let json = {};

        let data = new FormData();

        data.append('pm_pan',pm_pan);
        data.append('pm_pri',pm_pri);
        data.append('pm_prd',pm_prd);
        data.append('pm_verde',pm_verde);
        data.append('pm_pt',pm_pt);
        data.append('pm_mc',pm_mc);
        data.append('pm_morena',pm_morena);
        data.append('pm_na',pm_na);
        data.append('pm_pes',pm_pes);
        data.append('pm_rsp',pm_rsp);
        data.append('pm_fpm',pm_fpm);
        data.append('pm_cia',pm_cia);
        data.append('pm_cib',pm_cib);
        data.append('pm_nulos',pm_nulos);
        data.append('df_pan',df_pan);
        data.append('df_pri',df_pri);
        data.append('df_prd',df_prd);
        data.append('df_verde',df_verde);
        data.append('df_pt',df_pt);
        data.append('df_mc',df_mc);
        data.append('df_morena',df_morena);
        data.append('df_pes',df_pes);
        data.append('df_rsp',df_rsp);
        data.append('df_fpm',df_fpm);
        data.append('df_cia',df_cia);
        data.append('df_cib',df_cib);
        data.append('df_nulos',df_nulos);
        data.append('dl_pan',dl_pan);
        data.append('dl_pri',dl_pri);
        data.append('dl_prd',dl_prd);
        data.append('dl_verde',dl_verde);
        data.append('dl_pt',dl_pt);
        data.append('dl_mc',dl_mc);
        data.append('dl_morena',dl_morena);
        data.append('dl_na ',dl_na );
        data.append('dl_pes',dl_pes);
        data.append('dl_rsp',dl_rsp);
        data.append('dl_fpm',dl_fpm);
        data.append('dl_cia',dl_cia);
        data.append('dl_cib',dl_cib);
        data.append('dl_nulos',dl_nulos);

        data.forEach((value, key) => {
          formData[key] = value
        })

        json =JSON.stringify(formData);

        // console.log(json)

        this.databaseServices.getConfigResultados()
            .then(result =>{

              let procesado:boolean;

              if(result.rows.length > 0){
                // for (let i = 0; i < result.rows.length; i++){
                //   procesado = result.rows.item(i)['procesado']
                // }

                this.networkServices.getNetworkTestRequest()
                    .subscribe(success => {
                      this.databaseServices.getTokenUser()
                          .then(then => {
                            if(then.rows.length > 0){
                              // console.log('hay registros');
                              
                            
                              for (let i = 0; i < then.rows.length; i++){
                                // console.log(then.rows.item(i)['token']);
                                this.token = then.rows.item(i)['token'];
                              }
                            
                              this.databaseServices.SendResultados(this.token,json)
                                  .subscribe(resp => {
                                    //console.log(resp)
                                    // console.log('se envio correctamente la información');

                                    if(resp.error != null){
                                      Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'No se pudo enviar y guardar la información por el momento, verifica que todos los campos esten correctos y tu conexión a internet o ponte encontacot con tu encargado.'
                                      })
                                    }else{

                                      this.databaseServices.updateConfigResultados(true,json)
                                        .then(resp =>{
                                          Swal.fire(
                                            'Enviado!',
                                            'Tu información se envió y actualizo correctamente.',
                                            'success'
                                          )
                                        })
                                        .catch(err =>{
                                          console.log(err);
                                          Swal.fire(
                                            'Enviado!',
                                            'Tu información se envió correctamente, pero no se pudo actualizar.',
                                            'success'
                                          )
                                        })

                                    }
                                    
                                    

                                  },err => {
                                    // console.log(err);
                                    // console.log('algo salio mal');
                                    
                                    this.databaseServices.updateConfigResultados(false,json)
                                        .then(resp =>{
                                          Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'No se pudo enviar la información por el momento, verifica que todos los campos esten correctos y tu conexión a internet o ponte encontacot con tu encargado'
                                          })
                                        })
                                        .catch(err =>{
                                          console.log(err);
                                          Swal.fire({
                                            icon: 'error',
                                            title: 'Oops...',
                                            text: 'No se pudo enviar la información por el momento, verifica que todos los campos esten correctos y tu conexión a internet o ponte encontacot con tu encargado'
                                          })
                                        })
                                  })

                                  // this.databaseServices.getConfigResultados()
                                  //     .then(result => {
                                  //       for (let i = 0; i < result.rows.length; i++){
                                  //         console.log(result.rows.item(i));
                                  //       }
                                  //     })
                                
                            }
                          })
                          .catch( err => {
                            this.databaseServices.updateConfigResultados(false,json)
                                .then(resp =>{
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'No se pudo enviar la información por el momento, verifica que todos los campos esten correctos y tu conexión a internet o ponte encontacot con tu encargado'
                                  })
                                })
                                .catch(err =>{
                                  console.log(err);
                                  Swal.fire({
                                    icon: 'error',
                                    title: 'Oops...',
                                    text: 'No se pudo enviar la información por el momento, verifica que todos los campos esten correctos y tu conexión a internet o ponte encontacot con tu encargado'
                                  })
                                })
                          })
                    },err => {
                      // console.log('No tienes internet');
                      this.databaseServices.updateConfigResultados(false,json)
                          .then(resp =>{
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'No se pudo enviar la información por el momento, verifica que todos los campos esten correctos y tu conexión a internet o ponte encontacot con tu encargado'
                            })
                          })
                          .catch(err =>{
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Tu información no se pudo enviar y tampoco actualizar correctamente, intenta de neuvo.'
                            })
                          })

                      // this.databaseServices.getConfigResultados()
                      //     .then(result => {
                      //       for (let i = 0; i < result.rows.length; i++){
                      //         console.log(result.rows.item(i));
                      //       }
                      //     })

                    })
                
              }else{
                console.log('no hay registros');
                
                this.networkServices.getNetworkTestRequest()
                    .subscribe(success => {
                      this.databaseServices.getTokenUser()
                          .then(then => {
                            if(then.rows.length > 0){
                            
                              for (let i = 0; i < then.rows.length; i++){
                                // console.log(then.rows.item(i)['token']);
                                this.token = then.rows.item(i)['token'];
                              }
                            
                              this.databaseServices.SendResultados(this.token,json)
                                  .subscribe(resp => {
                                    console.log(resp)
                                    if(resp.error != null){

                                      Swal.fire({
                                        icon: 'error',
                                        title: 'Oops...',
                                        text: 'No se pudo enviar ni guardar la información por el momento, verifica que todos los campos esten correctos intenta de nuevo o ponte en contacto con tu encargado.'
                                      })

                                    }else{

                                      this.databaseServices.insertConfigResultados(true,json)
                                        .then(then => {
                                          Swal.fire(
                                            'Enviado!',
                                            'Tu información se envió y guardo correctamente.',
                                            'success'
                                          )
                                        })
                                        .catch(err => {
                                          console.log(err);
                                          
                                          Swal.fire(
                                            'Guardado',
                                            'Tu información se envió correctamente.',
                                            'success'
                                          )
                                        })

                                    }

                                    
                                    
                                    // this.databaseServices.getConfigResultados()
                                    //     .then(result => {
                                    //       for (let i = 0; i < result.rows.length; i++){
                                    //         console.log(result.rows.item(i));
                                    //       }
                                    //     })

                                  },err => {
                                    console.log(err);
                                    console.log('algo salio mal');
                                    Swal.fire({
                                      icon: 'error',
                                      title: 'Oops...',
                                      text: 'No se pudo enviar la información por el momento, verifica que todos los campos esten correctos intenta de nuevo o ponte en contacto con tu encargado.'
                                    })
                                  })
                                
                            }else{
                              Swal.fire({
                                icon: 'error',
                                title: 'Oops...',
                                text: 'No se pudo encontra el token de este usuario intenta de nuevo o ponte en contacto con tu encargado.'
                              })
                              
                            }
                          })
                          .catch( err => {
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'No se pudo encontra el token de este usuario para el envio de inforamción intenta de nuevo o ponte en contacto con tu encargado.'
                            })
                          })
                    },err => {
                      // console.log('No tienes internet');
                      this.databaseServices.insertConfigResultados(true,json)
                          .then(then => {
                            Swal.fire(
                              'Guardado',
                              'No se pudo enviar la información por el momento, verifica que todos los campos esten correctos y tu conexión a internet o ponte encontacot con tu encargado',
                              'success'
                            )
                          })
                          .catch(err => {
                            console.log(err);
                            Swal.fire({
                              icon: 'error',
                              title: 'Oops...',
                              text: 'Tu información no se pudo guardar y enviar correctamente verifiaca tu conexión a internet, intenta de nuevo o ponte en contacto con tu encargado.'
                            })
                          })

                      // this.databaseServices.getConfigResultados()
                      //     .then(result => {
                      //       for (let i = 0; i < result.rows.length; i++){
                      //         console.log(result.rows.item(i));
                      //       }
                      //     })
                    })

              }

            })

        // this.networkServices.getNetworkTestRequest()
        //     .subscribe(success => {
        //       this.databaseServices.getTokenUser()
        //           .then(then => {
        //             if(then.rows.length > 0){

        //               for (let i = 0; i < then.rows.length; i++){
        //                 // console.log(then.rows.item(i)['token']);
        //                 this.token = then.rows.item(i)['token'];
        //               }

        //               this.databaseServices.SendResultados(this.token,json)
        //                   .subscribe(resp => {
        //                     console.log(resp)
        //                     // console.log('se envio correctamente la información');
        //                     Swal.fire(
        //                       'Enviado!',
        //                       'Tu información se envió correctamente.',
        //                       'success'
        //                     )
        //                   },err => {
        //                     console.log(err);
        //                     console.log('algo salio mal');
        //                     Swal.fire({
        //                       icon: 'error',
        //                       title: 'Oops...',
        //                       text: 'No se pudo enviar la información por el momento, verifica que todos los campos esten correctos'
        //                     })
        //                   })
                      
        //             }else{
        //               console.log('no se encontro resultados');
                      
        //             }
        //           })
        //           .catch( err => {
        //             console.log(err);
        //             console.log('no ejecutar la consulta');
        //           })
        //     },err => {
        //       console.log('No tienes internet');
              
        //     })

      }
    })
  }

}
