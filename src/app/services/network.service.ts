import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { ToastController, Platform } from '@ionic/angular';

export enum  ConnectionStatus {
   Online,
   Offline
}


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  constructor(private network: Network,
              private toastController: ToastController,
              private plt: Platform){

                this.plt.ready().then(() => {
                  this.initializeNetworkEvents();
                  let status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
                  this.status.next(status);
                })
              }

  public initializeNetworkEvents(){
    this.network.onDisconnect().subscribe(() => {
      if(this.status.getValue() === ConnectionStatus.Online){
        console.log('No tenemos conexion')
        this.updateNetworkStatus(ConnectionStatus.Offline)
      }
    });

    this.network.onConnect().subscribe(()=> {
      if(this.status.getValue() === ConnectionStatus.Offline){
        console.log('Tenemos conexion')
        this.updateNetworkStatus(ConnectionStatus.Online)
      }
    })

  }

  private async updateNetworkStatus(status: ConnectionStatus){
    this.status.next(status);

    let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';

    let toast = this.toastController.create({
      message: `Tu estas ahora ${connection}`,
      duration: 3000,
      position:'bottom'
    });
    toast.then(toast => toast.present());
  }

  public onNetworkChange(): Observable<ConnectionStatus> {
    return this.status.asObservable();
  }

  public getCurrentNetworkStatus(): ConnectionStatus {
    return this.status.getValue();
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

  // public onlineOffline : boolean;

  // constructor() { 
  //   document.addEventListener('deviceready', () => {
  //     if (navigator.connection.type === Connection.NONE) {
  //       this.onlineOffline = false;
  //     } else {
  //       this.onlineOffline = true;
  //     }
  //   });

  //   document.addEventListener('offline', () => {
  //     this.onlineOffline = false;
  //   });

  //   document.addEventListener('online', () => {
  //     this.onlineOffline = true;
  //   });
  // }

}
