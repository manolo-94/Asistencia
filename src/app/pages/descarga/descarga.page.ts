import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

import { ChangeDetectorRef } from '@angular/core';
import { PersonaSeccion } from '../../interfaces/interfaces';
// import { url } from 'node:inspector';
import { NetworkService } from '../../services/network.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'


@Component({
  selector: 'app-descarga',
  templateUrl: './descarga.page.html',
  styleUrls: ['./descarga.page.scss'],
})

export class DescargaPage implements OnInit {

  public paginasTotales: number = 0;
  public paginaActual: number = 0
  public porcentValue: number = 0;
  public status_progresbar: boolean = false;
  public status_completadoMsj: boolean = false;
  public status_connection_internet: boolean = true;

  public total_personas:number = 0;
  public total_personas_guardadas:number = 0;
  public porcentaje_personas_guardadas: number = 0;

  public token:string = null;

  personaSeccion:PersonaSeccion[] = [];
  isConnected = false;
  
  // url:string = 'http://10.0.2.40:8000/api/personas/persona/seccion/' ;

  constructor( private databaseService: DatabaseService,
               private alertCtrl: AlertController,
               private network: Network,
               private ref: ChangeDetectorRef,
               private plt: Platform,
               private navCtrl: NavController,
               private networkService: NetworkService) {

                }

  ngOnInit() {
    this.networkService.getNetworkStatus()
        .subscribe((connected:boolean) => {
          this.isConnected = connected;
          if(!this.isConnected){
            console.log('Por favor enciende tu conexión a Internet');
            this.status_connection_internet = false;
            this.ref.detectChanges();
          }else{
            this.status_connection_internet = true;
            this.ref.detectChanges();
          }
        })


    this.networkService.getNetworkTestRequest()
        .subscribe(success =>{ 
          console.log('success testNetworkConnection') 
          this.status_connection_internet = true;
        },error =>{
          console.log('error testNetworkConnection');
          this.status_connection_internet = false;
        })

  }

  verificacionDescarga(){

    this.databaseService.getStatusDownload()
        .then( resp => {
          let status: boolean = false;
          if(resp.rows.length > 0){ // si existe validamos el status de descarga
            for (let i = 0; i < resp.rows.length; i++){
              console.log(resp.rows.item(i));
              // status = resp.rows.item(i)['status'];
            }
            console.log('ya has descargado la información')
            Swal.fire({
              title: '¿Quieres descargar la información de nuevo?',
              text: "Al volver a descargar, se eliminaran todos tus registros",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: `Si, descargar`,
              cancelButtonText: 'No, ¡cancelar!',
              
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                this.status_completadoMsj = false;
                this.porcentValue = 0;
                this.paginaActual = 0;
                this.paginasTotales = 0;
                this.total_personas = 0;
                this.total_personas_guardadas = 0;
                this.porcentaje_personas_guardadas = 0;
                this.databaseService.deleteInfoDescarga();
                this.databaseService.createInfoDescarga();
                
                this.networkService.getNetworkTestRequest()
                .subscribe(success =>{ 
                  Swal.fire('Descarga iniciada', '', 'success')
                  console.log('success testNetworkConnection') 
                  this.messageAlert('Importante','Descarga de información','Tu información está por descargarse, no selecciones otra opción ni cierres la app hasta que tu descarga sea completada')
                  this.downloadPersonas(null);
                },error =>{
                  console.log('error testNetworkConnection');
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Verifica tu conexion a internet para intentar descargar.'
                  })
                })
              }
            })
          }else{ // si no existe, inicia el proceso de descarga ya que nunca se ha descargado información
            console.log('inicia proceso de descarga');
            

            // this.databaseService.recordStatusDownload(true)
            //     .then(then =>{
            //       console.log(then)
            //       console.log('descarga finalizada, se ha guardado el status')
            //     })

            this.status_completadoMsj = false;
            this.porcentValue = 0;
            this.paginaActual = 0;
            this.paginasTotales = 0;
            this.total_personas = 0;
            this.total_personas_guardadas = 0;
            this.porcentaje_personas_guardadas = 0;
            this.databaseService.deleteInfoDescarga();
            this.databaseService.createInfoDescarga();

            this.networkService.getNetworkTestRequest()
            .subscribe(success =>{ 
              Swal.fire('Descarga iniciada', '', 'success')
              console.log('success testNetworkConnection') 
              this.messageAlert('Importante','Descarga de información','Tu información está por descargarse, no selecciones otra opción ni cierres la app hasta que tu descarga sea completada')
              this.downloadPersonas(null);
              // this.databaseService.recordStatusDownload(true)
              //   .then(then =>{
              //     console.log(then)
              //     console.log('descarga finalizada, se ha guardado el status')
              //   })
            },error =>{
              console.log('error testNetworkConnection');
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Verifica tu conexion a internet para intentar descargar.'
              })
            })
          }
        }, erro =>{
          console.log('no se puedo realizal la consulta');
        })
  }

  async downloadPersonas(url:string){
    this.status_progresbar = true;
    
    await this.databaseService.getTokenUser()
        .then( then => {
          // console.log(then)
          if(then.rows.length > 0){
            for (let i = 0; i < then.rows.length; i++){
              // console.log(then.rows.item(i)['token']);
              
              this.token = then.rows.item(i)['token'];
            }
          }
        })
        
    await this.databaseService.downloadPersonas(url,this.token)
          .then(then => {
            then.subscribe(resp => {
              this.paginasTotales = Math.ceil(resp.count/100);
              this.paginaActual += 1;
              let porcentaje = this.paginaActual/this.paginasTotales*100;
              this.porcentValue = parseFloat(porcentaje.toFixed(2));

              this.total_personas = resp.count;
              // console.log(resp.next);
              // console.log(resp.results);
              for (let i = 0; i < resp.results.length; i++){
                this.personaSeccion = [];
                // this.personaSeccion.push(resp.results[i])
                
                this.databaseService.addPerson(resp.results[i].id, resp.results[i].nombre, resp.results[i].apellido_paterno, resp.results[i].apellido_materno, resp.results[i].nombre_completo, resp.results[i].direccion, resp.results[i].fecha_nacimiento, resp.results[i].edad, resp.results[i].seccion, resp.results[i].municipio, resp.results[i].localidad, resp.results[i].comisaria)
                    .then(resp => {
                      this.total_personas_guardadas += 1;
                      let porcentaje_personas = this.total_personas_guardadas/this.total_personas*100;
                      this.porcentaje_personas_guardadas = parseFloat(porcentaje_personas.toFixed(2));
                      // console.log(resp)
                      if(this.total_personas_guardadas == this.total_personas){
                        this.status_completadoMsj = true;
                      }
                    })
                    .then(error => {
                      console.log(error)
                    });
              }
              
              if(resp.next != null){
                console.log(url)
                // console.log(resp.results);
                this.downloadPersonas(resp.next);
              }else{
                // this.status_completadoMsj = true;
                console.log('FIN');
                // console.log(resp.results);
                this.databaseService.recordStatusDownload(true)
                .then(then =>{
                  // console.log(then)
                  console.log('descarga finalizada, se ha guardado el status')
                })
              }
            },(err) => {
              console.log(err.error['detail']);
              this.messageAlert('Error','',err.error['detail'])
            })
          })
  }

  async presentAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Descarga',
      message: 'Tú información de ha descargado correctamente',
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async messageAlert(header:string,subHeader:string, msj:string) {
    let alert = await this.alertCtrl.create({
      header: header,
      subHeader: subHeader,
      message: msj,
      buttons: ['Cerrar']
    });
    await alert.present();
  }


}
