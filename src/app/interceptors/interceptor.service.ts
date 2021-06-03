import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { catchError, delay, finalize, map, retryWhen, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(private loadingCtrl: LoadingController,
              private toasCtrl: ToastController,
              private alertCtrl: AlertController) { }


  intercept(req:HttpRequest<any>, next:HttpHandler): Observable<HttpEvent<any>>{
    console.log('pase por el interceptor');
    // this.showHideAutoLoader();

    // this.loadingCtrl.getTop().then(hasLoading => {
    //   if(!hasLoading){
    //       this.loadingCtrl.create({
    //           spinner:'circular',
    //           translucent:true,
    //           cssClass: "my-custom-loader-class",
    //           message: "Espere por favor ...",
    //           backdropDismiss: true
    //       }).then(loading => loading.present());
    //   }
    // });

    return next.handle(req);

    

    // return next.handle(req).pipe(
    //   retryWhen(err => {
    //     let retries = 1;
    //       return err.pipe(
    //           delay(10000),
    //           tap(()=>{
    //             this.showRetryToast(retries);
    //           }),
    //           map(error => {
    //             if(retries++ ===3){
    //               throw error;
    //             }
    //             return error;
    //           })
    //       )
    //   }),
    //   catchError(err => {
    //     this.presentFailedAlert('se perdio la conexión con el servidor verifiques si tiene internet');
    //     return EMPTY;
    //   }),
    //   finalize(()=>{
    //     this.loadingCtrl.getTop().then(hasLoading => {
    //       if(hasLoading){
    //           this.loadingCtrl.dismiss();
    //       }
    //     });
    //   })
    // );

    
  }


  async showHideAutoLoader() {
    
    this.loadingCtrl.create({
      message: 'Espere por favor...',
      // duration: 2000
      backdropDismiss: true
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });
  }

  async showRetryToast(retryCount){
    const toast = await this.toasCtrl.create({
      message: `intento: ${retryCount}/3`,
      duration:1000
    });
    toast.present();
  }

  async presentFailedAlert(msg){
    const alert = await this.alertCtrl.create({
      header:'Oops',
      message: msg,
      buttons:['OK']
    })
    await alert.present();
  }

  
  


}
