import { Component, Input, OnInit } from '@angular/core';
import { DatabaseService } from '../../services/database.service';
import { AlertController, NavController, Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

import { ChangeDetectorRef } from '@angular/core';
import { PersonaSeccion } from '../../interfaces/interfaces';
// import { url } from 'node:inspector';

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

  personaSeccion:PersonaSeccion[] = [];
  
  // url:string = 'http://10.0.2.40:8000/api/personas/persona/seccion/' ;

  constructor( private databaseService: DatabaseService,
               private alertCtrl: AlertController,
               private network: Network,
               private ref: ChangeDetectorRef,
               private plt: Platform,
               private navCtrl: NavController) {

                // this.NetworkStatus = new BehaviorSubject(false);            // Assume Network is offline
                // this.CheckNetworkStatus();
                // this.ionViewDidLoad()

                // this.ionViewDidLoad();
                
                // this.loadData(true);

                }

  ngOnInit() {
    // this.plt.ready().then(()=>{
    //   this.ionViewDidLoad();
    // })

    // this.ionViewDidLoad();

    // this.plt.ready().then(()=>{
    //   this.loadData(true);
    // })

  //   if(this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
  //     console.log('desconectado ' + this.status);
  //     return this.status;
  //  }else{
  //     console.log('conectado ' + this.status);
  //     return this.status;
  //  }
  }

  // checkStatus(forceRefresh:boolean = false): Observable<any>{
  //   if(this.getCurrentNetworkStatus() == ConnectionStatus.Offline || !forceRefresh){
  //      console.log('desconectado ' + this.status);
  //      return this.status;
  //   }else{
  //      console.log('conectado ' + this.status);
  //      return this.status;
  //   }
  // }
  

  // loadData(refresh = false, refresher?){
  //   this.networkService.checkStatus(refresh).subscribe(resp => {
  //     console.log(resp)      
  //     if (resp == 0){
  //       this.status_connection_internet = true;
  //     }else {
  //       this.status_connection_internet = false;
  //     }
  //     if (refresher) {
  //       console.log(refresher)
  //       refresher.target.complete();
  //     }
  //     this.ref.detectChanges();
  //   })
  // }

  // CheckNetworkStatus() {
  //   if( this.plt.ready() ) {
  //       if( this.network.type === undefined || this.network.type === null || this.network.type === 'unknown') {
  //           this.status_connection_internet = false;
  //           this.UpdateNetworkStatus(false);
  //       } else {
  //           this.status_connection_internet = true;
  //           this.UpdateNetworkStatus(true);
  //       }
  //   } else {
  //       this.UpdateNetworkStatus(navigator.onLine);
  //       this.ref.detectChanges();
  //   }
    
  // }

  // ionViewDidLoad(){
  //   this.WatchDisconnect = this.network.onDisconnect().subscribe(
  //     data => { this.UpdateNetworkStatus(false); this.ref.detectChanges();},
  //     error => { console.log(error); }
  //   );

  //   this.WatchConnect = this.network.onConnect().subscribe(
  //     data => { this.UpdateNetworkStatus(true); this.ref.detectChanges();},
  //     error => { console.log(error); }
  //   );
    
  // }

  // UpdateNetworkStatus(IsOnline:boolean) {
  //   console.log('Network ', (IsOnline == true ? 'Online' : 'Offline') );
  //   this.status_connection_internet = IsOnline;
  //   this.NetworkStatus.next(IsOnline);
  // }

  


  // ionViewDidLoad(){
  //   this.network.onDisconnect().subscribe(() => {
  //     console.log('Desconectado :-(');
  //     let estado = 'Desconectado';
  //     let msj = 'Se requiere una conexion a internet para realizar la descarga de información';
  //     this.conexionInternetAlert(estado, msj);
  //     this.status_connection_internet = false;
  //     this.ref.detectChanges();
  //   });

  //   this.network.onConnect().subscribe(() => {
  //     this.status_connection_internet = true;
  //     console.log('Conectado!');
  //     let estado = 'Conectado';
  //     let msj = 'Tenemos una conexión '+this.network.type+', woohoo!';
  //     this.conexionInternetAlert(estado, msj);
  //     setTimeout(() => {
  //       console.log('Tenemos una conexión '+this.network.type+', woohoo!')
  //     }, 3000);
  //     this.ref.detectChanges();
  //   });
    
  // }

  loadData(url:string, refresh = false, refresher?){
    this.databaseService.checkDownload(url,refresh)
        .subscribe(res => {
          console.log(res)
          if(refresher){
            refresher.target.complete();
          }
        })
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
                      console.log(resp)
                    })
                    .then(error => {
                      console.log(error)
                    });
              }
              
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
