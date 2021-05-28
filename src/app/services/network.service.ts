import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, merge, of, fromEvent} from 'rxjs';
import { Network } from '@ionic-native/network/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { mapTo } from 'rxjs/operators';

// export enum  ConnectionStatus {
//    Online,
//    Offline
// }


@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  // private status: BehaviorSubject<ConnectionStatus> = new BehaviorSubject(ConnectionStatus.Offline);

  // constructor(private network: Network,
  //             private toastController: ToastController,
  //             private plt: Platform){

  //               this.plt.ready().then(() => {
  //                 this.initializeNetworkEvents();
  //                 let status = this.network.type !== 'none' ? ConnectionStatus.Online : ConnectionStatus.Offline;
  //                 this.status.next(status);
  //               })
  //             }

  // public initializeNetworkEvents(){
  //   this.network.onDisconnect().subscribe(() => {
  //     if(this.status.getValue() === ConnectionStatus.Online){
  //       console.log('No tenemos conexion')
  //       this.updateNetworkStatus(ConnectionStatus.Offline)
  //     }
  //   });

  //   this.network.onConnect().subscribe(()=> {
  //     if(this.status.getValue() === ConnectionStatus.Offline){
  //       console.log('Tenemos conexion')
  //       this.updateNetworkStatus(ConnectionStatus.Online)
  //     }
  //   })

  // }

  // private async updateNetworkStatus(status: ConnectionStatus){
  //   this.status.next(status);

  //   let connection = status == ConnectionStatus.Offline ? 'Offline' : 'Online';

  //   let toast = this.toastController.create({
  //     message: `Tu estas ahora ${connection}`,
  //     duration: 3000,
  //     position:'bottom'
  //   });
  //   toast.then(toast => toast.present());
  // }

  // public onNetworkChange(): Observable<ConnectionStatus> {
  //   return this.status.asObservable();
  // }

  // public getCurrentNetworkStatus(): ConnectionStatus {
  //   return this.status.getValue();
  // }

  private online: Observable<boolean> = null;
  private hasConnection = new BehaviorSubject(false);

  constructor(
        private network: Network,
        private platform: Platform,
        private http: HttpClient) {


          if (this.platform.is('cordova')) {
            // on Device
            this.network.onConnect().subscribe(() => {
                console.log('network was connected :-)');
                this.hasConnection.next(true);
                return;
            });
            this.network.onDisconnect().subscribe(() => {
                console.log('network was disconnected :-(');
                this.hasConnection.next(false);
                return;
            });
        } else {
            // on Browser
            this.online = merge(
            of(navigator.onLine),
            fromEvent(window, 'online').pipe(mapTo(true)),
            fromEvent(window, 'offline').pipe(mapTo(false))
            );

            this.online.subscribe((isOnline) =>{
                if (isOnline) {
                    this.hasConnection.next(true);
                   console.log('network was connected :-)');
                } else {
                    console.log('network was disconnected :-(');
                    this.hasConnection.next(false);
                    console.log(isOnline);
                  }
              });
        }
        this.testNetworkConnection();

        }

      public getNetworkType(): string {
          return this.network.type;
      }
  
      public getNetworkStatus(): Observable<boolean> {
          return this.hasConnection.asObservable();
      }
  
      public getNetworkTestRequest(): Observable<any> {
          return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
      }

      public async testNetworkConnection() {
        try {
            this.getNetworkTestRequest().subscribe(
            success => {
                // console.log('Request to Google Test  success', success);
                    this.hasConnection.next(true);
                return;
            }, error => {
                // console.log('Request to Google Test fails', error);
                this.hasConnection.next(false);
                return;
            });
        } catch (err) {
            console.log('err testNetworkConnection', err);
            this.hasConnection.next(false);
            return;
       }
    }


}
