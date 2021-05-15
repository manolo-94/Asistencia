import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AlertController } from '@ionic/angular';

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
  
  // url:string = 'http://10.0.2.40:8000/api/personas/persona/seccion/' ;

  constructor( private databaseService: DatabaseService,
               private alertCtrl: AlertController,) { }

  ngOnInit() {
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



}
