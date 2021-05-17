import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AlertController } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

import { ChangeDetectorRef } from '@angular/core';

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
  public status_connection_internet: boolean = false;
  
  // url:string = 'http://10.0.2.40:8000/api/personas/persona/seccion/' ;

  constructor( private databaseService: DatabaseService,
               private alertCtrl: AlertController,
               private network: Network,
               private ref: ChangeDetectorRef,) {

                this.ionViewDidLoad();

                }

  ngOnInit() {
  }

  

  ionViewDidLoad(){
    this.network.onDisconnect().subscribe(() => {
      console.log('Desconectado :-(');
      let estado = 'Desconectado';
      let msj = 'Se requiere una conexion a internet para realizar la descarga de información';
      this.conexionInternetAlert(estado, msj);
      this.status_connection_internet = false;
      this.ref.detectChanges();
    });

    this.network.onConnect().subscribe(() => {
      this.status_connection_internet = true;
      this.ref.detectChanges();
      console.log('Conectado!');
      let estado = 'Conectado';
      let msj = 'Tenemos una conexión '+this.network.type+', woohoo!';
      this.conexionInternetAlert(estado, msj);
      setTimeout(() => {
        console.log('Tenemos una conexión '+this.network.type+', woohoo!')
      }, 3000);
    });
  }

  async downloadPersonas(url:string){
    this.status_progresbar = true;
    await this.databaseService.downloadPersonas(url)
          .then(then => {
            then.subscribe(resp => {
              this.paginasTotales = Math.ceil(resp.count/100);
              this.paginaActual += 1;
              let porcentaje = this.paginaActual/this.paginasTotales*100;
              this.porcentValue = parseFloat(porcentaje.toFixed(2));
              // console.log(resp.next);
              // console.log(resp.results);
              if(resp.next != null){
                console.log(url)
                console.log(resp.results);
                this.downloadPersonas(resp.next);
              }else{
                this.status_completadoMsj = true;
                console.log('FIN');
                console.log(resp.results);
              }
            })
          })
  }

  async presentAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Descarga',
      message: 'Tú informacion de ha descargado correctamente',
      buttons: ['Cerrar']
    });
    await alert.present();
  }

  async conexionInternetAlert(header:string, msj:string) {
    let alert = await this.alertCtrl.create({
      header: 'Conexion a internet',
      subHeader: header,
      message: msj,
      buttons: ['Cerrar']
    });
    await alert.present();
  }


}
